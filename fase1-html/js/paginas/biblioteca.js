// Pantalla Tu biblioteca (extra): colecciones guardadas y canciones que te gustan
montarShell("biblioteca");

const grupo = document.getElementById("filtros");
const cont = document.getElementById("biblioteca");
let vista = "guardadas";

const tarjeta = col => MediaCard({
  href: `playlist.html?id=${col.id}`, titulo: col.nombre, semilla: esAlbum(col) ? col.nombre : col.id,
  subtitulo: esAlbum(col) ? col.artista : "Playlist",
  meta: fmtTotal(col.canciones.reduce((s, id) => s + cancionPorId(id).dur, 0)),
});

function pintar() {
  const est = reproductor.estado;
  grupo.innerHTML = Chip("Guardadas", vista === "guardadas", 'data-vista="guardadas"') + Chip("Me gusta", vista === "megusta", 'data-vista="megusta"');
  if (vista === "guardadas") {
    const cols = est.guardadas.map(coleccionPorId).filter(Boolean);
    cont.innerHTML = cols.length
      ? `<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">${cols.map(tarjeta).join("")}</div>`
      : `<p class="text-body text-ink-muted">Aún no guardas nada. Abre una playlist y toca el corazón.</p>
         <a href="index.html" class="snr-btn-secondary mt-4">Explorar playlists</a>`;
  } else {
    const pistas = est.meGusta.map(cancionPorId).filter(Boolean);
    const actual = reproductor.estado.origen === "me-gusta" ? reproductor.actual.id : null;
    cont.innerHTML = pistas.length
      ? `<ol class="flex flex-col">${pistas.map((c, k) => SongRow(c, k + 1, c.id === actual, `data-cancion="${c.id}"`)).join("")}</ol>`
      : `<p class="text-body text-ink-muted">Las canciones que marques con el corazón aparecen aquí.</p>`;
  }
}

grupo.addEventListener("click", e => {
  const b = e.target.closest("[data-vista]");
  if (!b) return;
  vista = b.dataset.vista; pintar();
  grupo.querySelector(`[data-vista="${vista}"]`).focus();
});
cont.addEventListener("click", e => {
  const b = e.target.closest("[data-cancion]");
  if (!b) return;
  const col = { id: "me-gusta", nombre: "Me gusta", canciones: reproductor.estado.meGusta.slice() };
  reproductor.reproducirColeccion(col, Number(b.dataset.cancion));
  pintar();
});

// Repinta solo si cambian guardadas, me gusta o la canción actual
let firma = "";
reproductor.alCambiar(est => {
  const f = `${est.guardadas}|${est.meGusta}|${est.origen}|${est.i}`;
  if (f !== firma) { firma = f; pintar(); }
});
