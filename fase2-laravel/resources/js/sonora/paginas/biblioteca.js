// Tu biblioteca: colecciones guardadas y canciones que te gustan (guardadas en el navegador)
import { reproductor } from '../reproductor.js';
import { cancionPorId, coleccionPorId } from '../catalogo.js';
import { Rejilla, SongRow } from '../componentes.js';

export default function biblioteca() {
    const grupo = document.getElementById('filtros');
    const cont = document.getElementById('biblioteca');
    let vista = 'guardadas';

    function pintar() {
        const est = reproductor.estado;
        grupo.querySelectorAll('[data-vista]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.vista === vista));
        if (vista === 'guardadas') {
            const cols = est.guardadas.map(coleccionPorId).filter(Boolean);
            cont.innerHTML = cols.length
                ? Rejilla(cols)
                : `<p class="text-body text-ink-muted">Aún no guardas nada. Abre una playlist y toca el corazón.</p>
                   <a href="/" class="snr-btn-secondary mt-4">Explorar playlists</a>`;
            cont.firstElementChild.classList.add('w-full');
        } else {
            const pistas = est.meGusta.map(cancionPorId).filter(Boolean);
            const actual = est.origen === 'me-gusta' ? reproductor.actual.id : null;
            cont.innerHTML = pistas.length
                ? `<ol class="flex w-full flex-col">${pistas.map((c, k) => SongRow(c, k + 1, c.id === actual, `data-cancion="${c.id}"`)).join('')}</ol>`
                : '<p class="text-body text-ink-muted">Las canciones que marques con el corazón aparecen aquí.</p>';
        }
    }

    grupo.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-vista]');
        if (!chip) return;
        vista = chip.dataset.vista;
        pintar();
    });
    cont.addEventListener('click', (e) => {
        const fila = e.target.closest('[data-cancion]');
        if (!fila) return;
        const id = Number(fila.dataset.cancion);
        reproductor.reproducirColeccion({ id: 'me-gusta', canciones: reproductor.estado.meGusta.slice() }, id);
        cont.querySelector(`[data-cancion="${id}"]`)?.focus();
    });

    let firma = '';
    reproductor.alCambiar((est) => {
        const f = `${est.guardadas}|${est.meGusta}|${est.origen}|${est.i}`;
        if (f !== firma) { firma = f; pintar(); }
    });
}
