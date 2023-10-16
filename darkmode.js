import icon_sun from "./images/icon-sun.svg";
import icon_moon from "./images/icon-moon.svg";
//traer el btn que cambiara a dark o light mode
//agregarle un event listener al btn del tipo click
//cuando el usuario haga click toggle la classlist al body

function switchTheme() {
  const themePreference = localStorage.getItem("theme");
  const switchBtn = document.querySelector(".switch-theme");

  if (themePreference === "darkmode") {
    document.body.classList.add("darkmode");
  }

  switchBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
      switchBtn.src = icon_sun;
      localStorage.setItem("theme", "darkmode");
    } else {
      switchBtn.src = icon_moon;
      localStorage.setItem("theme", "lightmode");
    }
  });
}

export { switchTheme };
