// Pantalla Inicio: saludo, filtros y tarjetas de playlists y álbumes
montarShell("inicio");

document.getElementById("saludo").textContent = saludo();

const tarjetaPlaylist = p => MediaCard({
  href: `playlist.html?id=${p.id}`, titulo: p.nombre, subtitulo: "Playlist", semilla: p.id,
  meta: fmtTotal(p.canciones.reduce((s, id) => s + cancionPorId(id).dur, 0)),
});
const tarjetaAlbum = a => MediaCard({
  href: `playlist.html?id=${a.id}`, titulo: a.nombre, subtitulo: a.artista, semilla: a.nombre,
  meta: fmtTotal(a.canciones.reduce((s, id) => s + cancionPorId(id).dur, 0)),
});
const tarjeta = col => esAlbum(col) ? tarjetaAlbum(col) : tarjetaPlaylist(col);

document.getElementById("lista-playlists").innerHTML = playlists.map(tarjetaPlaylist).join("");
document.getElementById("lista-albumes").innerHTML = albumes.map(tarjetaAlbum).join("");

const recientes = reproductor.estado.recientes.map(coleccionPorId).filter(Boolean);
if (recientes.length) {
  document.getElementById("lista-recientes").innerHTML = recientes.slice(0, 4).map(tarjeta).join("");
} else {
  document.getElementById("sec-recientes").remove();
}

// Filtros: un chip activo a la vez
const filtros = [["todo", "Todo"], ["playlists", "Playlists"], ["albumes", "Álbumes"]];
const grupo = document.getElementById("filtros");
const pintarFiltros = activo => {
  grupo.innerHTML = filtros.map(([id, txt]) => Chip(txt, id === activo, `data-filtro="${id}"`)).join("");
  document.getElementById("sec-playlists").hidden = activo === "albumes";
  document.getElementById("sec-albumes").hidden = activo === "playlists";
  const rec = document.getElementById("sec-recientes");
  if (rec) rec.hidden = activo !== "todo";
};
grupo.addEventListener("click", e => {
  const b = e.target.closest("[data-filtro]");
  if (!b) return;
  pintarFiltros(b.dataset.filtro);
  grupo.querySelector(`[data-filtro="${b.dataset.filtro}"]`).focus();
});
pintarFiltros("todo");
