// LAZIUS (LOT-ZEE-US), AN INVENTORY PROGRAM
// Lazius allows a user to manipulate an inventory using a browser interface. 

// This is a dummy inventory with objects already inside, for use while designing the program. 
var inventory = [{
        Title: "Moby-Dick",
        Author: "Melville, Herman",
        Subject: "Fiction",
        SubSubject: "Classics",
        Location: "Closet Bookshelf",
        Quantity: 1,
        ID: 1
    },
    {
        Title: "Desperation",
        Author: "King, Stephen",
        Subject: "Fiction",
        SubSubject: "Horror Fiction",
        Location: "Main Bookshelf",
        Quantity: 1,
        ID: 2
    },
    {
        Title: "Tale of Despereaux, The",
        Author: "DiCamillo, Kate",
        Subject: "Fiction",
        SubSubject: "Children's Fiction",
        Location: "Main Bookshelf",
        Quantity: 2,
        ID: 3
    },
    {
        Title: "Zen and the Art of Motorcycle Maintenance",
        Author: "Pirsig, Robert M.",
        Subject: "Philosophy",
        SubSubject: "Metaphysics of Quality",
        Location: "Main Bookshelf",
        Quantity: 1,
        ID: 4
    }
];

// var inventory = [];

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
    for (var i = 0; i < itemParameters.length; i++) {
        console.log(itemParameters[i]);
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
};

function programStart() {
    createInputDivs();
    runAFunction("div#menuInputDiv");
    createResultsTableDiv();
    createParametersList();
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
};

function quitToMenuLogic() {
    if ($("div.inputDiv:visible input").val() === "quit") {
        resetValues();
        runAFunction("div#menuInputDiv");
    }
};

$(document).on("keydown", function (event) {
    if (event.originalEvent.key === "Enter") {
        quitToMenuLogic();
        if (($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "add")) || ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() !== "undo") && ($("input#addInputDivInput").val() !== "quit"))) {
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
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "param")) {
            $("input.activeTextInput").val("");
            $("div#parametersDiv").show();
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
    console.log(itemSearchPrompts.length);
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
    console.log(searchInputArray);
    console.log(searchInputArray[counter]);
    if (counter === itemSearchPrompts.length) {
        $("p#searchInputDivPrompt").html("Hit 'Enter' to search again.");
        $("input#searchInputDivInput").prop('disabled', true);
        if (searchInputArray[0] === "") {
            searchInputArray.shift();
        }
        for (var i = 0; i < inventory.length; i++) {
            if (searchInputArray[2] !== "no") {
                if ((inventory[i][searchInputArray[0]] === searchInputArray[1]) && (inventory[i][searchInputArray[2]] === searchInputArray[3])) {
                    searchResults.push(inventory[i]);
                }
            } else if (searchInputArray[2] === "no") {
                if (inventory[i][searchInputArray[0]] === searchInputArray[1]) {
                    searchResults.push(inventory[i]);
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
    console.log("getInformation was called!");
    console.log(itemParameters.length);
    counterLogic();
    console.log(counter);
    $("p#addInputDivPrompt").html(itemParameters[counter] + ": ");
    itemPropertyInput.push($("input#addInputDivInput").val());
    $("input#addInputDivInput").val("");
    console.log(itemPropertyInput);
    console.log(itemPropertyInput[counter]);
    if (itemParameters[counter] === "Initials") {
        $("input#addInputDivInput").attr("maxlength", "3");
    }
    if (counter === itemParameters.length - 1) {
        addToInventory();
    }
};

function undo(inputID, inputArray, promptID, promptArray) {
    console.log("undo was called");
    $(inputID).val("");
    inputArray.pop();
    console.log(inputArray);
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
    book.ID = parseInt(inventory.length + 1);
    book.QuantityChanges = [];
    book.QuantityChanges[0] = {
        NewQuantity: book.Quantity,
        QuantityChange: 0,
        Initials: book.Initials,
        DateStamp: book.DateStamp
    }
    inventory.push(book);
    console.log(inventory);
    resetValues();
    getInformation();
};

var indexToBeEdited;

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
    if (counter === 0) {
        // $("div#resultsTableDiv").hide();
    } else if (counter === 1) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].ID === parseInt(editQuantityInputValue)) {
                indexToBeEdited = i;
                console.log(indexToBeEdited);
            }
        }
        displaySearchResults([inventory[indexToBeEdited]]);
    } else if (counter === 2) {
        if ((editQuantityInputValue !== "add") && (editQuantityInputValue !== "deduct")) {
            counter--;
            $("p#editQuantityDivPrompt").html(editQuantityMessages.pleaseAddOrDeduct);
        } else if (editQuantityInputValue === "add") {
            add = true;
        } else if (editQuantityInputValue === "deduct") {
            add = false;
        }
        displaySearchResults([inventory[indexToBeEdited]]);
    } else if (counter === 3) {
        $("input#editQuantityDivInput").attr("maxlength", "3");
        var inputIsNotANumber = (isNaN(parseInt(editQuantityInputValue)));
        var inputIsNegative = (parseInt(editQuantityInputValue) < 0);
        var itWouldDeductAnImpossibleAmount = (add === false &&
            (inventory[indexToBeEdited].Quantity - parseInt(editQuantityInputValue) < 0));
        if (inputIsNotANumber || inputIsNegative || itWouldDeductAnImpossibleAmount) {
            counter--;
            console.log(counter);
            console.log(editQuantityMessages.enterDifferentValue);
            $("p#editQuantityDivPrompt").html(editQuantityMessages.enterDifferentValue);
            displaySearchResults([inventory[indexToBeEdited]]);
        } else {
            if (add === true) {
                inventory[indexToBeEdited].Quantity = parseInt(parseInt(inventory[indexToBeEdited].Quantity) + parseInt(editQuantityInputValue));
            } else if (add === false) {
                inventory[indexToBeEdited].Quantity = parseInt(parseInt(inventory[indexToBeEdited].Quantity) - parseInt(editQuantityInputValue));
            }
        }
    } else if (counter === 4) {
        var quantityUpdate = {};
        var d = new Date;
        quantityUpdate.NewQuantity = inventory[indexToBeEdited].Quantity;
        quantityUpdate.QuantityChange = quantityUpdate.NewQuantity - (inventory[indexToBeEdited].QuantityChanges[inventory[indexToBeEdited].QuantityChanges.length - 1].NewQuantity);
        quantityUpdate.Initials = editQuantityInputValue;
        quantityUpdate.DateStamp = d;
        inventory[indexToBeEdited].QuantityChanges.push(quantityUpdate);
        console.log(indexToBeEdited);
        displaySearchResults([inventory[indexToBeEdited]]);
        $("p#editQuantityDivPrompt").html(editQuantityMessages.hitEnterToSearchAgain);
        $("input#editQuantityDivInput").prop('disabled', true);
        resetValues();
    }
    $("input#editQuantityDivInput").val("");
};