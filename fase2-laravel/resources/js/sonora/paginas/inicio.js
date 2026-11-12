// Inicio: saludo según la hora, filtros con chips y lo recién escuchado
import { reproductor } from '../reproductor.js';
import { coleccionPorId } from '../catalogo.js';
import { MediaCard } from '../componentes.js';

export default function inicio() {
    const h = new Date().getHours();
    document.getElementById('saludo').textContent = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';

    const recientes = reproductor.estado.recientes.map(coleccionPorId).filter(Boolean).slice(0, 4);
    const secRecientes = document.getElementById('sec-recientes');
    if (recientes.length) {
        document.getElementById('lista-recientes').innerHTML = recientes.map(MediaCard).join('');
        secRecientes.hidden = false;
    }

    const grupo = document.getElementById('filtros');
    grupo.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-filtro]');
        if (!chip) return;
        const filtro = chip.dataset.filtro;
        grupo.querySelectorAll('[data-filtro]').forEach((c) => c.setAttribute('aria-pressed', c === chip));
        document.getElementById('sec-playlists').hidden = filtro === 'albumes';
        document.getElementById('sec-albumes').hidden = filtro === 'playlists';
        secRecientes.hidden = filtro !== 'todo' || !recientes.length;
    });
}
