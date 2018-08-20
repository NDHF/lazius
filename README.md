# Lazius
A simple inventory project

# Overview

* The goal of Lazius was to enter data into an inventory rapidly. Everything can be done from the keyboard, and the add-items function loops around, so as soon as one item has been added, you can begin adding in the next one. 

# Features

* Speed: I designed Lazius to be fast. There's no clicking or tabbing between inputs, no dragging the cursor around to hit the submit button. You just type, type, type away. 

* Search Function: Lazius has basic search capabilities. Items may be searched by any of the parameters listed. Up to two parameters may be used in a search.

* Flexibility: Items are stored as JSON objects, in an inventory array. The keys for each object, and their respective properties, are based on an array of item parameters. While the current array is set up for books, it could be used to track other items, or add other parameters. The only limit on this is the last two items Initials and ID, which are required for the program to function. Users must enter a three-letter initial while adding an item, or updating an item's quantity. A date stamp is also created, and added to the object. The Initials and the Date Stamp keys for each object offer a primitive method of tracking the inventory, and give some amount of accountability. The ID is created using a rudimentary auto-increment function, which is based on the length of the inventory array.

* Inventory Tracking: An inventory wouldn't be much good without a way to track it. Every time a user updates an item's quantity, the data on the quantity change is stored within the object.

# Methods Used

* The design was informed by a pure need for speed. There is a single input field, and everything, from data entry to calling functions, requires only the input field and the Enter key. This requires a main function that is called each time the Enter key is pressed, and uses the vales in the input field to choose which function to call. For example, typing 'quit' and then hitting Enter will always return the user to the main menu. 

* Different functions are called by typing commands into the input field. A menu of commands is always displayed at the below the input field. A list of possible parameters is always displayed when running the 'search' function, or editing an item's quantity.

* The second key element came later: input autofocus. This was one of the first features I wanted to add, and one of the hardest to figure out. Now, the input field is always in focus.

* Each function has its own input field. When a function is called, its input field and associated elements (divs, lists, tables) are shown, and all others are hidden.
 
# Future Functionality

* The primary goal with this app is to make it connect to a database, likely MySQL.
* I might add the ability to search using three parameters.
* I would like to add auto-capitalize, which might save some time on hitting the Shift key.
* I could build a show-all function, that would display all items in the inventory.
* Various functions for running reports would be useful.

# Acknowledgements

* A method for using jQuery to clear an HTML table was taken from this post on Stack Overflow: https://stackoverflow.com/a/370031. It is credited to user strelok: https://stackoverflow.com/users/2788/strelok
* Big thanks to GitHub user FrogBomb for help with finding bugs.

# About the name

* The program is named for Wolfgang Lazius (LOT-ZEE-US), a court librarian in the 16th-Century Holy Roman Empire. He is the subject of the background image, a portrait by Arcimboldo.
