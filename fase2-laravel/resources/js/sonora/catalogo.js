// Catálogo que manda Laravel desde la base de datos (ver AppServiceProvider)
const { canciones = [], colecciones = [] } = window.sonora ?? {};

export { canciones, colecciones };
export const cancionPorId = (id) => canciones.find((c) => c.id === id);
export const coleccionPorId = (id) => colecciones.find((c) => c.id === id);

// 258 -> "04:18"
export const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
// 4368 -> "1:12:48"
export const fmtTotal = (s) => {
    const h = Math.floor(s / 3600);
    return h ? `${h}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : fmt(s);
};
