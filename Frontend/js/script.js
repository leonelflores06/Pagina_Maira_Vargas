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

/* ============ PREFERENCIAS DE MOVIMIENTO ============
   Si la persona pidió menos animaciones en su celular o computadora,
   respetamos esa decisión y dejamos todo quieto.                     */
const SIN_MOVIMIENTO = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// El parallax solo en pantallas grandes: en el celular suma peso y no aporta.
const PANTALLA_GRANDE = window.matchMedia("(min-width: 1025px)").matches;

/* ============ CABECERA, BARRA DE LECTURA Y PARALLAX ============ */
const cabecera = document.getElementById("cabecera");
const waFlotante = document.querySelector(".wa-flotante");
const progreso = document.getElementById("progreso");
const capasParallax = PANTALLA_GRANDE
  ? Array.from(document.querySelectorAll("[data-parallax]"))
  : [];

let pidiendoCuadro = false;

function alScrollear() {
  const y = window.scrollY;

  cabecera.classList.toggle("pegada", y > 20);
  waFlotante.classList.toggle("visible", y > 600);

  // Barra de progreso: de 0 a 1 según cuánto queda por leer
  if (progreso) {
    const alto =
      document.documentElement.scrollHeight - window.innerHeight;
    const avance = alto > 0 ? Math.min(y / alto, 1) : 0;
    progreso.style.transform = "scaleX(" + avance.toFixed(4) + ")";
  }

  // Las fotos se mueven un poquito menos que la página: da profundidad
  if (!SIN_MOVIMIENTO && capasParallax.length) {
    const alto = window.innerHeight;
    capasParallax.forEach((el) => {
      const caja = el.getBoundingClientRect();
      if (caja.bottom < -240 || caja.top > alto + 240) return;
      const factor = parseFloat(el.dataset.parallax) || 0.05;
      const centro = caja.top + caja.height / 2 - alto / 2;
      el.style.transform =
        "translate3d(0," + (-centro * factor).toFixed(1) + "px,0)";
    });
  }
}

function pedirCuadro() {
  if (pidiendoCuadro) return;
  pidiendoCuadro = true;
  requestAnimationFrame(() => {
    alScrollear();
    pidiendoCuadro = false;
  });
}

window.addEventListener("scroll", pedirCuadro, { passive: true });
window.addEventListener("resize", pedirCuadro, { passive: true });

/* ============ TÍTULOS QUE SE REVELAN PALABRA POR PALABRA ============
   Partimos el título en palabras y cada una sube desde abajo,
   una atrás de la otra. Los saltos de línea (<br>) se respetan.      */
function prepararTitulos() {
  if (SIN_MOVIMIENTO) return;

  document.querySelectorAll("[data-revelar]").forEach((titulo) => {
    const nodos = Array.from(titulo.childNodes);
    const armado = document.createDocumentFragment();
    let orden = 0;

    nodos.forEach((nodo) => {
      if (nodo.nodeType !== Node.TEXT_NODE) {
        armado.appendChild(nodo.cloneNode(true));
        return;
      }

      nodo.textContent.split(/\s+/).forEach((palabra) => {
        if (!palabra) return;
        const caja = document.createElement("span");
        caja.className = "pal";
        const adentro = document.createElement("i");
        adentro.textContent = palabra;
        adentro.style.transitionDelay = orden++ * 65 + "ms";
        caja.appendChild(adentro);
        armado.appendChild(caja);
        armado.appendChild(document.createTextNode(" "));
      });
    });

    titulo.innerHTML = "";
    titulo.appendChild(armado);
    titulo.classList.add("listo-revelar");
  });
}

/* ============ NÚMEROS QUE CUENTAN SOLOS ============ */
function contarHasta(el) {
  const destino = parseInt(el.dataset.contador, 10);
  if (isNaN(destino)) return;

  const prefijo = el.dataset.prefijo || "";
  if (SIN_MOVIMIENTO) {
    el.textContent = prefijo + destino;
    return;
  }

  const duracion = 1600;
  const arranque = performance.now();

  function paso(ahora) {
    const t = Math.min((ahora - arranque) / duracion, 1);
    const suave = 1 - Math.pow(1 - t, 3); // frena al final
    el.textContent = prefijo + Math.round(destino * suave);
    if (t < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

/* ============ APARICIONES AL SCROLL ============ */
/* Red de seguridad: si el navegador es viejo y no tiene IntersectionObserver,
   mostramos todo de una en vez de dejar la página en blanco. */
if (!("IntersectionObserver" in window)) {
  document
    .querySelectorAll(".animar, [data-revelar], [data-contador]")
    .forEach((el) => el.classList.add("visible", "revelado"));
}

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const el = entrada.target;

      el.classList.add("visible", "revelado");
      if (el.dataset.contador) contarHasta(el);

      observador.unobserve(el);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);

// Las tarjetas de servicio entran escalonadas, una detrás de otra.
document.querySelectorAll(".grilla-servicios .animar").forEach((el, i) => {
  el.style.setProperty("--retraso", i * 90 + "ms");
});

document
  .querySelectorAll(".animar, [data-revelar], [data-contador]")
  .forEach((el) => observador.observe(el));

/* ============ CARRUSEL DE PRODUCTOS ============
   Las fotos se pasan solas cada 5 segundos. Se puede tocar un punto
   para ir a una, o deslizar con el dedo. Se frena cuando no está a
   la vista o cuando la pestaña está en segundo plano.                */
function armarCarrusel(caja) {
  const fotos = Array.from(caja.querySelectorAll(".carrusel__foto"));
  const zonaPuntos = caja.querySelector(".carrusel__puntos");
  if (fotos.length < 2) return;

  /* Cuánto se queda cada foto antes de pasar a la siguiente.
     Está en milisegundos: 3500 = 3,5 segundos. Tocá solo este número.
     No conviene bajar de 2500 porque el fundido entre fotos dura 1,2 s. */
  const ESPERA = 3500;
  let actual = 0;
  let reloj = null;
  let aLaVista = true;

  const puntos = fotos.map((foto, i) => {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "carrusel__punto";
    punto.setAttribute("role", "tab");
    punto.setAttribute("aria-label", "Ver foto " + (i + 1));
    punto.setAttribute("aria-selected", i === 0 ? "true" : "false");
    punto.addEventListener("click", () => {
      mostrar(i);
      reiniciar();
    });
    zonaPuntos.appendChild(punto);
    return punto;
  });

  function mostrar(i) {
    actual = (i + fotos.length) % fotos.length;
    fotos.forEach((foto, n) => foto.classList.toggle("activa", n === actual));
    puntos.forEach((punto, n) =>
      punto.setAttribute("aria-selected", n === actual ? "true" : "false"),
    );
  }

  function arrancar() {
    if (reloj || !aLaVista || document.hidden) return;
    reloj = setInterval(() => mostrar(actual + 1), ESPERA);
  }

  function frenar() {
    clearInterval(reloj);
    reloj = null;
  }

  function reiniciar() {
    frenar();
    arrancar();
  }

  // No gastar batería si el carrusel no está en pantalla
  new IntersectionObserver(
    (entradas) => {
      aLaVista = entradas[0].isIntersecting;
      aLaVista ? arrancar() : frenar();
    },
    { threshold: 0.2 },
  ).observe(caja);

  document.addEventListener("visibilitychange", () =>
    document.hidden ? frenar() : arrancar(),
  );

  caja.addEventListener("mouseenter", frenar);
  caja.addEventListener("mouseleave", arrancar);

  // Deslizar con el dedo (celular)
  let xInicio = null;
  caja.addEventListener(
    "touchstart",
    (e) => {
      xInicio = e.touches[0].clientX;
      frenar();
    },
    { passive: true },
  );

  caja.addEventListener(
    "touchend",
    (e) => {
      if (xInicio === null) return;
      const desplazo = e.changedTouches[0].clientX - xInicio;
      if (Math.abs(desplazo) > 45) mostrar(actual + (desplazo < 0 ? 1 : -1));
      xInicio = null;
      arrancar();
    },
    { passive: true },
  );

  arrancar();
}

document.querySelectorAll("[data-carrusel]").forEach(armarCarrusel);

/* ============ MARCAR LA SECCIÓN EN LA QUE ESTÁS ============ */
const vigilanteSecciones = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const id = "#" + entrada.target.id;
      document
        .querySelectorAll('.nav-escritorio a[href^="#"], .panel-movil nav a[href^="#"]')
        .forEach((a) =>
          a.classList.toggle("activo", a.getAttribute("href") === id),
        );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);

document
  .querySelectorAll("main section[id]")
  .forEach((sec) => vigilanteSecciones.observe(sec));

/* ============ AÑO DEL PIE ============ */
document.getElementById("anio").textContent = new Date().getFullYear();

/* ============ ARRANQUE ============ */
cablearContacto();
prepararTitulos();
alScrollear();
