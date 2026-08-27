/* ============================================================
   MAI VARGAS — comportamiento del sitio
   ============================================================ */

/* ============ CONTACTO ============
   Único lugar donde se cambian el WhatsApp y el email.
   El WhatsApp va en formato internacional, sin espacios ni símbolos:
   54 (Argentina) + 9 (celular) + 11 (área) + número.
   Ej: 11 6408-8358  ->  5491164088358                          */
const CONTACTO = {
  whatsapp: "5491164088358",
  whatsappVisible: "+54 9 11 6408-8358",
  email: "maira.vargas.shop@gmail.com",
  asunto: "Consulta de turno",
  mensaje: "¡Hola Maira! Quiero consultar por un turno.",
};

/* ============ LINKS DE CONTACTO ============ */
function linkWhatsApp() {
  return (
    "https://wa.me/" +
    CONTACTO.whatsapp +
    "?text=" +
    encodeURIComponent(CONTACTO.mensaje)
  );
}

// Abre directamente el redactor de Gmail con el destinatario ya cargado.
// Si la persona no tiene sesión de Gmail, Google la manda a iniciar sesión
// y después le abre el mismo borrador.
function linkGmail() {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(CONTACTO.email) +
    "&su=" + encodeURIComponent(CONTACTO.asunto) +
    "&body=" + encodeURIComponent(CONTACTO.mensaje)
  );
}

// Completa todos los elementos marcados con data-wa / data-mail,
// así el número y el email viven en un solo lugar del código.
function cablearContacto() {
  const wa = linkWhatsApp();
  const mail = linkGmail();

  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", wa);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-mail]").forEach((el) => {
    el.setAttribute("href", mail);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-wa-texto]").forEach((el) => {
    el.textContent = CONTACTO.whatsappVisible;
  });

  document.querySelectorAll("[data-mail-texto]").forEach((el) => {
    el.textContent = CONTACTO.email;
  });
}

/* ============ MENÚ MÓVIL ============ */
const btnMenu = document.getElementById("btn-menu");
const btnCerrar = document.getElementById("btn-cerrar");
const panel = document.getElementById("panel-movil");
const velo = document.getElementById("velo");

function abrirMenu() {
  panel.classList.add("abierto");
  velo.classList.add("activo");
  btnMenu.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function cerrarMenu() {
  panel.classList.remove("abierto");
  velo.classList.remove("activo");
  btnMenu.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

btnMenu.addEventListener("click", () => {
  const abierto = panel.classList.contains("abierto");
  abierto ? cerrarMenu() : abrirMenu();
});

btnCerrar.addEventListener("click", cerrarMenu);
velo.addEventListener("click", cerrarMenu);

panel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", cerrarMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("abierto")) cerrarMenu();
});

/* ============ CABECERA AL SCROLLEAR ============ */
const cabecera = document.getElementById("cabecera");
const waFlotante = document.querySelector(".wa-flotante");

function alScrollear() {
  const y = window.scrollY;
  cabecera.classList.toggle("pegada", y > 20);
  waFlotante.classList.toggle("visible", y > 600);
}

window.addEventListener("scroll", alScrollear, { passive: true });

/* ============ ANIMACIONES AL APARECER ============ */
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

// Las tarjetas de servicio entran escalonadas, una detrás de otra.
document.querySelectorAll(".grilla-servicios .animar").forEach((el, i) => {
  el.style.transitionDelay = i * 80 + "ms";
});

document.querySelectorAll(".animar").forEach((el) => observador.observe(el));

/* ============ AÑO DEL PIE ============ */
document.getElementById("anio").textContent = new Date().getFullYear();

/* ============ ARRANQUE ============ */
cablearContacto();
alScrollear();
