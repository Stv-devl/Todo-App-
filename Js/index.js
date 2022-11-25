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
  return { id: id, name: input.value, completed: false };
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

//display todo at reload && when we delete li
function getTodos() {
  if (window.localStorage.taskTodos) {
    list.innerHTML = ""; // when we delete 1 li we will delete list.innerHtml for write it again
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

// save data to local storage
function saveToLocalstorage() {
  localStorage.setItem(LocalStorageList, JSON.stringify(todos));
}

// settingTodo for check button and delete todos
function settingTodo() {
  const btn = document.querySelectorAll(".btn");
  const cross = document.querySelectorAll(".cross");

  //for each btn => when we check button : completed become "true", and we add btnClicked to classList. => when we uncheck completed become "false" and we remove btnClicked to class list
  btn.forEach((element) => {
    element.addEventListener("click", (e) => {
      let elementId = element.parentElement.id;

      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.classList.remove("btnClicked");
        todos[elementId - 1].completed = false;
        saveToLocalstorage();
      } else {
        element.parentElement.classList.add("btnClicked");
        todos[elementId - 1].completed = true;
        saveToLocalstorage();
      }
    });
  });
  //for each cross => when we click on the cross we delete the innerHtml, and we remove array from localStorage
  cross.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.remove(list.innerHTML);

        let elementId = element.parentElement.id;

        todos.splice(elementId - 1, 1);

        updateId();
        saveToLocalstorage();
        getTodos(); //we relaunch getTodos for change Id number in html after delete 1 todo

        return;
      }
    });
  });
}

// update Id number when we remove a todo from list
function updateId() {
  for (i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
  }
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
