import img from "./images/icon-cross.svg";
import { dragDrop } from "./drag_drop.js";
//?el todo
//1-t la opcion de ir agregando los todos y la parte para eliminar con la tachita
//2-t el check para saber cuando una tarea fue finalizada (y tachar y cambiarle el color al todo)
//3-t una parte para mostrar los items restantes(no terminados)
//4-t un botton para borrar los todos completados
//5-t una seccion que muestre todos los elementos, los activos y los completados
//6-t un drag and drop para reordenar la lista
//6-t.1 the drag list its save in the localstorage
//!7-t permitir que las tareas se guarden en el localstorage ✔✔✔
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
//! 7-t local storage feature
let tasksStorage = JSON.parse(localStorage.getItem("todos")) || [];
let order = localStorage.getItem("order") || [];

//1-t Función para crear un nuevo todo
function createTodoElement(text) {
  const taskElemMarkup = `
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
  `;

  const taskEl = document.createElement("div");
  taskEl.classList.add("todo");

  // taskEl.setAttribute("draggable", "true");
  taskEl.innerHTML = taskElemMarkup;
  return taskEl;
}

//1-t Función para agregar un nuevo todo a todoContainer
// ...

function addTodo() {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputTodo.value.trim();
    if (todoText !== "") {
      const taskEl = createTodoElement(todoText);
      todosContainer.appendChild(taskEl);
      //!7-t
      const todoStorage = {
        id: new Date().getTime(),
        todoContent: todoText,
        checked: false,
      };
      taskEl.setAttribute("data-id", todoStorage.id);
      tasksStorage.push(todoStorage);
      inputTodo.value = "";
      toggleTodoCompleted(taskEl);
      updateItemCount();
      //!7-t
      saveTasksToLocalStorage(); // Llamar a la función para guardar en el local storage
    }
  });
}

//!7-t local storage function
function saveTasksToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(tasksStorage));
  localStorage.setItem("order", JSON.stringify(order));
}

// ...

//1-t Función para eliminar un todo
//1-t Función para eliminar un todo
function deleteTodoElement(todoElement) {
  const todoId = todoElement.getAttribute("data-id"); // Obtener el ID del todo
  const todoStorageIndex = tasksStorage.findIndex(
    (todo) => todo.id === parseInt(todoId)
  );

  if (todoStorageIndex !== -1) {
    tasksStorage.splice(todoStorageIndex, 1); // Eliminar el todo del arreglo
    localStorage.removeItem(order);
    saveTasksToLocalStorage(); // Actualizar el local storage
  }

  todoElement.remove();

  updateItemCount();
}

// ...

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
//2-t Función para tachar los elementos terminados
function toggleTodoCompleted(todoElement) {
  const checkbox = todoElement.querySelector(".todo-checkbox");
  const todoP = todoElement.querySelector(".todo__p");

  checkbox.addEventListener("change", () => {
    const todoId = todoElement.getAttribute("data-id"); // Obtener el ID del todo
    const todoStorageIndex = tasksStorage.findIndex(
      (todo) => todo.id === parseInt(todoId)
    );

    if (todoStorageIndex !== -1) {
      tasksStorage[todoStorageIndex].checked = checkbox.checked;
      saveTasksToLocalStorage(); // Actualizar el estado en el local storage
    }

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

// 5-t active state for the btn

function activeBtnState(e) {
  if (e.target === btnAll) {
    btnAll.classList.add("active-state");
    btnActive.classList.remove("active-state");
    btnCompleted.classList.remove("active-state");
  } else if (e.target === btnActive) {
    btnAll.classList.remove("active-state");
    btnActive.classList.add("active-state");
    btnCompleted.classList.remove("active-state");
  } else {
    btnAll.classList.remove("active-state");
    btnActive.classList.remove("active-state");
    btnCompleted.classList.add("active-state");
  }
}
// 5-t Hidde the completed todos for only show the active ones
function hiddeElementsCompleted(e) {
  const todoCheckbox = document.querySelectorAll("#checkbox");

  todoCheckbox.forEach((checkbox) => {
    const todo = checkbox.closest(".todo");
    if (checkbox.checked) {
      todo.classList.add("active-sect");
    } else {
      todo.classList.remove("active-sect");
    }
  });
  activeBtnState(e);
}

//5-t hidde the actives to only show the completed ones
function hiddeElementsActive(e) {
  const todoCheckbox = document.querySelectorAll("#checkbox");

  todoCheckbox.forEach((checkbox) => {
    const todo = checkbox.closest(".todo");
    if (!checkbox.checked) {
      todo.classList.add("active-sect");
    } else {
      todo.classList.remove("active-sect");
    }
  });
  activeBtnState(e);
}

//5-t remove the class active-sect to show every todo active and completed
function removeHidden(e) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    todo.classList.remove("active-sect");
  });
  activeBtnState(e);
}

// 5-t
btnAll.addEventListener("click", removeHidden);
btnActive.addEventListener("click", hiddeElementsCompleted);
btnCompleted.addEventListener("click", hiddeElementsActive);

// Inicializar la aplicación
// ...
// Inicializar la aplicación
function initializeApp() {
  // Limpia el contenido del container antes de agregar elementos
  todosContainer.innerHTML = "";

  // Crear los todos desde el local storage al cargar la página
  //!7-t local storage
  tasksStorage.forEach((task) => {
    const taskEl = createTodoElement(task.todoContent);
    taskEl.setAttribute("data-id", task.id);
    todosContainer.appendChild(taskEl);
    if (task.checked) {
      const checkbox = taskEl.querySelector(".todo-checkbox");
      const todoP = taskEl.querySelector(".todo__p");
      checkbox.checked = true;
      todoP.classList.add("checked-active");
    }
    toggleTodoCompleted(taskEl);
  });

  updateItemCount();
  //6-t
  dragDrop();
  addTodo();
}

//!7-t
// Ejecuta initializeApp solo una vez al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

export { initializeApp, createTodoElement, addTodo };
