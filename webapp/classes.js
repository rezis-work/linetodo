import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(other) {
    return this.text == other.text;
  }
}

export class TodoList {
  // candidate of singleton
  #data = new Set();

  get items() {
    return this.#data;
  }

  static instance = null;

  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() instead");
    }
  }

  add(item) {
    if (item.text === "") return;
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
      this.notifyObservers();
    }
  }

  delete(todo_text) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((t) => t.text == todo_text)[0];
    this.#data.delete(todoToDelete);
    this.notifyObservers();
  }

  find(todo_text) {
    const array = Array.from(this.#data);
    return array.find((t) => t.text == todo_text);
  }

  replaceList(list) {
    this.#data = list;
    this.notifyObservers();
  }
}

Object.assign(TodoList.prototype, observerMixin);
