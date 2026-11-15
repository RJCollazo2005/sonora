// Playlist o álbum: reproducir, aleatorio, guardar y elegir canción
import { reproductor } from '../reproductor.js';
import { coleccionPorId } from '../catalogo.js';
import { marcarFilas, pintarPlay } from '../componentes.js';

export default function playlist() {
    const col = coleccionPorId(document.querySelector('[data-coleccion]').dataset.coleccion);
    const bPlay = document.getElementById('accion-play');
    const bGuardar = document.getElementById('accion-guardar');
    const lista = document.getElementById('canciones');
    const esEsta = () => reproductor.estado.origen === col.id;

    bPlay.onclick = () => (esEsta() ? reproductor.alternar() : reproductor.reproducirColeccion(col));
    document.getElementById('accion-aleatorio').onclick = () => {
        const alAzar = col.canciones[Math.floor(Math.random() * col.canciones.length)];
        reproductor.reproducirColeccion(col, alAzar, true);
    };
    bGuardar.onclick = () => reproductor.alternarGuardada(col.id);
    lista.addEventListener('click', (e) => {
        const fila = e.target.closest('[data-cancion]');
        if (!fila) return;
        const id = Number(fila.dataset.cancion);
        if (esEsta() && reproductor.actual.id === id) reproductor.alternar();
        else reproductor.reproducirColeccion(col, id);
    });

    reproductor.alCambiar((est) => {
        pintarPlay(bPlay, esEsta() && est.sonando, true);
        const guardada = est.guardadas.includes(col.id);
        bGuardar.setAttribute('aria-pressed', guardada);
        bGuardar.setAttribute('aria-label', guardada ? 'Quitar de tu biblioteca' : 'Guardar en tu biblioteca');
        const actualId = esEsta() ? reproductor.actual.id : null;
        marcarFilas(lista, (fila) => Number(fila.dataset.cancion) === actualId);
    });
}
