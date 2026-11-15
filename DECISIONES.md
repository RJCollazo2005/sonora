# Decisiones de diseño y código

## Fase 1 (HTML + Tailwind)

### Componentes que reutilizamos

| Componente | Dónde se usa | Cómo |
|---|---|---|
| `MediaCard` (`snr-card` + portada) | Inicio, Buscar, Tu biblioteca | Una sola función en `js/ui.js` para playlists y álbumes |
| `SongRow` (`snr-row`) | Playlist, cola del Reproductor, Buscar, Me gusta | Misma fila con número, título, artista y duración; `aria-current` marca la que suena |
| `Chip` (`snr-chip`) | Filtros de Inicio y Tu biblioteca | Un chip activo a la vez con `aria-pressed` |
| `Slider` (`snr-track` + `snr-fill`) | Progreso y volumen en la barra y en el Reproductor | Un solo comportamiento de teclado y puntero para los cuatro |
| Barra lateral, navegación móvil y barra del reproductor | Todas las pantallas | Se montan con `montarShell()` para no copiar el mismo HTML cinco veces |
| Botones (`snr-btn-primary`, `snr-btn-secondary`, `snr-btn-ghost`, `snr-icon-btn`, `snr-play`) | Todas | Recetas del sistema convertidas en utilidades de Tailwind |
| Pantalla Playlist | Playlists y álbumes | La misma página según el `id` de la URL |

### Decisiones tomadas

1. **Un solo botón ámbar por vista.** El botón de reproducir de la barra inferior es el principal de la app. Por eso en la pantalla Playlist “Reproducir” es un botón secundario. En la pantalla Reproductor la barra inferior se oculta y el botón grande ocupa su lugar.
2. **Número de la canción actual en tema claro.** En oscuro va en `accent`, como en el sistema. En claro, `accent` sobre `surface-high` no llega a 4.5:1 en texto pequeño, así que usa `ink` en negritas.
3. **Utilidades `@utility` en lugar de `@layer components`.** Tailwind v4 no permite `@apply` de clases propias definidas en `@layer`, y con `@utility` además se pueden combinar con variantes (`md:`, `hover:`).
4. **Fuentes dentro del proyecto.** El sistema las carga desde Google Fonts; nosotros incluimos los mismos archivos (Manrope y JetBrains Mono) para que funcione sin internet.
5. **Scripts clásicos, sin módulos.** Así el sitio abre con doble clic. Los módulos ES no cargan desde `file://`.
6. **Iconos oficiales en línea.** Usamos los 10 SVG de `iconos/` del sistema y los insertamos en el HTML, como pide su LEEME, para que hereden `ink`, `ink-muted` o `accent` con `currentColor`.
7. **Sin iconos inventados.** El conjunto oficial no trae sol, luna ni flecha de regreso, así que “Usar tema claro” y “Volver” son botones fantasma con texto.
8. **Estado en `localStorage`.** Mantiene la canción, el progreso y el tema entre páginas, que es lo más parecido a una SPA sin usar un framework.

### Qué cambiaríamos

- **Audio real:** el objeto `reproductor` ya separa el estado de la vista; bastaría con conectar `reproducir()`, `pausar()` y `buscarEn()` a un elemento `<audio>`.
- **Repintado más fino:** hoy algunas listas se vuelven a generar completas al cambiar de canción. Con más datos convendría actualizar solo la fila que cambia.
- **Arrastrar para reordenar la cola** y una vista de artista.

## Fase 2 (Laravel)

### Componentes que reutilizamos

- Cada función de `ui.js` de la fase 1 pasó a un componente Blade: `x-media-card`, `x-song-row`, `x-chip`, `x-button`, `x-portada`, `x-slider`, `x-nav` y `x-player-bar`.
- `layouts/app.blade.php` reúne la estructura común (como en el ejemplo del sistema de diseño), y las cinco vistas la extienden con `@extends` y llenan `@section('contenido')`.
- `playlist.blade.php` sirve para playlists y álbumes; solo cambia el controlador que la llama.
- Los estilos (`snr-`) y el reproductor simulado son los mismos de la fase 1, ahora como módulos de Vite.

### Decisiones tomadas

1. **Álbum como tabla propia** y no como texto en cada canción. Así una canción pertenece a un álbum y la pantalla del álbum sale de una relación.
2. **Tabla `playlist_track` con `posicion`** para guardar el orden de cada playlist.
3. **Rutas con `slug`** (`/playlists/manana-tranquila`) en lugar del id, para tener direcciones legibles.
4. **El servidor pinta lo que vive en la base de datos** (Inicio, Playlist, Buscar). **El navegador pinta lo que vive en `localStorage`**: la canción actual, la cola, lo guardado y los "me gusta". Por eso Reproductor y Tu biblioteca se arman con JavaScript a partir del catálogo que manda Laravel.
5. **Buscar ignora mayúsculas y acentos:** "cafe" encuentra "Café a las seis". Con pocos datos se filtra en PHP.
6. **Los iconos se leen de los SVG oficiales** (`resources/icons`), en lugar de copiar su código dentro del componente.
7. **Página 404 con el estilo de Sonora.**

### Qué cambiaríamos

- Guardar "me gusta" y "tu biblioteca" en la base de datos con usuarios e inicio de sesión, en lugar de en el navegador.
- Con muchas canciones, buscar con una columna normalizada o búsqueda de texto completo, y paginar los resultados.
- Subir portadas reales: la columna `portada` ya existe en `tracks`.
- Conectar el reproductor a un `<audio>` real.
