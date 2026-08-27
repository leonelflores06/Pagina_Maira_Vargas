# Guía de edición

Cosas que vas a querer cambiar seguido, y cómo hacerlo sin romper nada.

---

## 1. Cambiar el número de WhatsApp o el email

Están en un solo lugar: arriba de todo en `Frontend/js/script.js`.

```js
const CONTACTO = {
  whatsapp: "5491164088358",
  email: "maira.vargas.shop@gmail.com",
  ...
};
```

El WhatsApp va en **formato internacional y sin espacios ni símbolos**:
`54` (Argentina) + `9` (celular) + `11` (área) + el número.
Ejemplo: `11 6408-8358` se escribe `5491164088358`.

> El número y el email también aparecen escritos en el pie de página
> (`Frontend/index.html`, sección `<footer>`). Si cambiás uno, cambiá el otro.

---

## 2. Agregar el link de Facebook

En `Frontend/index.html`, buscar el comentario:

```html
<!-- FACEBOOK: reemplazar el "#" de abajo por la URL del perfil -->
```

Reemplazar el `href="#"` de esa etiqueta por la URL real. Nada más.

---

## 3. Cambiar los servicios de la lista

En `Frontend/index.html`, dentro de `<section id="servicios">`, cada
servicio es un bloque `<li class="servicio">`. Para agregar uno, copiar
un bloque entero y cambiarle el texto. El ícono es un `<svg>`: se puede
dejar el mismo sin problema.

---

## 4. Cambiar una foto

1. Poner la foto nueva en `Frontend/assets/images/`.
2. En `Frontend/index.html`, cambiar el `src` de la etiqueta `<img>`.

Conviene achicarlas antes de subirlas: **máximo 900px de ancho**, así el
sitio carga rápido en el celular. Las fotos originales sin achicar viven
en `imagenes/` y no se suben al repositorio.

---

## 5. Cambiar los colores

En `Frontend/css/style.css`, todo arriba, en el bloque `:root`. Están
todos los colores de la marca con nombre. Cambiando ahí se actualiza
el sitio entero.

El color base de la marca (sacado del logo) es `#9AB9BE`.

---

## 6. Ver los cambios antes de publicarlos

```bash
npx serve Frontend
```

Abrir http://localhost:3000. Se refresca recargando la página (F5).

---

## 7. Publicar

```bash
git add .
git commit -m "qué cambiaste"
git push origin main
```

Netlify publica solo, en 1–2 minutos.
