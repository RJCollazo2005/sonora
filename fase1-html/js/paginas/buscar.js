// Pantalla Buscar (extra): filtra canciones, playlists y álbumes mientras escribes
montarShell("buscar");

const normalizar = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const campo = document.getElementById("q");
const res = document.getElementById("resultados");
const todas = [...playlists, ...albumes];

const tarjeta = col => MediaCard({
  href: `playlist.html?id=${col.id}`, titulo: col.nombre, semilla: esAlbum(col) ? col.nombre : col.id,
  subtitulo: esAlbum(col) ? col.artista : "Playlist",
  meta: fmtTotal(col.canciones.reduce((s, id) => s + cancionPorId(id).dur, 0)),
});
const rejilla = cols => `<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">${cols.map(tarjeta).join("")}</div>`;

function buscar() {
  const q = normalizar(campo.value.trim());
  if (!q) {
    res.innerHTML = `<section class="flex flex-col gap-4"><h2 class="text-heading">Explora</h2>${rejilla(todas)}</section>`;
    return;
  }
  const canc = canciones.filter(c => normalizar(`${c.titulo} ${c.artista} ${c.album}`).includes(q));
  const cols = todas.filter(c => normalizar(`${c.nombre} ${c.artista || ""}`).includes(q));
  if (!canc.length && !cols.length) {
    res.innerHTML = `<p class="text-body text-ink-muted" role="status">No encontramos nada para “${esc(campo.value.trim())}”. Prueba con otro nombre.</p>`;
    return;
  }
  res.innerHTML = `
    <p class="sr-only" role="status">${canc.length} canciones y ${cols.length} colecciones</p>
    ${canc.length ? `<section class="flex flex-col gap-4"><h2 class="text-heading">Canciones</h2>
      <ol class="flex flex-col">${canc.map((c, k) => SongRow(c, k + 1, false, `data-cancion="${c.id}"`)).join("")}</ol></section>` : ""}
    ${cols.length ? `<section class="flex flex-col gap-4"><h2 class="text-heading">Playlists y álbumes</h2>${rejilla(cols)}</section>` : ""}`;
}

// Al elegir una canción se reproduce su álbum desde ella
res.addEventListener("click", e => {
  const b = e.target.closest("[data-cancion]");
  if (!b) return;
  const c = cancionPorId(Number(b.dataset.cancion));
  reproductor.reproducirColeccion(albumes.find(a => a.nombre === c.album), c.id);
});

campo.addEventListener("input", buscar);
buscar();
