//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");
let array = [];

// Store function
function storeList() {
  window.localStorage.todoList = list.innerHTML;
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

  /*
  const arrayClicked = [];
  const array = [];

  for (let i = 0; i < todo.length; i++) {
    let item = todo[i];

    if (item.classList == "todo btnClicked") {
      localStorage.todoListClicked = list.innerHTML;
    }
  }
  */

  /*
  displayNumber();

  function displayNumber() {
    numberDisplay.textContent = todo.length;
  }
  */

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
  const todo = document.querySelectorAll(".todo");

  list.innerHTML += `<li class="todo" id="${todo.length + 1}">
  <button class="btn"></button>
  <p class="text"> ${input.value}</p>
  <svg class="cross"></svg>
</li>`;

  let objJson = {
    id: todo.length + 1,
    name: input.value,
    completed: false,
  };

  array.push(objJson);
  localStorage.setItem("todosList", JSON.stringify(array));
  display();
}

function display() {
  localStorage.getItem("todosList");

  /*
  list.innerHTML += `<li class="todo" id="${todo.length + 1}">
        <button class="btn"></button>
        <p class="text"> ${input.value}</p>
        <svg class="cross"></svg>
  </li>`;
  */
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
