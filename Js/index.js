//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const listing = document.querySelectorAll(".listing");

//local storage
const LocalStorageList = "taskTodos";
let todos = JSON.parse(localStorage.getItem(LocalStorageList)) || [];

// create todo array with id, name and completed statut
function createTodo() {
  let id = todos.length + 1;
  return { id: id.toString(), name: input.value, completed: false };
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
  <button class="btn"><svg class="check"></svg></button>
  <p class="text"> ${todos[listNumber].name}</p>
  <svg class="cross"></svg>
</li>`;
}

//display todo at reload && when we delete one <li></li>
function getTodos() {
  displayNumberOfTodo();
  list.innerHTML = ""; // when we delete one <li></li> we will delete all the <li></li> for write it again, if not it's write 2 times

  //filter : all
  if (
    window.localStorage.taskTodos &&
    all.classList.contains("listingClicked")
  ) {
    for (let i = 0; i < todos.length; i++) {
      list.innerHTML += `<li class="todo" id="${todos[i].id}">
      <button class="btn"><svg class="check"></svg></button>
        <p class="text"> ${todos[i].name}</p>
        <svg class="cross"></svg>
      </li>`;

      relaunchBtnCLicked(i);
      settingTodo();
    }
    return;

    //filter : active
  } else if (
    window.localStorage.taskTodos &&
    active.classList.contains("listingClicked")
  ) {
    const filterFalse = todos.filter(function (falseTrue) {
      return falseTrue.completed == false;
    });

    for (let i = 0; i < filterFalse.length; i++) {
      list.innerHTML += `<li class="todo" id="${filterFalse[i].id}">
      <button class="btn"><svg class="check"></svg></button>
        <p class="text"> ${filterFalse[i].name}</p>
        <svg class="cross"></svg>
      </li>`;

      settingTodo();
    }

    //filter : completed
  } else if (
    window.localStorage.taskTodos &&
    completed.classList.contains("listingClicked")
  ) {
    const filterTrue = todos.filter(function (trueFilter) {
      return trueFilter.completed == true;
    });

    for (let i = 0; i < filterTrue.length; i++) {
      list.innerHTML += `<li class="todo" id="${filterTrue[i].id}">
  <button class="btn"><svg class="check"></svg></button>
        <p class="text"> ${filterTrue[i].name}</p>
        <svg class="cross"></svg>
      </li>`;

      relaunchBtnCLicked(i);
      settingTodo();
    }
  }
}

//when the page is reload we have to keep classList = "todo BtnClicked", so if completed is true we add btnClicked at reload. And also working when we click on completed button
function relaunchBtnCLicked(i) {
  const todo = document.querySelectorAll(".todo");

  if (todos[i].completed == true && all.classList.contains("listingClicked")) {
    todo[i].classList.add("btnClicked");
  } else if (
    window.localStorage.taskTodos &&
    completed.classList.contains("listingClicked")
  ) {
    todo[i].classList.add("btnClicked");
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

//filter todo listing : All, only Active and only Completed
listing.forEach((element) => {
  element.addEventListener("click", (e) => {
    listing.forEach((element) => {
      element.classList.remove("listingClicked");
    });
    if (element.classList.contains("listingClicked")) {
      element.classList.remove("listingClicked");
      getTodos();
    } else {
      element.classList.add("listingClicked");
      getTodos();
    }
  });
});

//clear completed button
clear.addEventListener("click", (e) => {
  const filterTrue = todos.filter(function (trueFilter) {
    return trueFilter.completed == true;
  });

  for (let i = 0; i < filterTrue.length; i++) {
    todos.splice(filterTrue[i].id - 1, 1);

    updateId();
    saveToLocalstorage();
    getTodos(); //we launch getTodos for change id number in the <li></li> after delete 1 todo
    displayNumberOfTodo();
  }
});

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
