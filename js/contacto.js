const form = document.getElementById("contact-form");
const numeroInput = document.getElementById("numero");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");
const numeroError = document.getElementById("numero-error");
const nombreError = document.getElementById("nombre-error");
const apellidoError = document.getElementById("apellido-error");
const emailError = document.getElementById("email-error");
const mensajeError = document.getElementById("mensaje-error");
const mensajeExito = document.getElementById("mensaje-exito");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    numeroError.textContent = "";
    nombreError.textContent = "";
    apellidoError.textContent = "";
    emailError.textContent = "";
    mensajeError.textContent = "";
    mensajeExito.textContent = "";

    const numero = parseInt(numeroInput.value);
    if (isNaN(numero) || numero <= 0) {
        numeroError.textContent = "Por favor, ingrese un número válido.";
        return;
    }

    if (nombreInput.value.trim() === "") {
        nombreError.textContent = "El nombre es obligatorio.";
        return;
    }

    if (apellidoInput.value.trim() === "") {
        apellidoError.textContent = "El apellido es obligatorio.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Por favor, ingrese un email válido.";
        return;
    }

    if (mensajeInput.value.trim() === "") {
        mensajeError.textContent = "El mensaje es obligatorio.";
        return;
    }

    mensajeExito.textContent = "¡El formulario se envió con éxito!";
});
