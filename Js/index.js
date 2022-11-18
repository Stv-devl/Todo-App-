//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");

// Store function
function storeList() {
  window.localStorage.todoList = list.innerHTML;
}

// Sdisplay fonction at reload
function getTodos() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  } else {
    return;
  }
}

//inject lign todo & html
function addTodo() {
  list.innerHTML += `
  <li class="todo">
        <button class="btn"></button>
        ${input.value}</li>`;

  storeList();
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
  return;
});
