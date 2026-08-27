# Mai Vargas — Landing page

Sitio institucional de **Maira (Mai) Vargas**, cosmetóloga y masoterapéuta.
Es una landing page estática: no tiene base de datos ni servidor propio.

## Estructura del proyecto

```
Pagina_maira/
├── Frontend/            → el sitio web (es lo único que se publica)
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   └── assets/
│       ├── images/      → fotos optimizadas para web
│       └── logo/        → logos de marca y favicons
├── Backend/             → reservado para el futuro (ver Backend/README.md)
├── docs/                → documentación del proyecto
├── imagenes/            → banco de fotos originales sin procesar (NO se sube al repo)
├── netlify.toml         → le indica a Netlify que publique la carpeta Frontend/
└── README.md
```

## Ver el sitio en la computadora

Desde la raíz del proyecto:

```bash
npx serve Frontend
```

Después abrir http://localhost:3000 en el navegador.

## Publicar cambios

El sitio está conectado a Netlify. Cada `git push` a la rama `main`
dispara un deploy automático.

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

## Dónde se editan las cosas más comunes

| Qué querés cambiar | Archivo |
|---|---|
| Textos, secciones, links de redes | `Frontend/index.html` |
| Colores, tipografías, espaciados | `Frontend/css/style.css` (variables al inicio) |
| Número de WhatsApp y email | `Frontend/js/script.js` (bloque `CONTACTO`) |
| Fotos del sitio | `Frontend/assets/images/` |

Ver `docs/` para más detalle.
