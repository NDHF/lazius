// LAZIUS (LOT-ZEE-US), AN INVENTORY PROGRAM
// Lazius allows a user to manipulate an inventory using a browser interface. 

var itemSearchPrompts = [
    "What parameter would you like to use?",
    "What is the value of that parameter?",
    "Is there a second parameter you would like to use?",
    "What is the value of that parameter?"
];

var editQuantityPromptArray = [
    "Enter item ID:",
    "Would you like to add or deduct?",
    "By how many?",
    "Entrant's Initials",
];

var add;

var searchInputArray = [];

// Any parameters may be used here.
// The logic for adding items requires that the last user input be a three-letter inital.
// Date stamp is added automatically using a date method.
// ID is added automatically using a rudimentary auto-increment. 

var itemParameters = ["Title", "Author", "Subject", "SubSubject", "Location", "Quantity", "Initials", "ID"];

var itemPropertyInput = [];

var counter;

var inventoryObject;

var indexToBeEdited;

programStart();

function createInputDiv(divID, inputPromptID, inputPromptString, inputID) {
    var searchField = $("<div>");
    searchField.attr("id", divID);
    searchField.attr("class", "inputDiv");
    var searchInput = $("<p>");
    searchInput.attr("id", inputPromptID);
    searchInput.html(inputPromptString);
    searchField.append(searchInput);
    var textInput = $("<input>");
    textInput.attr("type", "text");
    textInput.attr("id", inputID);
    textInput.attr("class", "activeTextInput");
    searchField.append(textInput);
    searchField.insertBefore("div#commandMenuDiv");
};

function createParametersList() {
    var parametersDiv = $("<div>");
    parametersDiv.attr("id", "parametersDiv");
    var parametersList = $("<ul>");
    parametersList.append("<p><b>Parameters:</b></p>");
    parametersList.append("// ");
    for (var i = 0; i < itemParameters.length; i++) {
        var parametersListItem = $("<li>");
        parametersListItem.html(itemParameters[i] + "  //  ");
        parametersList.append(parametersListItem);
    }
    parametersDiv.append(parametersList);
    parametersDiv.insertBefore("div#commandMenuDiv");
    $("div#parametersDiv").hide();
}

function createResultsTableDiv() {
    var resultsTableDiv = $("<div>");
    resultsTableDiv.attr("id", "resultsTableDiv");
    var resultsTable = $("<table>");
    resultsTable.attr("id", "resultsTable");
    var resultsTableHeaderRow = $("<tr>");
    resultsTableHeaderRow.attr("id", "resultsTableHeaderRow");
    var resultsTableCaption = $("<caption>");
    resultsTableCaption.text("Your last entry:");
    resultsTableCaption.hide();
    for (var i = 0; i < itemParameters.length; i++) {
        var resultsTableHeader = $("<th>");
        resultsTableHeader.html(itemParameters[i]);
        resultsTableHeaderRow.append(resultsTableHeader);
    }
    resultsTable.append(resultsTableHeaderRow);
    resultsTableDiv.append(resultsTable);
    resultsTableDiv.insertBefore("div#commandMenuDiv");
    $("div#resultsTableDiv").hide();
};

function createInputDivs() {
    createInputDiv("menuInputDiv", "menuInputDivPrompt", "What would you like to do?", "menuInputDivInput");
    createInputDiv("addInputDiv", "addInputDivPrompt", "", "addInputDivInput");
    createInputDiv("searchInputDiv", "searchInputDivPrompt", "", "searchInputDivInput");
    createInputDiv("editQuantityDiv", "editQuantityDivPrompt", "", "editQuantityDivInput");
    createInputDiv("uploadInputDiv", "uploadInputDivPrompt", "", "uploadInputDivInput");
    createInputDiv("printInputDiv", "printInputDivPrompt", "", "printInputDivInput");
    createInputDiv("createNewInventoryDiv", "createNewInventoryPrompt", "", "createNewInventoryInput");
    createInputDiv("noInventoryErrorCatchDiv", "noInventoryErrorCatchDivPrompt", "", "noInventoryErrorCatchDivInput");
};

function programStart() {
    createInputDivs();
    runAFunction("div#menuInputDiv");
    createResultsTableDiv();
    createParametersList();
    createTextAreaDiv();
};

function runAFunction(divToShow, functionToRun) {
    if ($("div#parametersDiv").is(":visible")) {
        $("div#parametersDiv").hide();
    }
    $("div.inputDiv").hide();
    $(divToShow).show();
    if (functionToRun !== undefined) {
        functionToRun();
    }
    $("div.inputDiv:visible input").select();
};

function quitToMenuLogic() {
    if (($("div.inputDiv:visible input").val() === "quit")) {
        resetValues();
        runAFunction("div#menuInputDiv");
        $("div.inputDiv:visible input").select();
    }
};

$(document).on("keydown", function (event) {
    if (event.originalEvent.key === "Enter") {
        quitToMenuLogic();
        if (((inventoryObject === undefined) &&
                (($("div.inputDiv:visible input").val() === "add") ||
                    ($("div.inputDiv:visible input").val() === "edit") ||
                    ($("div.inputDiv:visible input").val() === "print") ||
                    ($("div.inputDiv:visible input").val() === "search"))) || ($("div#noInventoryErrorCatchDiv").is(":visible"))) {
            runAFunction("div#noInventoryErrorCatchDiv", noInventoryErrorCatch);
        } else if (($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "add")) || ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() !== "undo") && ($("input#addInputDivInput").val() !== "quit"))) {
            runAFunction("div#addInputDiv", getInformation);
        } else if ($("div.inputDiv:visible input").val() === "undo") {
            if ($("div#addInputDiv").is(":visible")) {
                undo("input#addInputDivInput", itemPropertyInput, "p#addInputDivPrompt", itemParameters);
            } else if ($("div#searchInputDiv").is(":visible")) {
                undo("input#searchInputDivInput", searchInputArray, "p#searchInputDivPrompt", itemSearchPrompts);
            }
        } else if (($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "search")) || ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() !== "undo") && ($("input#searchInputDivInput").val() !== "quit"))) {
            runAFunction("div#searchInputDiv", searchInventory);
        } else if (($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "edit")) || ($("div#editQuantityDiv").is(":visible") && ($("input#editQuantityDivInput").val() !== "quit"))) {
            runAFunction("div#editQuantityDiv", editQuantity);
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "print") || $("div#printInputDiv").is(":visible")) {
            runAFunction("div#printInputDiv", printInventory);
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "upload") || ($("div#uploadInputDiv").is(":visible"))) {
            runAFunction($("div#uploadInputDiv", uploadInventory))
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "newinv") || ($("div#createNewInventoryDiv").is(":visible"))) {
            runAFunction($("div#createNewInventoryDiv", createNewInventory))
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "param")) {
            $("input.activeTextInput").val("");
            $("div#parametersDiv").show();
            $("div.inputDiv:visible input").select();
        }
    }
});

function counterLogic() {
    if (counter === undefined) {
        counter = 0;
    } else if (counter !== undefined) {
        counter++;
    }
};

function resetValues() {
    $("input.activeTextInput").removeAttr("maxlength");
    $("input.activeTextInput").val("");
    $("div#parametersDiv").hide();
    // $("div#resultsTableDiv").hide();
    counter = undefined;
    add = undefined;
    itemPropertyInput = [];
    searchInputArray = [];
    searchResults = [];
    indexToBeEdited = [];
};

function searchInventory() {
    $("div#parametersDiv").show();
    $("div#resultsTableDiv").hide();
    $("p#searchResultsString").hide();
    $("input#searchInputDivInput").prop('disabled', false);
    var searchResults = [];
    console.log("The searchInventory function was called!");
    counterLogic();
    console.log("Counter: " + counter);
    $("p#searchInputDivPrompt").html(itemSearchPrompts[counter]);
    if (searchInputArray[counter - 1] === "ID") {
        console.log("It's an ID");
        searchInputArray.push(parseInt($("input#searchInputDivInput").val()));
    } else {
        console.log("It's not an ID");
        searchInputArray.push($("input#searchInputDivInput").val());
    }
    $("input#searchInputDivInput").val("");
    if (counter === 0 && inventoryObject === undefined) {} else if (counter === itemSearchPrompts.length) {
        console.log(inventoryObject.inventory);
        $("p#searchInputDivPrompt").html("Hit 'Enter' to search again.");
        $("input#searchInputDivInput").prop('disabled', true);
        if (searchInputArray[0] === "") {
            searchInputArray.shift();
        }
        for (var i = 0; i < inventoryObject.inventory.length; i++) {
            if (searchInputArray[2] !== "no") {
                if ((inventoryObject.inventory[i][searchInputArray[0]] === searchInputArray[1]) && (inventoryObject.inventory[i][searchInputArray[2]] === searchInputArray[3])) {
                    searchResults.push(inventory[i]);
                }
            } else if (searchInputArray[2] === "no") {
                if (inventory[i][searchInputArray[0]] === searchInputArray[1]) {
                    searchResults.push(inventoryObject.inventory[i]);
                }
            }
        }
        if (searchResults.length > 0) {
            clearResultsTable();
            $("div#resultsTableDiv").show();
            console.log(searchResults.length + " results found.");
            console.log(searchResults);
            numberOfResults(searchResults.length);
            displaySearchResults(searchResults);
            resetValues();
        } else if (searchResults.length === 0) {
            console.log("No results found.");
            numberOfResults(0);
            resetValues();
        }
    }
};

function numberOfResults(number) {
    var searchResultsString = $("<p>");
    searchResultsString.attr("id", "searchResultsString");
    searchResultsString.html(number + " results found.");
    searchResultsString.insertAfter("input#searchInputDivInput");
    searchResultsString.show();
};

function getInformation() {
    clearResultsTable();
    $("input#addInputDivInput").prop("disabled", false);
    $("div#resultsTableDiv").hide();
    console.log("getInformation was called!");
    counterLogic();
    $("p#addInputDivPrompt").html(itemParameters[counter] + ": ");
    itemPropertyInput.push($("input#addInputDivInput").val());
    $("input#addInputDivInput").val("");
    if (itemParameters[counter] === "Initials") {
        $("input#addInputDivInput").attr("maxlength", "3");
    }
    if (counter === itemParameters.length - 1) {
        $("input#addInputDivInput").prop("disabled", true);
        $("p#addInputDivPrompt").html("Hit 'Enter' to add new item");
        addToInventory();
    } 
};

function undo(inputID, inputArray, promptID, promptArray) {
    console.log("undo was called");
    $(inputID).val("");
    inputArray.pop();
    if ((counter - 1) >= 0) {
        counter = (counter - 1);
    } else if ((counter - 1) < 0) {
        counter = 0;
    }
    console.log(counter);
    $(promptID).html(promptArray[counter]);
};

function displaySearchResults(array) {
    $("div#resultsTableDiv").show();
    $("table#resultsTable caption").hide();
    for (var i = 0; i < array.length; i++) {
        var tableRow = $("<tr>");
        for (var j = 0; j < itemParameters.length; j++) {
            console.log(itemParameters[j] + ": " + array[i][itemParameters[j]]);
            var tableData = $("<td>");
            tableData.html(array[i][itemParameters[j]]);
            tableRow.append(tableData);
        }
        $("table#resultsTable").append(tableRow);
    }
};

function clearResultsTable() {
    // Credit to user 'strelok' https://stackoverflow.com/users/2788/strelok
    // Link: https://stackoverflow.com/a/370031
    $("table#resultsTable").find("tr:gt(0)").remove();
};

function addToInventory() {
    if (itemPropertyInput[0] === "") {
        itemPropertyInput.shift();
    }
    var book = {};
    for (var i = 0; i < itemParameters.length; i++) {
        book[itemParameters[i]] = itemPropertyInput[i];
    }
    book.Quantity = parseInt(book.Quantity);
    var d = new Date;
    book.DateStamp = d;
    book.ID = parseInt(inventoryObject.inventory.length + 1);
    book.QuantityChanges = [];
    book.QuantityChanges[0] = {
        NewQuantity: book.Quantity,
        QuantityChange: 0,
        Initials: book.Initials,
        DateStamp: book.DateStamp
    }
    inventoryObject.inventory.push(book);
    // dataRef.ref().push(book);
    console.log(inventoryObject.inventory);
    displaySearchResults([inventoryObject.inventory[inventoryObject.inventory.length - 1]]);
    resetValues();
};

function editQuantity() {
    var editQuantityInputValue = $("input#editQuantityDivInput").val();
    var editQuantityMessages = {
        pleaseAddOrDeduct: "Please enter 'add' or 'deduct",
        enterDifferentValue: "Please enter a different value",
        hitEnterToSearchAgain: "Hit 'Enter' to search again."
    };
    $("div#resultsTableDiv").hide();
    clearResultsTable();
    $("input#editQuantityDivInput").prop('disabled', false);
    $("div#editQuantityDiv").show();
    console.log("editQuantity was called!");
    counterLogic();
    console.log("counter: " + counter);
    $("p#editQuantityDivPrompt").html(editQuantityPromptArray[counter]);
    if (counter === 0) {} else if (counter === 1) {
        for (var i = 0; i < inventoryObject.inventory.length; i++) {
            if (inventoryObject.inventory[i].ID === parseInt(editQuantityInputValue)) {
                indexToBeEdited = i;
            }
        }
        displaySearchResults([inventoryObject.inventory[indexToBeEdited]]);
    } else if (counter === 2) {
        if ((editQuantityInputValue !== "add") && (editQuantityInputValue !== "deduct")) {
            counter--;
            $("p#editQuantityDivPrompt").html(editQuantityMessages.pleaseAddOrDeduct);
        } else if (editQuantityInputValue === "add") {
            add = true;
        } else if (editQuantityInputValue === "deduct") {
            add = false;
        }
        displaySearchResults([inventoryObject.inventory[indexToBeEdited]]);
    } else if (counter === 3) {
        $("input#editQuantityDivInput").attr("maxlength", "3");
        var inputIsNotANumber = (isNaN(parseInt(editQuantityInputValue)));
        var inputIsNegative = (parseInt(editQuantityInputValue) < 0);
        var itWouldDeductAnImpossibleAmount = (add === false &&
            (inventoryObject.inventory[indexToBeEdited].Quantity - parseInt(editQuantityInputValue) < 0));
        if (inputIsNotANumber || inputIsNegative || itWouldDeductAnImpossibleAmount) {
            counter--;
            $("p#editQuantityDivPrompt").html(editQuantityMessages.enterDifferentValue);
            displaySearchResults([inventoryObject.inventory[indexToBeEdited]]);
        } else {
            if (add === true) {
                inventoryObject.inventory[indexToBeEdited].Quantity = parseInt(parseInt(inventoryObject.inventory[indexToBeEdited].Quantity) + parseInt(editQuantityInputValue));
            } else if (add === false) {
                inventoryObject.inventory[indexToBeEdited].Quantity = parseInt(parseInt(inventoryObject.inventory[indexToBeEdited].Quantity) - parseInt(editQuantityInputValue));
            }
        }
    } else if (counter === 4) {
        var quantityUpdate = {};
        var d = new Date;
        quantityUpdate.NewQuantity = inventoryObject.inventory[indexToBeEdited].Quantity;
        quantityUpdate.QuantityChange = quantityUpdate.NewQuantity - (inventoryObject.inventory[indexToBeEdited].QuantityChanges[inventoryObject.inventory[indexToBeEdited].QuantityChanges.length - 1].NewQuantity);
        quantityUpdate.Initials = editQuantityInputValue;
        quantityUpdate.DateStamp = d;
        inventoryObject.inventory[indexToBeEdited].QuantityChanges.push(quantityUpdate);
        displaySearchResults([inventoryObject.inventory[indexToBeEdited]]);
        $("p#editQuantityDivPrompt").html(editQuantityMessages.hitEnterToSearchAgain);
        $("input#editQuantityDivInput").prop('disabled', true);
        resetValues();
    }
    $("input#editQuantityDivInput").val("");
};

function createTextAreaDiv() {
    var textAreaDiv = $("<div>");
    textAreaDiv.attr("id", "textAreaDiv");
    var textArea = $("<textarea>");
    textArea.attr("id", "textArea");
    textArea.attr("rows", "4");
    textArea.attr("cols", "50");
    textAreaDiv.append(textArea);
    textAreaDiv.insertAfter("div#commandMenuDiv");
    textAreaDiv.hide();
};

function createNewInventory() {
    counterLogic();
    if (counter === 0) {
        $("div#createNewInventoryDiv").show();
        $("p#createNewInventoryPrompt").html("You are creating a new inventory. Type initials and hit 'Enter' to continue.");
        $("input#createNewInventoryInput").attr("maxlength", "3");
    } else if (counter === 1) {
        $("input#createNewInventoryInput").prop("disabled", true);
        var d = new Date;
        inventoryObject = {
            createdBy: $("input#createNewInventoryInput").val(),
            dateCreated: d,
            inventory: []
        }
        $("input#createNewInventoryInput").val("");
        $("p#createNewInventoryPrompt").html("Inventory created. Press 'Enter' to continue.");
    } else if (counter === 2) {
        resetValues();
        runAFunction("div#menuInputDiv");
        $("div.inputDiv:visible input").select();
    }
};

function printInventory() {
    counterLogic();
    if (counter === 0) {
        $("div#textAreaDiv").show();
        $("input#printInputDivInput").prop('disabled', true);
        console.log(inventoryObject.inventory);
        $("div#textAreaDiv textarea").val(JSON.stringify(inventoryObject));
        $("div#textAreaDiv textarea").select();
        document.execCommand("copy");
        $("div#textAreaDiv").hide();
        $("p#printInputDivPrompt").html("Your JSON text has been copied. Please save it to a file. <br> Press 'Enter' to return to menu.");
    } else if (counter === 1) {
        resetValues();
        runAFunction("div#menuInputDiv");
        $("div.inputDiv:visible input").select();
    }
};

function noInventoryErrorCatch() {
    counterLogic();
    if (counter === 0) {
        $("input#noInventoryErrorCatchDivInput").prop("disabled", true);
        $("p#noInventoryErrorCatchDivPrompt").html("You have not defined an inventory yet. <br> Press 'Enter' to return to menu.");
    } else if (counter === 1) {
        resetValues();
        runAFunction("div#menuInputDiv");
        $("div.inputDiv:visible input").select();
    }
};

function uploadInventory() {
    counterLogic();
    console.log(counter);
    console.log("inventoryObject is undefined: " + (inventoryObject === undefined));
    if (counter === 0) {
        if (inventoryObject !== undefined) {
            $("input#uploadInputDivInput").prop('disabled', true);
            $("p#uploadInputDivPrompt").html("You are already working with an inventory. <br> Press 'Enter' to return to menu.");
            counter++;
        } else if (inventoryObject === undefined) {
            $("div#textAreaDiv").show();
            $("input#uploadInputDivInput").prop('disabled', true);
            $("p#uploadInputDivPrompt").html("Please paste in your JSON text. <br> Press 'Enter' when ready to upload.");
        }
    } else if (counter === 1) {
        if (inventoryObject !== undefined) {
            resetValues();
            runAFunction("div#menuInputDiv");
            $("div.inputDiv:visible input").select();
        } else if (inventoryObject === undefined) {
            inventoryObject = JSON.parse($("div#textAreaDiv textarea").val());
            console.log(inventoryObject.inventory);
            $("div#textAreaDiv textarea").val("");
            $("div#textAreaDiv").hide();
            $("p#uploadInputDivPrompt").html("Inventory uploaded. " + inventoryObject.inventory.length + " items in array. <br> Remember to save when finished. Press 'Enter' to return to menu.");
        }
    } else if (counter === 2) {
        resetValues();
        runAFunction("div#menuInputDiv");
        $("div.inputDiv:visible input").select();
    }
};