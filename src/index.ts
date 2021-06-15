import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";

// TodoItem - id, task, complete
let todos: TodoItem[]  = [
    new TodoItem (1, "buy flour"),  new TodoItem (2, "write a letter", true), new TodoItem (3, "call my sister")];

// TodoCollection - userName, tasks []
let collection: TodoCollection = new TodoCollection("Gia", todos);
let showCompleted: boolean = true;

console.clear();

//collection.removeComplete();

function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List` + ` (${collection.getItemsCount().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

// assigns names to values
enum Commands {
    Toggle = "Show/Hide Completed",
    Quit = "Quit"
}

function promptUser(): void {
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
        switch (answer["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                console.log("hi");
                break;
        }
    })
}
promptUser();