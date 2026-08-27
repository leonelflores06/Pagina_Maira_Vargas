# Backend

**Todavía no hay backend.** Esta carpeta está reservada.

El sitio actual es una landing page 100% estática: todo lo que se publica
vive en `Frontend/` y Netlify lo sirve como archivos sueltos. Los contactos
salen directo a WhatsApp y a Gmail, sin pasar por un servidor propio.

## Cuándo va a hacer falta

Esta carpeta se empieza a usar el día que el sitio necesite guardar o
procesar datos del lado del servidor. Los casos más probables:

- **Reserva de turnos online** — agenda con disponibilidad real, que es
  el motivo por el que hoy no existe un botón de "reservar turno".
- **Tienda de productos** — catálogo con stock y pagos.
- **Formulario de contacto propio** — en lugar de abrir WhatsApp/Gmail.

## Qué NO va acá

- Imágenes, CSS, JavaScript del navegador, HTML → todo eso va en `Frontend/`.
- Fotos originales sin procesar → van en `imagenes/` (fuera del repo).
