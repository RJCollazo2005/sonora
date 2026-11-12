// Buscar: los resultados los arma Laravel; aquí solo se reproduce la canción elegida
import { reproductor } from '../reproductor.js';
import { coleccionPorId } from '../catalogo.js';
import { marcarFilas } from '../componentes.js';

export default function buscar() {
    const lista = document.getElementById('resultados');
    if (!lista) return;

    // Al elegir una canción se reproduce su álbum desde ella
    lista.addEventListener('click', (e) => {
        const fila = e.target.closest('[data-cancion]');
        if (!fila) return;
        reproductor.reproducirColeccion(coleccionPorId(fila.dataset.album), Number(fila.dataset.cancion));
    });
    reproductor.alCambiar(() => {
        marcarFilas(lista, (fila) => Number(fila.dataset.cancion) === reproductor.actual.id);
    });
}
