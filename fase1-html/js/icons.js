// Iconos oficiales de Sonora (assets/icons, 24 px, currentColor).
// Se insertan en línea para que tomen el color del texto: ink, ink-muted o accent.
// Son scripts clásicos (sin módulos) para que el sitio abra con doble clic, sin servidor.
const iconos = {
  "heart": "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z\"/>",
  "home": "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 11l8-7 8 7v9h-5v-6H9v6H4z\"/>",
  "library": "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 5v14M10 5v14M15 6l4 13\"/>",
  "pause": "<rect fill=\"currentColor\" x=\"6\" y=\"5\" width=\"4\" height=\"14\" rx=\"1\"/><rect fill=\"currentColor\" x=\"14\" y=\"5\" width=\"4\" height=\"14\" rx=\"1\"/>",
  "play": "<path fill=\"currentColor\" d=\"M8 5v14l11-7z\"/>",
  "search": "<circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"11\" cy=\"11\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 16l4 4\"/>",
  "shuffle": "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 7h4l8 10h4M4 17h4l3-4M13 11l3-4h4M18 5l2 2-2 2M18 15l2 2-2 2\"/>",
  "skip-next": "<path fill=\"currentColor\" d=\"M6 5l9 7-9 7z\"/><rect fill=\"currentColor\" x=\"17\" y=\"5\" width=\"2\" height=\"14\" rx=\"1\"/>",
  "skip-prev": "<path fill=\"currentColor\" d=\"M18 5l-9 7 9 7z\"/><rect fill=\"currentColor\" x=\"5\" y=\"5\" width=\"2\" height=\"14\" rx=\"1\"/>",
  "volume": "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 10v4h4l5 4V6L8 10z\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11\"/>",
};

function icono(nombre, clase = "size-6") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${clase}" aria-hidden="true" focusable="false">${iconos[nombre]}</svg>`;
}
