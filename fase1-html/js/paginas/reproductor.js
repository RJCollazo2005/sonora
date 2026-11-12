// Pantalla Reproductor: portada grande, progreso, controles y cola
montarShell("", { conBarra: false });

const $ = id => document.getElementById(id);
$("r-play").onclick = () => reproductor.alternar();
$("r-siguiente").onclick = () => reproductor.siguiente();
$("r-anterior").onclick = () => reproductor.anterior();
$("r-aleatorio").onclick = () => reproductor.alternarAleatorio();
$("r-gusta").onclick = () => reproductor.alternarMeGusta(reproductor.actual.id);
$("r-volver").onclick = e => { if (history.length > 1) { e.preventDefault(); history.back(); } };

const pintarProgreso = conectarSlider($("r-progreso"), {
  max: () => reproductor.actual.dur, valor: () => reproductor.estado.t,
  alCambiar: v => reproductor.buscarEn(v), texto: v => `${fmt(v)} de ${fmt(reproductor.actual.dur)}`,
});
const pintarVolumen = conectarSlider($("r-volumen"), {
  max: () => 100, valor: () => reproductor.estado.volumen,
  alCambiar: v => reproductor.ajustarVolumen(v), texto: v => `${v} %`, paso: 10,
});

$("r-cola").addEventListener("click", e => {
  const b = e.target.closest("[data-indice]");
  if (!b) return;
  const i = Number(b.dataset.indice);
  if (i === reproductor.estado.i) reproductor.alternar();
  else reproductor.reproducirDeCola(i);
});

let firma = "";
reproductor.alCambiar(est => {
  const c = reproductor.actual;
  const origen = coleccionPorId(est.origen);
  $("r-titulo").textContent = c.titulo;
  $("r-artista").textContent = `${c.artista} · ${c.album}`;
  $("r-origen").innerHTML = origen
    ? `Desde <a href="playlist.html?id=${origen.id}" class="snr-focus rounded-sm text-ink underline-offset-4 hover:underline">${esc(origen.nombre)}</a>`
    : "Desde tus me gusta";
  $("r-t").textContent = fmt(est.t);
  $("r-dur").textContent = fmt(c.dur);
  $("r-play").innerHTML = icono(est.sonando ? "pause" : "play", "size-8");
  $("r-play").setAttribute("aria-label", est.sonando ? "Pausar" : "Reproducir");
  $("r-aleatorio").setAttribute("aria-pressed", est.aleatorio);
  const gusta = est.meGusta.includes(c.id);
  $("r-gusta").setAttribute("aria-pressed", gusta);
  $("r-gusta").setAttribute("aria-label", gusta ? "Quitar de me gusta" : "Me gusta");
  pintarProgreso(); pintarVolumen();

  const nuevaFirma = `${c.id}-${est.i}-${est.cola.join(",")}`;
  if (firma === nuevaFirma) return;
  firma = nuevaFirma;
  document.title = `${c.titulo} · Sonora`;
  $("r-portada").innerHTML = Portada(c.album, "gap-3! p-8!");
  const conFoco = document.activeElement?.dataset?.indice;
  $("r-cola").innerHTML = est.cola.map((id, k) => SongRow(cancionPorId(id), k + 1, k === est.i, `data-indice="${k}"`)).join("");
  if (conFoco) $("r-cola").querySelector(`[data-indice="${conFoco}"]`)?.focus();
});
