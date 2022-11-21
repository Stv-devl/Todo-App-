//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

// Store function
function storeList() {
  window.localStorage.todoList = list.innerHTML;

  console.log(list);
}

// display fonction at reload
function getTodos() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
    settingTodo();
  } else {
    return;
  }
}

// settingTodo
function settingTodo() {
  const btn = document.querySelectorAll(".btn");
  const todo = document.querySelectorAll(".todo");
  const cross = document.querySelectorAll(".cross");

  displayNumber();

  function displayNumber() {
    numberDisplay.textContent = todo.length;
  }

  //for each btn
  btn.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.classList.remove("btnClicked");

        storeList();
      } else {
        element.parentElement.classList.add("btnClicked");
        storeList();
      }
    });
  });

  //for each cross => deleted
  cross.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.remove(list.innerHTML);
        storeList();
        /*    window.location.reload();*/
      } else {
        return;
      }
    });
  });
}

//inject lign todo & html => send to internal storage
function addTodo() {
  list.innerHTML += `
  <li class="todo">
        <button class="btn"></button>
        <p class="text"> ${input.value}</p>
        <svg class="cross"></svg>
  </li>`;

  storeList();
  settingTodo();
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
