import { TodoItem, TodoList } from "./classes.js";

const todoList = TodoList.getInstance();

export const LocalStoradge = {
  load() {
    if (localStorage.getItem("todos")) {
      for (let t of JSON.parse(localStorage.getItem("todos"))) {
        todoList.add(new TodoItem(t.text));
      }
    }
  },
  save() {
    const array = Array.from(todoList.items);
    localStorage.setItem("todos", JSON.stringify(array));
  },
};

todoList.addObserver(LocalStoradge.save);
