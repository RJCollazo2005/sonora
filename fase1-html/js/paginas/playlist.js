// Pantalla Playlist (también sirve para álbumes): encabezado, acciones y lista de canciones
montarShell("");

const id = new URLSearchParams(location.search).get("id") || playlists[0].id;
const col = coleccionPorId(id);
const main = document.getElementById("contenido");

if (!col) {
  document.title = "No encontrada · Sonora";
  main.innerHTML = `<h1 class="text-title">No encontramos esta playlist</h1>
    <p class="mt-2 text-body text-ink-muted">Puede que el enlace esté mal escrito.</p>
    <a href="index.html" class="snr-btn-secondary mt-6">Volver al inicio</a>`;
} else {
  const pistas = col.canciones.map(cancionPorId);
  const total = pistas.reduce((s, c) => s + c.dur, 0);
  const album = esAlbum(col);
  document.title = `${col.nombre} · Sonora`;

  document.getElementById("portada").innerHTML = Portada(album ? col.nombre : col.id, "gap-2! p-6!");
  document.getElementById("tipo").textContent = album ? "Álbum" : "Playlist";
  document.getElementById("nombre").textContent = col.nombre;
  document.getElementById("descripcion").textContent = album ? col.artista : col.descripcion;
  document.getElementById("meta").textContent =
    `${pistas.length} canciones · ${fmtTotal(total)}`;

  const bPlay = document.getElementById("accion-play");
  const bAleatorio = document.getElementById("accion-aleatorio");
  const bGuardar = document.getElementById("accion-guardar");
  const lista = document.getElementById("canciones");

  const esEsta = () => reproductor.estado.origen === col.id;

  bPlay.onclick = () => {
    if (esEsta()) reproductor.alternar();
    else reproductor.reproducirColeccion(col);
  };
  bAleatorio.onclick = () => {
    const alAzar = col.canciones[Math.floor(Math.random() * col.canciones.length)];
    reproductor.reproducirColeccion(col, alAzar, true);
  };
  bGuardar.onclick = () => reproductor.alternarGuardada(col.id);
  lista.addEventListener("click", e => {
    const b = e.target.closest("[data-cancion]");
    if (!b) return;
    const cid = Number(b.dataset.cancion);
    if (esEsta() && reproductor.actual.id === cid) reproductor.alternar();
    else reproductor.reproducirColeccion(col, cid);
  });

  let firma = "";
  reproductor.alCambiar(est => {
    const sonandoAqui = esEsta() && est.sonando;
    bPlay.innerHTML = `${icono(sonandoAqui ? "pause" : "play", "size-5")}<span>${sonandoAqui ? "Pausar" : "Reproducir"}</span>`;
    const guardada = est.guardadas.includes(col.id);
    bGuardar.setAttribute("aria-pressed", guardada);
    bGuardar.setAttribute("aria-label", guardada ? "Quitar de tu biblioteca" : "Guardar en tu biblioteca");

    // Solo se vuelve a pintar la lista si cambió la canción actual (no en cada segundo)
    const actualId = esEsta() ? reproductor.actual.id : null;
    if (firma === String(actualId)) return;
    firma = String(actualId);
    const conFoco = document.activeElement?.dataset?.cancion;
    lista.innerHTML = pistas.map((c, k) => SongRow(c, k + 1, c.id === actualId, `data-cancion="${c.id}"`)).join("");
    if (conFoco) lista.querySelector(`[data-cancion="${conFoco}"]`)?.focus();
  });
}
