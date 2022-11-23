//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

//local storage
const LocalStorageList = "taskTodos";
let todos = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

// create todo
function createTodo() {
  let id = todos.length + 1;
  return { id: id.toString(), name: input.value, completed: false };
}

// add todo in todos array
function addTodo() {
  todos.push(createTodo());
  saveToLocalstorage(todos);
  displayTodo(todos);
  settingTodo(todos);
}

//display todo
function displayTodo(todos) {
  let listNumber = todos.length - 1;

  list.innerHTML += `<li class="todo" id="${todos[listNumber].id}">
  <button class="btn"></button>
  <p class="text"> ${todos[listNumber].name}</p>
  <svg class="cross"></svg>
</li>`;
}

//display todo at reload

function getTodos() {
  if (window.localStorage.taskTodos) {
    for (let i = 0; i < todos.length; i++) {
      let item = todos[i];

      list.innerHTML += `<li class="todo" id="${item.id}">
        <button class="btn"></button>
        <p class="text"> ${item.name}</p>
        <svg class="cross"></svg>
      </li>`;
    }
    settingTodo(todos);
  } else {
    return;
  }
}

// save in local storage
function saveToLocalstorage(todos) {
  localStorage.setItem(LocalStorageList, JSON.stringify(todos));
}

// settingTodo
function settingTodo(todos) {
  const btn = document.querySelectorAll(".btn");
  const todo = document.querySelectorAll(".todo");
  const cross = document.querySelectorAll(".cross");

  //for each btn
  btn.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.classList.remove("btnClicked");
      } else {
        element.parentElement.classList.add("btnClicked");
      }
    });
  });

  //for each cross => deleted
  cross.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.remove(list.innerHTML);

        let elementID = element.parentElement.id;

        for (i = 0; i < todos.length; i++)
          if (todos[i].id == elementID) todos.splice(i, 1);
        localStorage["taskTodos"] = JSON.stringify(todos);

        return;
      }
    });
  });
}

/*************************************AddEventListener************************************/

//when page is load send to storage
window.addEventListener("load", getTodos);

//sumbit todo
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    return;
  } else {
    addTodo(input.value);
    input.value = "";
  }
});
