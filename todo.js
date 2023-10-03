//?el todo
//1-t la opcion de ir agregando los todos
//2-t el check para saber cuando una tarea fue finalizada (y tachar y cambiarle el color al todo)
//3-t una parte para mostrar los items restantes(no terminados)
//*4-t un botton para borrar los todos completados
//*5-t una seccion que muestre todos los elementos, los activos y los completados
//*6-t un drag and drop para reordenar la lista
//!7-t permitir que las tareas se guarden en el localstorage

const formInput = document.querySelector(".form");
const todosContainer = document.querySelector(".todos");
const inputTodo = document.querySelector(".form__input");
const clearCompleted = document.querySelector("#clear-completed");
//Funcion creadora
function todoMaker() {
  //estructura para crear todos
  const taskElemMarkup = `
    <div class="todo">
      <div class="todo-wrapper">
        <input
          class="todo-checkbox"
          type="checkbox"
          name="todo-check"
          id="checkbox"
        />
        <p class="todo__p">
          ${inputTodo.value}
        </p>
      </div>
      <img
        src="./images/icon-cross.svg"
        alt="delete a todo"
        class="delete-todo"
      />
    </div>
  `;
  //constante para agregar los elementos creados al todocontainer
  const taskEl = document.createElement("div");
  taskEl.innerHTML = taskElemMarkup;
  todosContainer.appendChild(taskEl);
  //para que cada vez que se ejecute la funcion se elimine lo que tiene el input
  inputTodo.value = "";

  //parte para agregar funcionalidades cuando el usuario haga check sobre un todo hecho
  const checkboxTodo = taskEl.querySelector(".todo-checkbox");
  const todoP = taskEl.querySelector(".todo__p");

  //un eventListener para agregar la clase checked-active a el todo-p
  checkboxTodo.addEventListener("change", (e) => {
    //parte para hacer la operacion de todos restantes
    const totalCheckboxes = document.querySelectorAll(".todo-checkbox").length;
    const checkedBoxsLenght = document.querySelectorAll(
      ".todo-checkbox:checked"
    ).length;
    //una constante que almacena el calculo de todos restantes
    const uncheckedCheckboxes = totalCheckboxes - checkedBoxsLenght;

    //agregamos la constante que almacena el calculo de los todos restantes al innerHTML de un elemento p que creamos dinamicamente
    const spanP = document.querySelector(".todo-actions__spn--p");
    spanP.innerHTML = uncheckedCheckboxes;
    if (e.target.checked) {
      todoP.classList.add("checked-active");
    } else {
      todoP.classList.remove("checked-active");
    }
  });

  //eventListener de un click que cuando hagamos click sobre el btn clear completead borrara todos los todos completados
  clearCompleted.addEventListener("click", (e) => {
    // Obtén todos los elementos con checkbox marcado
    const completedTodos = document.querySelectorAll(".todo-checkbox:checked");

    // Elimina cada elemento marcado
    completedTodos.forEach((checkbox) => {
      const todoElement = checkbox.closest(".todo");
      if (todoElement) {
        todoElement.remove();
      }
    });

    // Actualiza la cuenta de elementos
  });
  itemsCount();
}

//Funcion remover todo
function deleteTodo(e) {
  if (e.target && e.target.matches(".delete-todo")) {
    // Obtén el elemento padre (.todo) del botón eliminado
    const todoElement = e.target.closest(".todo");

    if (todoElement) {
      // Elimina el elemento padre (.todo) si se encontró
      todoElement.remove();
      itemsCount();
    }
  }
}

//funcion contadora
function itemsCount() {
  const totalCheckboxes = document.querySelectorAll(".todo-checkbox").length;
  const checkedBoxsLenght = document.querySelectorAll(
    ".todo-checkbox:checked"
  ).length;
  const uncheckedCheckboxes = totalCheckboxes - checkedBoxsLenght;

  const span = document.querySelector(".todo-actions__spn--p");
  span.innerHTML = uncheckedCheckboxes;
}

//funcion principal que es exportada hacia main
function todoAdd() {
  //TODO agregar para despues el todo-actions para agregar la feature de saber cuantos

  // Funcion para marcar los checked
  // function checked

  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputTodo.value !== "") {
      todoMaker();
    }
  });

  todosContainer.addEventListener("click", deleteTodo);
}

export { todoAdd };
