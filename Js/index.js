//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");

console.log(form);

function getTodo() {
  console.log(input.value);
}

/*************************************AddEventListener************************************/

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    /* errorDisplay.textContent = "Please write something";*/
    return;
  } else {
    getTodo(input.value);
  }
});
