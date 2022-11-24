//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

//local storage
const LocalStorageList = "taskTodos";
let todos = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

// create todo array with id, name and completed
function createTodo() {
  let id = todos.length + 1;
  return { id: id.toString(), name: input.value, completed: false };
}

// add todo in todos array, save to storage, launch display and setting
function addTodo() {
  todos.push(createTodo());
  saveToLocalstorage();
  displayTodo();
  settingTodo();
}

//display todo
function displayTodo() {
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
    settingTodo();
  } else {
    return;
  }
}

// save in local storage
function saveToLocalstorage() {
  localStorage.setItem(LocalStorageList, JSON.stringify(todos));
}

// settingTodo
function settingTodo() {
  const btn = document.querySelectorAll(".btn");
  const todo = document.querySelectorAll(".todo");
  const cross = document.querySelectorAll(".cross");

  const newArr = todos.map((element) => {
    if (element == "false") {
      return "true";
    }
    return element;
  });

  //for each btn
  btn.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.classList.remove("btnClicked");
      } else {
        element.parentElement.classList.add("btnClicked");

        let elementClass = element.parentElement.classList;
        let elementId = element.parentElement.id;
        let changeTodos = todos[elementId - 1].completed;

        if (elementClass.contains("btnClicked")) {
        }
      }
      return;
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
        saveToLocalstorage();

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
