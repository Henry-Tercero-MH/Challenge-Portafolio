// JavaScript
function toggleDarkMode() {
  const body = document.body;
  const modeIcon = document.getElementById("mode-icon");
  if (body.classList.contains("dark-mode")) {
    // Modo oscuro activado
    body.classList.remove("dark-mode");
    modeIcon.src = "assets/Light On_1.ico"; // Cambia la imagen cuando se desactiva el modo oscuro
  } else {
    // Modo oscuro desactivado
    body.classList.add("dark-mode");
    modeIcon.src = "assets/Light Off.ico"; // Cambia la imagen cuando se activa el modo oscuro
  }
  modeIcon.classList.add("blinking"); // Agregar clase de parpadeo
  setTimeout(() => {
    modeIcon.classList.remove("blinking"); // Quitar clase de parpadeo después de un tiempo
  }, 500); // Ajusta el tiempo según tus preferencias
}

// Función para validar el formulario
function validarFormulario() {
  const nombre = document.forms["form"]["nombre"].value;
  const email = document.forms["form"]["email"].value;
  const asunto = document.forms["form"]["asunto"].value;
  const mensaje = document.forms["form"]["mensaje"].value;

  // Validar que los campos no estén vacíos
  if (nombre.trim() === "") {
    mostrarError("nombre", "Por favor, ingresa tu nombre");
    return false;
  }
  if (email.trim() === "") {
    mostrarError("email", "Por favor, ingresa tu correo electrónico");
    return false;
  }
  if (asunto.trim() === "") {
    mostrarError("asunto", "Por favor, ingresa el asunto del mensaje");
    return false;
  }
  if (mensaje.trim() === "") {
    mostrarError("mensaje", "Por favor, ingresa el mensaje");
    return false;
  }

  return true;
}

// Función para mostrar mensajes de error
function mostrarError(campo, mensaje) {
  const elementoCampo = document.querySelector(
    `.formcontato__input[name="${campo}"]`
  );
  const mensajeError = document.createElement("span");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add("formcontato__error-message");

  const contenedorCampo = elementoCampo.parentElement;
  contenedorCampo.appendChild(mensajeError);

  // Agregar clase 'invalid' para resaltar el campo con error
  elementoCampo.classList.add("invalid");

  // Limpiar el mensaje de error después de 3 segundos
  setTimeout(function () {
    mensajeError.remove();
    elementoCampo.classList.remove("invalid");
  }, 3000);
}

// Función para enviar el formulario
function enviarFormulario() {
  // Obtiene los datos del formulario
  const formulario = document.forms["form"];
  const nombre = formulario["nombre"].value;
  const email = formulario["email"].value;
  const asunto = formulario["asunto"].value;
  const mensaje = formulario["mensaje"].value;

  // Envía el correo electrónico utilizando EmailJS
  emailjs
    .send("service_nvnse7p", "template_ypd4fyo", {
      de_nombre: nombre,
      to_nombre: email,
      mensaje: mensaje,
      responder_to: email, // Enviar la respuesta al correo electrónico del remitente
    })
    .then(function (response) {
      console.log("Correo enviado correctamente:", response);
      alert("¡El formulario se ha enviado correctamente!");
      formulario.reset(); // Reinicia el formulario después del envío exitoso
    })
    .catch(function (error) {
      console.error("Error al enviar el correo:", error);
      alert("¡Hubo un error al enviar el formulario!");
    });

  return false; // Evita que el formulario se envíe automáticamente
}

// Obtener el formulario
const formulario = document.forms["form"];

// Agregar evento de envío al formulario
formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Validar el formulario antes de enviarlo
  if (validarFormulario()) {
    // Inicializar EmailJS con tu usuario y llave API
    emailjs.init("Z1YVXyVzY1j6pRZdIrSco"); // Reemplaza 'YOUR_USER_ID' con tu usuario de EmailJS

    // Enviar el formulario si pasa todas las validaciones
    enviarFormulario();
  }
});
