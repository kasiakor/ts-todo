import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

// TodoItem - id, task, complete
let todos: TodoItem[]  = [
    new TodoItem (1, "buy flour"),  new TodoItem (2, "write a letter", true), new TodoItem (3, "call my sister")];

// TodoCollection - userName, tasks []
let collection: TodoCollection = new TodoCollection("Gia", todos);

console.clear();

collection.removeComplete();
function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List` + ` (${collection.getItemsCount().incomplete} items to do)`);
    collection.getTodoItems(true).forEach(item => item.printDetails());
}
