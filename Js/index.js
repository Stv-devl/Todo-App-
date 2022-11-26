//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

//local storage
const LocalStorageList = "taskTodos";
let todos = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

displayNumberOfTodo();

// create todo array with id, name and completed statut
function createTodo() {
  let id = todos.length + 1;
  return { id: id, name: input.value, completed: false };
}

//function calculate
function calculate() {
  for (let i = 0; i < todos.length; i++) {
    let item = todos[i];
  }
}

// add todo in todos array, save to storage, launch display and setting functions
function createTodoArray() {
  todos.push(createTodo());
  saveToLocalstorage();
  displayTodo();
  displayNumberOfTodo();
  settingTodo();
}

//display todo on page
function displayTodo() {
  let listNumber = todos.length - 1;

  list.innerHTML += `<li class="todo" id="${todos[listNumber].id}">
  <button class="btn"></button>
  <p class="text"> ${todos[listNumber].name}</p>
  <svg class="cross"></svg>
</li>`;
}

//display todo at reload && when we delete one <li></li>
function getTodos() {
  if (window.localStorage.taskTodos) {
    list.innerHTML = ""; // when we delete one <li></li> we will delete all the <li></li> for write it again, if not it's write 2 times

    for (let i = 0; i < todos.length; i++) {
      let item = todos[i];

      //for each <li></li>
      list.innerHTML += `<li class="todo" id="${item.id}">
        <button class="btn"></button>
        <p class="text"> ${item.name}</p>
        <svg class="cross"></svg>
      </li>`;

      relaunchBtnCLicked(i);
      settingTodo();
    }
  }
  return;
}

//when the page is reload we have to keep classList = "todo BtnClicked", so if completed is true we add btnClicked at reload
function relaunchBtnCLicked(i) {
  const todo = document.querySelectorAll(".todo");
  if (todos[i].completed == true) {
    todo[i].classList = "todo btnClicked";
  }
  return;
}

//display number of todo left
function displayNumberOfTodo() {
  const filterFalse = todos.filter(function (falseFilter) {
    return falseFilter.completed == false;
  });
  numberDisplay.innerHTML = filterFalse.length;
}

// save data to local storage
function saveToLocalstorage() {
  localStorage.setItem(LocalStorageList, JSON.stringify(todos));
}

// settingTodo for check button and delete todos
function settingTodo() {
  const btn = document.querySelectorAll(".btn");
  const cross = document.querySelectorAll(".cross");

  //for each btn => when we click on the button : completed become "true", and we add btnClicked to classList. => when we uncheck button, completed become "false" and we remove btnClicked to classlist
  btn.forEach((element) => {
    element.addEventListener("click", (e) => {
      let elementId = element.parentElement.id;

      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.classList.remove("btnClicked");
        todos[elementId - 1].completed = false;
        displayNumberOfTodo();
        saveToLocalstorage();
      } else {
        element.parentElement.classList.add("btnClicked");
        todos[elementId - 1].completed = true;
        displayNumberOfTodo();
        saveToLocalstorage();
      }
    });
  });
  //for each cross => when we click on the cross we delete the innerHtml and we remove the array from localStorage
  cross.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.parentElement.classList.contains("btnClicked")) {
        element.parentElement.remove(list.innerHTML);

        let elementId = element.parentElement.id;

        todos.splice(elementId - 1, 1);

        updateId();
        saveToLocalstorage();
        getTodos(); //we launch getTodos for change id number in the <li></li> after delete 1 todo
        displayNumberOfTodo();

        return;
      }
    });
  });
}

// we update the id number after removing a todo from list
function updateId() {
  for (i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
  }
}

/*************************************AddEventListener************************************/

//when page is reload send start launch getTodo()
window.addEventListener("load", getTodos);

//write todo in input
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    return;
  } else {
    createTodoArray(input.value);
    input.value = "";
  }
});
