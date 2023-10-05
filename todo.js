import img from "./images/icon-cross.svg";
//?el todo
//1-t la opcion de ir agregando los todos y la parte para eliminar con la tachita
//2-t el check para saber cuando una tarea fue finalizada (y tachar y cambiarle el color al todo)
//3-t una parte para mostrar los items restantes(no terminados)
//4-t un botton para borrar los todos completados
//5-t una seccion que muestre todos los elementos, los activos y los completados
//*6-t un drag and drop para reordenar la lista
//!7-t permitir que las tareas se guarden en el localstorage
// Obtener elementos del DOM una sola vez
const formInput = document.querySelector(".form");
const todosContainer = document.querySelector(".todos");
const inputTodo = document.querySelector(".form__input");
//4-t boton clear completed
const clearCompleted = document.querySelector("#clear-completed");
const spanP = document.querySelector(".todo-actions__spn--p");
//5-t btn for the sect
const btnAll = document.querySelector("#all");
const btnActive = document.querySelector("#active");
const btnCompleted = document.querySelector("#completed");

//1-t Función para crear un nuevo todo
function createTodoElement(text) {
  const taskElemMarkup = `
    <div class="todo">
      <div class="todo-wrapper">
        <input
          class="todo-checkbox"
          type="checkbox"
          name="todo-check"
          id="checkbox"
        />
        <p class="todo__p">${text}</p>
      </div>
      <img
        src="${img}"
        alt="delete a todo"
        class="delete-todo"
      />
    </div>
  `;

  const taskEl = document.createElement("div");
  taskEl.innerHTML = taskElemMarkup;
  return taskEl;
}

//1-t Función para agregar un nuevo todo a todoContainer
function addTodo() {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputTodo.value.trim();
    if (todoText !== "") {
      const taskEl = createTodoElement(todoText);
      todosContainer.appendChild(taskEl);
      inputTodo.value = "";
      toggleTodoCompleted(taskEl); // Agregar evento para tachar elementos
      updateItemCount();
    }
  });
}

//1-t Función para eliminar un todo
function deleteTodoElement(todoElement) {
  todoElement.remove();
  updateItemCount();
}

//1-t Event listener para eliminar un todo individualmente
todosContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-todo")) {
    const todoElement = e.target.closest(".todo");
    if (todoElement) {
      deleteTodoElement(todoElement);
    }
  }
});

//2-t Función para tachar los elementos terminados
function toggleTodoCompleted(todoElement) {
  const checkbox = todoElement.querySelector(".todo-checkbox");
  const todoP = todoElement.querySelector(".todo__p");

  checkbox.addEventListener("change", () => {
    todoP.classList.toggle("checked-active", checkbox.checked);
    updateItemCount();
  });
}

//3-t Función para contar y mostrar elementos pendientes
function updateItemCount() {
  const totalCheckboxes = document.querySelectorAll(".todo-checkbox").length;
  const checkedBoxsLenght = document.querySelectorAll(
    ".todo-checkbox:checked"
  ).length;
  const uncheckedCheckboxes = totalCheckboxes - checkedBoxsLenght;

  spanP.textContent = uncheckedCheckboxes;
}

//tachar los elementos terminados

//4-t Event listener para borrar todos los completados
clearCompleted.addEventListener("click", () => {
  const completedTodos = document.querySelectorAll(".todo-checkbox:checked");
  completedTodos.forEach((checkbox) => {
    const todoElement = checkbox.closest(".todo");
    if (todoElement) {
      deleteTodoElement(todoElement);
    }
  });
});

// 5-t Hidde the completed todos for only show the active ones
function hiddeElementsCompleted() {
  const todoCheckbox = document.querySelectorAll("#checkbox");

  todoCheckbox.forEach((checkbox) => {
    const todo = checkbox.closest(".todo");
    if (checkbox.checked) {
      todo.classList.add("active-sect");
    } else {
      todo.classList.remove("active-sect");
    }
  });
}

//5-t hidde the actives to only show the completed ones
function hiddeElementsActive() {
  const todoCheckbox = document.querySelectorAll("#checkbox");

  todoCheckbox.forEach((checkbox) => {
    const todo = checkbox.closest(".todo");
    if (!checkbox.checked) {
      todo.classList.add("active-sect");
    } else {
      todo.classList.remove("active-sect");
    }
  });
}

//5-t remove the class active-sect to show every todo active and completed
function removeHidden() {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    todo.classList.remove("active-sect");
  });
}

// 5-t
btnAll.addEventListener("click", removeHidden);
btnActive.addEventListener("click", hiddeElementsCompleted);
btnCompleted.addEventListener("click", hiddeElementsActive);

// Inicializar la aplicación
function initializeApp() {
  addTodo();
  updateItemCount();
}

export { initializeApp };
