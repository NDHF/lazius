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
        SubSubject: "Classics",
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
    "By how many?"
];

var add;

var searchInputArray = [];

var itemParameters = ["Title", "Author", "Subject", "SubSubject", "Location", "Quantity"];

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
    runMenu();
    createResultsTableDiv();
};

function runGetInformation() {
    $("div#menuInputDiv").hide();
    $("div#addInputDiv").show();
    $("div#searchInputDiv").hide();
    $("div#editQuantityDiv").hide();
    getInformation();
};

function runMenu() {
    $("div#menuInputDiv").show();
    $("div#addInputDiv").hide();
    $("div#searchInputDiv").hide();
    $("div#editQuantityDiv").hide();
};

function runSearchInventory() {
    $("div#menuInputDiv").hide();
    $("div#addInputDiv").hide();
    $("div#searchInputDiv").show();
    $("div#editQuantityDiv").hide();
    searchInventory();
};

$(document).on("keydown", function (event) {
    if (event.originalEvent.key === "Enter") {
        if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "add")) {
            runGetInformation();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() !== "undo") && ($("input#addInputDivInput").val() !== "quit")) {
            getInformation();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() === "quit")) {
            resetValues();
            runMenu();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() === "undo")) {
            undo("input#addInputDivInput", itemPropertyInput, "p#addInputDivPrompt", itemParameters);
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "search")) {
            runSearchInventory();
        } else if ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() !== "undo") && ($("input#searchInputDivInput").val() !== "quit")) {
            $("div#resultsTableDiv").hide();
            $("p#searchResultsString").hide();
            searchInventory();
        } else if ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() === "quit")) {
            resetValues();
            runMenu();
        } else if ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() === "undo")) {
            undo("input#searchInputDivInput", searchInputArray, "p#searchInputDivPrompt", itemSearchPrompts);
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "edit")) {
            editQuantity();
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
    $("input.activeTextInput").val("");
    counter = undefined;
    add = undefined;
    itemPropertyInput = [];
    searchInputArray = [];
    searchResults = [];
};

function searchInventory() {
    $("input#searchInputDivInput").prop('disabled', false);
    var searchResults = [];
    console.log("The searchInventory function was called!");
    console.log(itemSearchPrompts.length);
    counterLogic();
    console.log(counter);
    $("p#searchInputDivPrompt").html(itemSearchPrompts[counter]);
    searchInputArray.push($("input#searchInputDivInput").val());
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
    if (counter === itemParameters.length) {
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
    book.ID = inventory.length + 1;
    inventory.push(book);
    console.log(inventory);
    resetValues();
    getInformation();
};

function editQuantity() {
    $("div#editQuantityDiv").show();
    console.log("editQuantity was called!");
    counterLogic();
    console.log(counter);
    $("p#editQuantityDivPrompt").html(editQuantityPromptArray[counter]);
    if (counter === 1) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].ID === $("input#editQuantityDivInput").val()) {
                searchResults.push(inventory[i]);
            }
        }
        displaySearchResults(searchResults);
    } else if ((counter === 2) && ($("input#editQuantityDivInput").val() === "add")) {
        if (($("input#editQuantityDivInput").val() !== "add") && ($("input#editQuantityDivInput").val() !== "deduct")) {
            counter--;
            $("p#editQuantityDivPrompt").html("Please enter 'add' or 'subtract");
        } else if ($("input#editQuantityDivInput").val() === "add") {
            add = true;
        } else if ($("input#editQuantityDivInput").val() === "deduct") {
            add = false;
        }
    } else if (counter === 3) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].ID === $("input#editQuantityDivInput").val()) {
                inventory[i].Quantity = $("input#editQuantityDivInput").val();
            }
        }
        resetValues();
    }
    $("input#editQuantityDivInput").val();
};