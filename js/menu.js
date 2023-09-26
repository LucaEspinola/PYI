const abrirMenu = document.getElementById("abrir");
const cerrarMenu = document.getElementById("cerrar");
const menu = document.getElementById("nav");

abrirMenu.addEventListener("click", () => {
    menu.classList.add("active");
});

cerrarMenu.addEventListener("click", () => {
    menu.classList.remove("active");
});

const links = document.querySelectorAll(".navbar__list a");

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});