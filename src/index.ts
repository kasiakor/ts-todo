import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection";

// TodoItem - id, task, complete
let todos: TodoItem[]  = [
    new TodoItem (1, "buy flour"),  new TodoItem (2, "write a letter", true), new TodoItem (3, "call my sister")];

// TodoCollection - userName, tasks []
// let collection: TodoCollection = new TodoCollection("Gia", todos);

let collection: TodoCollection = new JsonTodoCollection("Gia", todos);
let showCompleted: boolean = true;


enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove Completed Tasks",
    Quit = "Quit"
}

//The callback to execute when the Promise is resolved .then()
function promptAdd(): void {
        console.clear();
        inquirer.prompt({
        type: "input",
        name: "add",
        message: "Add a new task:"
    }).then(answers => {
        if(answers["add"] !=="") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    })  
}
function promptComplete(): void {
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
        choices: collection.getTodoItems(showCompleted).map(item => ({name: item.task, value: item.id, checked: item.complete}))
         // Object literal may only specify known properties, and 'badProperty' does not exist in type 'ListQuestion' : badProperty: true
    }).then(answers => {
        // inquirer.prompt(questions, answers) -> promise
        // answers (object) contains values of already answered questions. Inquirer will avoid asking answers already provided here.
        let completedTasks = answers["complete"] as number[];
        // include completed tasks
        collection.getTodoItems(true).forEach(item =>
            // markComplete(id: number, complete: boolean) 
            collection.markComplete(item.id,
                completedTasks.find(id => id === item.id) != undefined));
                promptUser();

    })  
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
                if(collection.getItemsCount().incomplete > 0) {
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
    })
}

promptUser();


function displayTodoList(): void {
    //console.log(`${collection.userName}'s Todo List` + ` (${collection.getItemsCount().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}


