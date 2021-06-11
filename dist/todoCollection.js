"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        // var Map: MapConstructor, new () => Map<any, any> 
        this.itemMap = new Map();
        // (method) Map<number, TodoItem>.set(key: number, value: TodoItem): Map<number, TodoItem>
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.getToDoById(this.nextId)) {
            return this.nextId++;
        }
        // this.todoItems.push(new TodoItem (this.nextId, task));
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    }
    getToDoById(id) {
        // (method) Map<number, TodoItem>.get(key: number): TodoItem
        return this.itemMap.get(id);
        //return this.todoItems.find(item => item.id === id);
    }
    markComplete(id, complete) {
        const todoItem = this.getToDoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
}
exports.TodoCollection = TodoCollection;
