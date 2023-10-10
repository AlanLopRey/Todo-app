//6-t Drag and drop list
// Function to enable drag and drop functionality

import Sortable from "sortablejs";

function dragDrop() {
  // Get all elements with class "todo"
  const todos = document.querySelectorAll(".todo");

  // Get the container element with class "todos"
  const todoContainer = document.querySelector(".todos");

  new Sortable(todoContainer, {
    animation: 150,
    ghostClass: "dragging",
    dragClass: "dragging",
    delay: 150,

    group: "order",
    store: {
      //guardar el orden en un array
      set: (sortable) => {
        //toArray funcion de la libreria
        const order = sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join(" ")) ||
          [];
      },
      get: (sortable) => {
        const order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split(" ") : [];
      },
    },
  });
  // // Add event listeners to each "todo" element for drag and drop
  // todos.forEach((todo) => {
  //   // When dragging starts, add a "dragging" class to the element
  //   todo.addEventListener("dragstart", () => {
  //     todo.classList.add("dragging");
  //   });

  //   // When dragging ends, remove the "dragging" class from the element
  //   todo.addEventListener("dragend", () => {
  //     todo.classList.remove("dragging");
  //   });
  // });

  // // Add a dragover event listener to the "todos" container
  // todoContainer.addEventListener("dragover", (e) => {
  //   // Prevent the default behavior to allow dropping elements
  //   e.preventDefault();

  //   // Get the "todos" container again
  //   const todoContainer = document.querySelector(".todos");

  //   // Get the element below the current mouse position
  //   const afterElement = getDragAfterElement(todoContainer, e.clientY);

  //   // Get the element being dragged
  //   const draggable = document.querySelector(".dragging");

  //   // If there's no element below, append the dragged element to the end
  //   if (afterElement == null) {
  //     todoContainer.appendChild(draggable);
  //   } else {
  //     // Otherwise, insert the dragged element before the element below
  //     todoContainer.insertBefore(draggable, afterElement);
  //   }
  // });

  // // Function to find the element below the current mouse position
  // function getDragAfterElement(container, y) {
  //   // Get all draggable elements inside the container (excluding the one being dragged)
  //   const draggableElements = [
  //     ...container.querySelectorAll(".todo:not(.dragging)"),
  //   ];

  //   // Find the closest element to the current mouse position
  //   return draggableElements.reduce(
  //     (closest, child) => {
  //       const box = child.getBoundingClientRect();
  //       const offset = y - box.top - box.height / 2;

  //       // If the element is closer to the mouse position, update the closest element
  //       if (offset < 0 && offset > closest.offset) {
  //         return { offset: offset, element: child };
  //       } else {
  //         return closest;
  //       }
  //     },
  //     { offset: Number.NEGATIVE_INFINITY }
  //   ).element;
  // }
}

// Export the dragDrop function for use in other parts of the code
export { dragDrop };
