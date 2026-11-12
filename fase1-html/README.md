# Sonora

Aplicación web para escuchar música hecha con **HTML + Tailwind CSS v4** que sigue el sistema de diseño Sonora. La reproducción es simulada: no hay audio, solo una cola de canciones y un temporizador.

Autora: Rosa De Jesus Collazo Mendoza

## Qué incluye

| Fase | Pantalla | Archivo |
|---|---|---|
| Obligatoria | Inicio | `index.html` |
| Obligatoria | Playlist (también muestra álbumes) | `playlist.html?id=…` |
| Obligatoria | Reproductor | `reproductor.html` |
| Extra | Buscar | `buscar.html` |
| Extra | Tu biblioteca (guardadas y me gusta) | `biblioteca.html` |
| Extra | Tema claro | botón en la barra lateral o en la cabecera móvil |
| Extra | Versión móvil de 390 px | navegación inferior y minirreproductor |

Las pantallas se enlazan entre sí: la barra lateral (o la barra inferior en móvil) lleva a Inicio, Buscar y Tu biblioteca; las tarjetas abren la playlist; la barra del reproductor abre la pantalla Reproductor. La canción, el progreso, la cola, el volumen, los “me gusta” y el tema se guardan en `localStorage`, así que la música sigue “sonando” al cambiar de página.

## Cómo ejecutarlo

**Opción rápida (sin instalar nada):** abre `index.html` en el navegador con doble clic. El CSS ya está compilado en `dist/app.css` y las fuentes están en `assets/fonts`, así que funciona sin internet.

**Para editar los estilos** (necesitas Node.js 18 o más reciente):

```bash
npm install
npm run dev     # recompila dist/app.css cada vez que guardas
npm run build   # versión final minificada
```

Opcionalmente puedes servirlo con la extensión Live Server de VS Code o con `npx serve .`.

## Estructura

```
sonora/
├── index.html, playlist.html, reproductor.html, buscar.html, biblioteca.html
├── src/app.css            ← tokens del sistema + componentes snr- (fuente de Tailwind)
├── dist/app.css           ← CSS compilado (lo que cargan las páginas)
├── js/
│   ├── icons.js           ← los iconos de assets/icons en línea (heredan el color)
│   ├── data.js            ← 10 canciones, 4 playlists y 5 álbumes inventados
│   ├── player.js          ← estado y reproducción simulada
│   ├── ui.js              ← componentes: MediaCard, SongRow, Chip, Slider, barra lateral, barra del reproductor
│   └── paginas/           ← un script por pantalla
├── assets/icons/          ← los 10 iconos oficiales del sistema (24 px, currentColor)
├── assets/logos/          ← marca oficial de cinco barras (ámbar para oscuro, #a65500 para claro)
├── assets/fonts/          ← Manrope y JetBrains Mono (licencia SIL OFL)
├── capturas/              ← capturas de cada pantalla en tema oscuro y claro, escritorio y móvil
(las decisiones de diseño están en ../DECISIONES.md)
```

## Sistema de diseño

- **Tokens**: `src/app.css` copia los tokens de `resources/css/app.css` del sistema (colores para tema oscuro y claro, fuentes, radios y sombra) y agrega la escala tipográfica (`text-display`, `text-title`, `text-heading`, `text-body`, `text-body-sm`, `text-caption`, `text-mono`, `text-mono-sm`). En el HTML solo se usan clases semánticas (`bg-surface-raised`, `text-ink-muted`…), nunca hexadecimales.
- **Espaciado**: la escala por defecto de Tailwind (`p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8`), que coincide con la de Sonora.
- **Iconos y marca**: los del paquete oficial `sonora-sistema-de-diseno` (`iconos/` y `logos/`), sin agregar iconos propios.
- **Componentes**: las recetas de clases están como utilidades `snr-` (`snr-btn-primary`, `snr-btn-secondary`, `snr-btn-ghost`, `snr-chip`, `snr-card`, `snr-row`, `snr-search`, `snr-track`, `snr-fill`, `snr-play`, `snr-icon-btn`).

## Accesibilidad

- Anillo de enfoque de 3 px en `focus` con 2 px de separación en todos los controles.
- Enlace “Saltar al contenido”, regiones con nombre (`nav`, `main`, `Reproductor`) y `aria-current` en la navegación y en la canción que suena.
- Los botones de solo icono tienen `aria-label`; los alternables (me gusta, aleatorio, guardar, chips) usan `aria-pressed`.
- Progreso y volumen son `role="slider"`: se manejan con flechas, Inicio y Fin, además de clic y arrastre.
- El cambio de canción se anuncia a lectores de pantalla (`aria-live`).
- Se respeta `prefers-reduced-motion`.
- Revisado con axe-core en las 5 pantallas y ambos temas: 0 problemas.

## Datos

Todas las canciones, artistas, álbumes y playlists son inventados. Las portadas son marcadores `surface-high` con barras de ecualizador, igual que `snr-card__art` en `componentes.css` del sistema.
