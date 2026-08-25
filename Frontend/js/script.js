// =====================
// MENÚ HAMBURGUESA
// =====================
const menuBtn = document.getElementById("menu-btn");
const menuClose = document.getElementById("menu-close");
const menuMobile = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay");

function abrirMenu() {
  menuMobile.classList.add("abierto");
  overlay.classList.add("activo");
}

function cerrarMenu() {
  menuMobile.classList.remove("abierto");
  overlay.classList.remove("activo");
}

menuBtn.addEventListener("click", abrirMenu);
menuClose.addEventListener("click", cerrarMenu);
overlay.addEventListener("click", cerrarMenu);

// Cerrar al tocar un link del menú mobile
document.querySelectorAll("#menu-mobile a").forEach((link) => {
  link.addEventListener("click", cerrarMenu);
});

// =====================
// ANIMACIONES AL SCROLL
// =====================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".animar").forEach((el) => observer.observe(el));

// =====================
// WHATSAPP
// =====================
function abrirWhatsApp() {
  const numero = "5491162699416";
  const texto = encodeURIComponent(
    "Hola Maira! Quiero consultar por un turno.",
  );
  window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
}

document
  .getElementById("btn-whatsapp")
  .addEventListener("click", abrirWhatsApp);

// =====================
// NEWSLETTER
// =====================
function suscribir() {
  const email = document.getElementById("email-newsletter").value.trim();
  if (!email || !email.includes("@")) {
    alert("Por favor ingresá un email válido.");
    return;
  }
  alert(`¡Gracias! Te anotamos con el email: ${email}`);
}
