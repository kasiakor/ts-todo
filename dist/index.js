"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
// TodoItem - id, task, complete
let todos = [
    new todoItem_1.TodoItem(1, "buy flour"), new todoItem_1.TodoItem(2, "write a letter", true), new todoItem_1.TodoItem(3, "call my sister")
];
// TodoCollection - userName, tasks []
let collection = new todoCollection_1.TodoCollection("Gia", todos);
console.clear();
console.log(`${collection.userName}'s Todo List`);
// let newTaskId: number = collection.addTodo("go to bank");
// returns number "1"
// console.log(newTaskId);
// let newTask: TodoItem = collection.getToDoById(newTaskId);
// returns first item with passed id
// TodoItem { id: 1, task: 'buy flour', complete: false }
// console.log(newTask);
// newTask.printDetails();
// collection.addTodo(newTaskId);
// getTodoItems = TodoItem[]
collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails());
