function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const modeIcon = document.getElementById("mode-icon");
  if (document.body.classList.contains("dark-mode")) {
    modeIcon.src = "assets/Light Off.ico"; // Cambia la imagen cuando se activa el modo oscuro
  } else {
    modeIcon.src = "assets/Light On_1.ico"; // Cambia la imagen cuando se desactiva el modo oscuro
  }
}
