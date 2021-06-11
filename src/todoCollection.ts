import  { TodoItem } from "./todoItem";

export class TodoCollection {
    private nextId: number = 1;

    // var Map: MapConstructor, new () => Map<any, any> 
    private itemMap = new Map<number, TodoItem>(); 

    constructor(public userName: string, public todoItems: TodoItem[] = []) {
        // (method) Map<number, TodoItem>.set(key: number, value: TodoItem): Map<number, TodoItem>
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    addTodo(task: string) : number {
        while (this.getToDoById(this.nextId)) {
            return this.nextId++;
        }
        // this.todoItems.push(new TodoItem (this.nextId, task));
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getToDoById(id: number) : TodoItem {
        // (method) Map<number, TodoItem>.get(key: number): TodoItem
        return this.itemMap.get(id);
        //return this.todoItems.find(item => item.id === id);
    }
    markComplete(id: number, complete: boolean) {
        const todoItem = this.getToDoById(id);
        if(todoItem) {
            todoItem.complete = complete;
        }
    }
}

