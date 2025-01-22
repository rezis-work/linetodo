import { TodoList } from "./webapp/classes.js";
import { CommandExecutor, Command, Commands } from "./webapp/command.js";
import { TodoHistory } from "./webapp/memento.js";
import { LocalStoradge } from "./webapp/storadge.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

function renderList() {
  DOM.todoList.innerHTML = "";
  const list = TodoList.getInstance();
  for (let todo of list.items) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    listItem.innerHTML = `
          ${todo.text} <button class="delete-btn">Delete</button>
        `;
    listItem.dataset.text = todo.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todo = event.target.parentNode.dataset.text;
      console.log(todo);
      const cmd = new Command(Commands.DELETE, [todo]);
      CommandExecutor.execute(cmd);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  TodoList.getInstance().addObserver(renderList);
});

document.addEventListener("DOMContentLoaded", () => {
  LocalStoradge.load();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "a") {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  }
  if (event.ctrlKey && event.key === "q") {
    console.log(TodoHistory.history);
    const cmd = new Command(Commands.UNDO);
    CommandExecutor.execute(cmd);
  }
});
