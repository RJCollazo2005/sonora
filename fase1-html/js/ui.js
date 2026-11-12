// Componentes de Sonora. Cada función devuelve HTML con las clases snr- del sistema.
// En la fase 2 cada una se convierte en un componente Blade (x-media-card, x-song-row, x-chip…).

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Marcador de portada: superficie surface-high con barras de ecualizador (no hay imágenes reales)
function Portada(semilla, clase = "") {
  let h = 0;
  for (const ch of String(semilla)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const alturas = Array.from({ length: 5 }, (_, k) => 35 + ((h >>> (k * 5)) % 60));
  return `<div class="snr-cover ${clase}" aria-hidden="true">${alturas.map(a => `<span style="height:${a}%"></span>`).join("")}</div>`;
}

function Logo() {
  return `<a href="index.html" class="snr-focus inline-flex items-center gap-2 rounded-md text-heading text-ink">
    <svg viewBox="0 0 64 64" class="size-7 text-accent" aria-hidden="true" focusable="false"><g fill="currentColor"><rect x="4" y="32" width="8" height="28" rx="4"/><rect x="16" y="12" width="8" height="48" rx="4"/><rect x="28" y="24" width="8" height="36" rx="4"/><rect x="40" y="4" width="8" height="56" rx="4"/><rect x="52" y="36" width="8" height="24" rx="4"/></g></svg>
    <span>Sonora</span></a>`;
}

function MediaCard({ href, titulo, subtitulo, meta, semilla }) {
  return `<a href="${href}" class="snr-card group">
    ${Portada(semilla)}
    <p class="mt-4 truncate text-heading text-ink">${esc(titulo)}</p>
    <p class="truncate text-body-sm text-ink-muted">${esc(subtitulo)}</p>
    ${meta ? `<p class="mt-1 font-mono text-mono-sm text-ink-muted">${esc(meta)}</p>` : ""}
  </a>`;
}

function Chip(texto, presionado, datos = "") {
  return `<button type="button" class="snr-chip" aria-pressed="${presionado}" ${datos}>${esc(texto)}</button>`;
}

function SongRow(c, n, actual, datos = "") {
  return `<li><button type="button" class="snr-row" aria-current="${actual}" ${datos}
      aria-label="Reproducir ${esc(c.titulo)}, de ${esc(c.artista)}">
    <span class="font-mono text-mono-sm ${actual ? "font-bold text-ink dark:text-accent" : "text-ink-muted"}">${String(n).padStart(2, "0")}</span>
    <span class="min-w-0">
      <span class="block truncate text-body-sm font-bold text-ink">${esc(c.titulo)}</span>
      <span class="block truncate text-body-sm text-ink-muted">${esc(c.artista)}</span>
    </span>
    <span class="font-mono text-mono-sm text-ink-muted">${fmt(c.dur)}</span>
  </button></li>`;
}

// Barra deslizable accesible (progreso y volumen): flechas, Inicio/Fin, clic y arrastre
function Slider({ id, etiqueta, clase = "" }) {
  return `<div id="${id}" role="slider" tabindex="0" aria-label="${etiqueta}" aria-valuemin="0"
      class="snr-focus group flex cursor-pointer items-center rounded-pill py-2 ${clase}">
    <div class="snr-track"><div class="snr-fill" style="width:0%"></div></div>
  </div>`;
}

function conectarSlider(el, { max, valor, alCambiar, paso = 5, texto = v => v }) {
  const pintar = () => {
    const m = max(), v = valor();
    el.setAttribute("aria-valuemax", m);
    el.setAttribute("aria-valuenow", v);
    el.setAttribute("aria-valuetext", texto(v));
    el.querySelector(".snr-fill").style.width = `${m ? (v / m) * 100 : 0}%`;
  };
  const desdePuntero = e => {
    const r = el.getBoundingClientRect();
    alCambiar(((e.clientX - r.left) / r.width) * max());
  };
  el.addEventListener("pointerdown", e => {
    el.setPointerCapture(e.pointerId);
    desdePuntero(e);
    const mover = ev => desdePuntero(ev);
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerup", () => el.removeEventListener("pointermove", mover), { once: true });
  });
  el.addEventListener("keydown", e => {
    const v = valor();
    const nuevo = { ArrowRight: v + paso, ArrowUp: v + paso, ArrowLeft: v - paso, ArrowDown: v - paso, Home: 0, End: max() }[e.key];
    if (nuevo === undefined) return;
    e.preventDefault();
    alCambiar(nuevo);
  });
  return pintar;
}

// ===== Estructura común: barra lateral, navegación móvil y barra del reproductor =====

const secciones = [
  { id: "inicio",     texto: "Inicio",         href: "index.html",      icono: "home" },
  { id: "buscar",     texto: "Buscar",         href: "buscar.html",     icono: "search" },
  { id: "biblioteca", texto: "Tu biblioteca",  href: "biblioteca.html", icono: "library" },
];

function BotonTema(compacto) {
  const claro = document.documentElement.dataset.theme === "light";
  const texto = claro ? "Usar tema oscuro" : "Usar tema claro";
  // Botón con texto: el conjunto oficial de iconos no trae sol ni luna
  return `<button type="button" class="snr-btn-ghost ${compacto ? "px-3 py-2" : "w-full justify-start"}" data-tema>${compacto ? (claro ? "Tema oscuro" : "Tema claro") : texto}</button>`;
}

function montarShell(activa, { conBarra = true } = {}) {
  document.getElementById("barra-lateral").innerHTML = `
    <div class="flex h-full flex-col gap-6 p-4">
      <div class="px-3 pt-2">${Logo()}</div>
      <nav aria-label="Principal"><ul class="flex flex-col gap-1">
        ${secciones.map(s => `<li><a href="${s.href}" class="snr-nav-link" ${s.id === activa ? 'aria-current="page"' : ""}>${icono(s.icono, "size-6")}<span>${s.texto}</span></a></li>`).join("")}
      </ul></nav>
      <div class="mt-auto" id="tema-lateral">${BotonTema(false)}</div>
    </div>`;

  document.getElementById("cabecera-movil").innerHTML = `${Logo()}<span id="tema-movil">${BotonTema(true)}</span>`;

  document.getElementById("nav-movil").innerHTML = `
    <ul class="grid grid-cols-3">
      ${secciones.map(s => `<li><a href="${s.href}" class="snr-focus flex flex-col items-center gap-1 rounded-md py-2 text-caption ${s.id === activa ? "text-ink" : "text-ink-muted"} hover:text-ink" ${s.id === activa ? 'aria-current="page"' : ""}>${icono(s.icono, "size-6")}<span class="normal-case tracking-normal">${s.texto}</span></a></li>`).join("")}
    </ul>`;

  document.addEventListener("click", e => {
    if (!e.target.closest("[data-tema]")) return;
    const contenedor = e.target.closest("[data-tema]").parentElement.id; // para devolver el foco
    const nuevo = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nuevo;
    try { localStorage.setItem("sonora-tema", nuevo); } catch (err) {}
    document.getElementById("tema-lateral").innerHTML = BotonTema(false);
    document.getElementById("tema-movil").innerHTML = BotonTema(true);
    document.querySelector(`#${contenedor} [data-tema]`).focus();
  });

  // Iconos declarados en el HTML con data-icono="nombre"
  document.querySelectorAll("[data-icono]").forEach(el =>
    el.insertAdjacentHTML("afterbegin", icono(el.dataset.icono, "size-5")));

  reproductor.cargar();

  // Anuncia el cambio de canción a lectores de pantalla
  const aviso = document.getElementById("aviso");
  reproductor.alCambiar((est, cambio) => {
    if (cambio) aviso.textContent = `Reproduciendo ${reproductor.actual.titulo}, de ${reproductor.actual.artista}`;
  });

  const barra = document.getElementById("barra-reproductor");
  if (!conBarra) { barra.remove(); document.body.classList.add("sin-barra"); return; }
  montarBarra(barra);
}

function montarBarra(barra) {
  barra.innerHTML = `
    <div class="mx-auto grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 md:grid-cols-[1fr_minmax(0,560px)_1fr] md:gap-6 md:py-3">
      <div class="flex min-w-0 items-center gap-3">
        <a href="reproductor.html" class="snr-focus flex min-w-0 items-center gap-3 rounded-md" aria-label="Abrir el reproductor">
          <span id="b-portada" class="block size-12 shrink-0"></span>
          <span class="min-w-0">
            <span id="b-titulo" class="block truncate text-body-sm font-bold text-ink"></span>
            <span id="b-artista" class="block truncate text-body-sm text-ink-muted"></span>
          </span>
        </a>
        <button type="button" id="b-gusta" class="snr-icon-btn hidden md:inline-flex">${icono("heart", "size-5")}</button>
      </div>

      <div class="flex flex-col items-center gap-1">
        <div class="flex items-center gap-2">
          <button type="button" id="b-aleatorio" class="snr-icon-btn hidden md:inline-flex" aria-label="Aleatorio">${icono("shuffle", "size-5")}</button>
          <button type="button" id="b-anterior" class="snr-icon-btn hidden md:inline-flex" aria-label="Anterior">${icono("skip-prev", "size-5")}</button>
          <button type="button" id="b-play" class="snr-play"></button>
          <button type="button" id="b-siguiente" class="snr-icon-btn" aria-label="Siguiente">${icono("skip-next", "size-5")}</button>
        </div>
        <div class="hidden w-full items-center gap-3 md:flex">
          <span id="b-t" class="w-12 text-right font-mono text-mono-sm text-ink-muted">00:00</span>
          ${Slider({ id: "b-progreso", etiqueta: "Progreso de la canción", clase: "flex-1" })}
          <span id="b-dur" class="w-12 font-mono text-mono-sm text-ink-muted">00:00</span>
        </div>
      </div>

      <div class="hidden items-center justify-end gap-2 md:flex">
        <span class="text-ink-muted">${icono("volume", "size-5")}</span>
        ${Slider({ id: "b-volumen", etiqueta: "Volumen", clase: "w-28" })}
      </div>
    </div>
    <div class="snr-track md:hidden" aria-hidden="true"><div id="b-progreso-movil" class="snr-fill" style="width:0%"></div></div>`;

  const $ = id => document.getElementById(id);
  $("b-play").onclick = () => reproductor.alternar();
  $("b-siguiente").onclick = () => reproductor.siguiente();
  $("b-anterior").onclick = () => reproductor.anterior();
  $("b-aleatorio").onclick = () => reproductor.alternarAleatorio();
  $("b-gusta").onclick = () => reproductor.alternarMeGusta(reproductor.actual.id);

  const pintarProgreso = conectarSlider($("b-progreso"), {
    max: () => reproductor.actual.dur, valor: () => reproductor.estado.t,
    alCambiar: v => reproductor.buscarEn(v), texto: v => `${fmt(v)} de ${fmt(reproductor.actual.dur)}`,
  });
  const pintarVolumen = conectarSlider($("b-volumen"), {
    max: () => 100, valor: () => reproductor.estado.volumen,
    alCambiar: v => reproductor.ajustarVolumen(v), texto: v => `${v} %`, paso: 10,
  });

  let ultimaPortada = null;
  reproductor.alCambiar(est => {
    const c = reproductor.actual;
    if (ultimaPortada !== c.id) { $("b-portada").innerHTML = Portada(c.album, "rounded-sm! p-2! gap-0.5!"); ultimaPortada = c.id; }
    $("b-titulo").textContent = c.titulo;
    $("b-artista").textContent = c.artista;
    $("b-play").innerHTML = icono(est.sonando ? "pause" : "play", "size-6");
    $("b-play").setAttribute("aria-label", est.sonando ? "Pausar" : "Reproducir");
    const gusta = est.meGusta.includes(c.id);
    $("b-gusta").setAttribute("aria-pressed", gusta);
    $("b-gusta").setAttribute("aria-label", gusta ? "Quitar de me gusta" : "Me gusta");
    $("b-aleatorio").setAttribute("aria-pressed", est.aleatorio);
    $("b-t").textContent = fmt(est.t);
    $("b-dur").textContent = fmt(c.dur);
    $("b-progreso-movil").style.width = `${(est.t / c.dur) * 100}%`;
    pintarProgreso(); pintarVolumen();
  });
}

function saludo() {
  const h = new Date().getHours();
  return h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";
}
