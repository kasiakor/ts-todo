import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

// TodoItem - id, task, complete
let todos: TodoItem[]  = [
    new TodoItem (1, "buy flour"),  new TodoItem (2, "write a letter"), new TodoItem (3, "call my sister")]

// TodoCollection - userName, tasks []
let collection: TodoCollection = new TodoCollection("Gia", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

let newTaskId: number = collection.addTodo("go to bank");
// returns number "1"
console.log(newTaskId);

let newTask: TodoItem = collection.getToDoById(newTaskId);
// returns first item with passed id
// TodoItem { id: 1, task: 'buy flour', complete: false }
console.log(newTask);

newTask.printDetails();

// collection.addTodo(newTaskId);