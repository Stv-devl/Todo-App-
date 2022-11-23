//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

//local storage
const LocalStorageList = "taskTodos";
let todos = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

// create todo
function creatTodo() {
  let id = todos.length + 1;
  return { id: id.toString(), name: input.value, completed: false };
}

// add todo in todos array
function addTodo() {
  todos.push(creatTodo());
  saveToLocalstorage(todos);
  displayTodo(todos);
}

//display todo
function displayTodo(todos) {
  let findList = todos.length - 1;

  console.log(todos[findList].name);

  list.innerHTML += `<li class="todo" id="${todos[findList].id}">
  <button class="btn"></button>
  <p class="text"> ${todos[findList].name}</p>
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
  } else {
    return;
  }
}
// save in local storage
function saveToLocalstorage(todos) {
  localStorage.setItem(LocalStorageList, JSON.stringify(todos));
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
