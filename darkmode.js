//traer el btn que cambiara a dark o light mode
//agregarle un event listener al btn del tipo click
//cuando el usuario haga click toggle la classlist al body

function switchTheme() {
  const switchBtn = document.querySelector(".switch-theme");
  switchBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
      switchBtn.src = "./images/icon-sun.svg";
    } else {
      switchBtn.src = "./images/icon-moon.svg";
    }
  });
}

export { switchTheme };
