'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoNotice = document.querySelector(".todo-notice");
let toDoData = [];

const render = function() {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  // debugger
  toDoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <span class="text-todo">${item.text}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `;
    // Запись в локалСторэдж
    localStorage.setItem("toDoData", JSON.stringify(toDoData));

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function() {
      item.completed = !item.completed;
      render();
    });
    // Удаление элемента
    li.querySelector(".todo-remove").addEventListener("click", function() {
      toDoData.splice(index, 1);
      localStorage.removeItem("toDoData")
      render();
    });

  });
};

todoControl.addEventListener("submit", function(e) {
  e.preventDefault();
  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  // Проверка на пустоту поля
  if (headerInput.value.trim()) {
    toDoData.push(newToDo);
    headerInput.value = "";
    render();
  } else {
    headerInput.value = "";
    headerInput.style.transition = "0.4s all"
    todoNotice.style.transition = "0.4s all"
    todoNotice.style.left = "15px"
    headerInput.style.background = "rgba(247, 136, 130, 0.7)";
  }
});
headerInput.addEventListener("input", function() {
  headerInput.style.transition = "0.4s all"
  todoNotice.style.transition = "0.4s all"
  todoNotice.style.left = "-270px"
  headerInput.style.background = "rgba(255, 255, 255, 0.2)";
});
// Проверка локалСторэджа и их рендер
const localStorageCheck = function() {
  if (localStorage.key("toDoData")) {
    toDoData = JSON.parse(localStorage.getItem("toDoData"));
    render();
  }
};

localStorageCheck()
