//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const todosList = [];

//get todo
function getTodo() {
  todosList.push(input.value);

  addTodo();
}

//inject lign
function addTodo() {
  list.innerHTML += `
  <li class="todo">
        <button class="btn"></button>
        ${input.value}</li>`;

  console.log(todosList);
}
/*************************************AddEventListener************************************/

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    return;
  } else {
    getTodo(input.value);
    input.value = "";
  }
  return;
});
