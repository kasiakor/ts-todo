"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
const inquirer = require("inquirer");
// TodoItem - id, task, complete
let todos = [
    new todoItem_1.TodoItem(1, "buy flour"), new todoItem_1.TodoItem(2, "write a letter", true), new todoItem_1.TodoItem(3, "call my sister")
];
// TodoCollection - userName, tasks []
let collection = new todoCollection_1.TodoCollection("Gia", todos);
console.clear();
collection.removeComplete();
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List` + ` (${collection.getItemsCount().incomplete} items to do)`);
    collection.getTodoItems(true).forEach(item => item.printDetails());
}
// assigns names to values
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        // A question object is a hash containing question related values:
        // Type of the prompt
        type: "list",
        // The name to use when storing the answer in the answers hash
        name: "command",
        // The question to print
        message: "Choose option",
        // (Array|Function) Choices array or a function returning a choices array
        choices: Object.values(Commands)
        // Object literal may only specify known properties, and 'badProperty' does not exist in type 'ListQuestion' : badProperty: true
    }).then(answer => {
        // inquirer.prompt(questions, answers) -> promise
        // answers (object) contains values of already answered questions. Inquirer will avoid asking answers already provided here. 
        if (answer["command"] !== Commands.Quit) {
            promptUser();
        }
    });
}
promptUser();
