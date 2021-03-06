"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
// TodoItem - id, task, complete
let todos = [
    new todoItem_1.TodoItem(1, "buy flour"), new todoItem_1.TodoItem(2, "write a letter", true), new todoItem_1.TodoItem(3, "call my sister")
];
// TodoCollection - userName, tasks []
// let collection: TodoCollection = new TodoCollection("Gia", todos);
let collection = new jsonTodoCollection_1.JsonTodoCollection("Gia", todos);
let showCompleted = true;
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
//The callback to execute when the Promise is resolved .then()
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Add a new task:"
    }).then(answers => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        // A question object is a hash containing question related values:
        // Type of the prompt
        type: "checkbox",
        // The name to use when storing the answer in the answers hash
        name: "complete",
        // The question to print
        message: "Mark Tasks Complete",
        // (Array|Function) Choices array or a function returning a choices array
        choices: collection.getTodoItems(showCompleted).map(item => ({ name: item.task, value: item.id, checked: item.complete }))
        // Object literal may only specify known properties, and 'badProperty' does not exist in type 'ListQuestion' : badProperty: true
    }).then(answers => {
        // inquirer.prompt(questions, answers) -> promise
        // answers (object) contains values of already answered questions. Inquirer will avoid asking answers already provided here.
        let completedTasks = answers["complete"];
        // include completed tasks
        collection.getTodoItems(true).forEach(item => 
        // markComplete(id: number, complete: boolean) 
        collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    });
}
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
    }).then(answers => {
        // inquirer.prompt(questions, answers) -> promise
        // answers (object) contains values of already answered questions. Inquirer will avoid asking answers already provided here. 
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                console.log(collection.todoItems);
                break;
            case Commands.Complete:
                // getItemsCount().total, getItemsCount().incomplete
                if (collection.getItemsCount().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                console.log("complete called");
                break;
            case Commands.Purge:
                collection.removeComplete();
                console.log("purge called");
                promptUser();
                break;
        }
    });
}
promptUser();
function displayTodoList() {
    //console.log(`${collection.userName}'s Todo List` + ` (${collection.getItemsCount().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
