// LAZIUS (LOT-ZEE-US), AN INVENTORY PROGRAM
// Lazius allows a user to manipulate an inventory using a browser interface. 

// This is a dummy inventory with objects already inside, for use while designing the program. 
var inventory = [{
        Title: "Moby-Dick",
        Author: "Melville, Herman",
        Subject: "Fiction",
        SubSubject: "Classics",
        Location: "Closet Bookshelf"
    },
    {
        Title: "Desperation",
        Author: "King, Stephen",
        Subject: "Fiction",
        SubSubject: "Classics",
        Location: "Main Bookshelf"
    },
    {
        Title: "The Tale of Despereaux",
        Author: "DiCamillo, Kate",
        Subject: "Fiction",
        SubSubject: "Children's Fiction",
        Location: "Main Bookshelf"
    },
    {
        Title: "Zen and the Art of Motorcycle Maintenance",
        Author: "Pirsig, Robert M.",
        Subject: "Philosophy",
        SubSubject: "Metaphysics of Quality",
        Location: "Main Bookshelf"
    }
];

// var inventory = [];

var itemSearchPrompts = [
    "What parameter would you like to use?",
    "What is the value of that parameter?",
    "Is there a second parameter you would like to use?",
    "What is the value of that parameter?"
];

var searchInputArray = [];

var itemParameters = ["Title", "Author", "Subject", "Sub-subject", "Location"];

var itemPropertyInput = [];

var counter;

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
    textInput.attr("class", "inline");
    textInput.attr("id", inputID);
    textInput.attr("class", "activeTextInput");
    searchField.append(textInput);

    searchField.insertBefore("div#commandMenuDiv");
};

function createMenuInputDiv() {
    createInputDiv("menuInputDiv", "menuInputDivPrompt", "What would you like to do?", "menuInputDivInput");
};

function createAddInputDiv() {
    createInputDiv("addInputDiv", "addInputDivPrompt", "", "addInputDivInput");
};

function createSearchInputDiv() {
    createInputDiv("searchInputDiv", "searchInputDivPrompt", "", "searchInputDivInput");
};

function createInputDivs() {
    createMenuInputDiv();
    createAddInputDiv();
    createSearchInputDiv();
};

function programStart() {
    createInputDivs();
    runMenu();
};

function runGetInformation() {
    $("div#menuInputDiv").hide();
    $("div#addInputDiv").show();
    $("div#searchInputDiv").hide();
    getInformation();
};

function runMenu() {
    $("div#menuInputDiv").show();
    $("div#addInputDiv").hide();
    $("div#searchInputDiv").hide();
};

function runSearchInventory() {
    $("div#menuInputDiv").hide();
    $("div#addInputDiv").hide();
    $("div#searchInputDiv").show();
    searchInventory();
}

programStart();

$(document).on("keydown", function (event) {
    if (event.originalEvent.key === "Enter") {
        if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "add")) {
            runGetInformation();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() !== "undo") && ($("input#addInputDivInput").val() !== "quit")) {
            getInformation();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() === "quit")) {
            counter = undefined;
            itemPropertyInput = [];
            searchInputArray = [];
            runMenu();
        } else if ($("div#addInputDiv").is(":visible") && ($("input#addInputDivInput").val() === "undo")) {
            undo();
        } else if ($("div#menuInputDiv").is(":visible") && ($("input#menuInputDivInput").val() === "search")) {
            runSearchInventory();
        } else if ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() !== "undo") && ($("input#searchInputDivInput").val() !== "quit")) {
            searchInventory();
        } else if ($("div#searchInputDiv").is(":visible") && ($("input#searchInputDivInput").val() === "quit")) {
            counter = undefined;
            itemPropertyInput = [];
            searchInputArray = [];
            runMenu();
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

function searchInventory() {
    console.log("The searchInventory function was called!");
    console.log(itemSearchPrompts.length);
    if (counter === undefined) {
        counter = 0;
    } else if (counter !== undefined) {
        counter++;
    }
    console.log(counter);
    $("p#searchInputDivPrompt").html(itemSearchPrompts[counter]);
    searchInputArray.push($("input#searchInputDivInput").val());
    $("input#searchInputDivInput").val("");
    console.log(searchInputArray);
    console.log(searchInputArray[counter]);
    if (counter === itemSearchPrompts.length) {
        if (searchInputArray[0] === "") {
            searchInputArray.shift();
        }
        for (var i = 0; i < inventory.length; i++) {
            if ((inventory[i][searchInputArray[0]] === searchInputArray[1]) && (inventory[i][searchInputArray[2]] === searchInputArray[3])) {
                console.log(inventory[i]);
        }
    }
}
};

function getInformation() {
    console.log("getInformation was called!");
    console.log(itemParameters.length);
    if (counter === undefined) {
        counter = 0;
    } else if (counter !== undefined) {
        counter++;
    }
    console.log(counter);
    $("p#addInputDivPrompt").html(itemParameters[counter] + ": ");
    itemPropertyInput.push($("input#addInputDivInput").val());
    $("input.activeTextInput").val("");
    console.log(itemPropertyInput);
    console.log(itemPropertyInput[counter]);
    if (counter === itemParameters.length) {
        addToInventory();
    }
};

function undo() {
    console.log("undo was called");
    $("input#addInputDivInput").val("");
    itemPropertyInput.pop();
    // itemPropertyInput.pop();
    console.log(itemPropertyInput);
    counter = (counter - 1);
    console.log(counter);
    $("p#addInputDivPrompt").html(itemParameters[counter]);
};

function addToInventory() {
    if (itemPropertyInput[0] === "") {
        itemPropertyInput.shift();
    }
    var book = {};
    for (var i = 0; i < itemParameters.length; i++) {
        book[itemParameters[i]] = itemPropertyInput[i];
    }
    inventory.push(book);
    console.log(inventory);
    // writeToInventory(book);
    // showInventory();
    // Reset variables
    counter = undefined;
    itemPropertyInput = [];
    getInformation();
};