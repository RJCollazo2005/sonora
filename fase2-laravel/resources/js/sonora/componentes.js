// Versiones en JavaScript de los componentes Blade, para lo que se pinta en el navegador
// (cola, recién escuchado, biblioteca). Usan las mismas clases snr- que x-portada, x-song-row y x-media-card.
import { fmt, fmtTotal } from './catalogo.js';

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function Portada(barras, clase = '') {
    return `<div class="snr-cover ${clase}" aria-hidden="true">${barras.map((a) => `<span style="height:${a}%"></span>`).join('')}</div>`;
}

export function MediaCard(col) {
    return `<a href="${col.url}" class="snr-card group">
        ${Portada(col.barras)}
        <p class="mt-4 truncate text-heading text-ink">${esc(col.nombre)}</p>
        <p class="truncate text-body-sm text-ink-muted">${esc(col.subtitulo)}</p>
        <p class="mt-1 font-mono text-mono-sm text-ink-muted">${fmtTotal(col.dur)}</p>
    </a>`;
}

export const Rejilla = (cols) => `<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">${cols.map(MediaCard).join('')}</div>`;

export function SongRow(c, n, actual, datos = '') {
    return `<li><button type="button" class="snr-row" aria-current="${actual}" ${datos}
            aria-label="Reproducir ${esc(c.titulo)}, de ${esc(c.artista)}">
        <span class="font-mono text-mono-sm ${actual ? NUMERO_ACTUAL : 'text-ink-muted'}" data-numero>${String(n).padStart(2, '0')}</span>
        <span class="min-w-0">
            <span class="block truncate text-body-sm font-bold text-ink">${esc(c.titulo)}</span>
            <span class="block truncate text-body-sm text-ink-muted">${esc(c.artista)}</span>
        </span>
        <span class="font-mono text-mono-sm text-ink-muted">${fmt(c.dur)}</span>
    </button></li>`;
}

// En tema claro accent sobre surface-high no llega a 4.5:1, así que ahí el número va en ink
const NUMERO_ACTUAL = 'font-bold text-ink dark:text-accent';

// Marca la fila que suena en una lista pintada por Blade
export function marcarFilas(lista, esActual) {
    lista.querySelectorAll('[data-cancion]').forEach((fila) => {
        const actual = esActual(fila);
        fila.setAttribute('aria-current', actual);
        const num = fila.querySelector('[data-numero]');
        num.classList.toggle('text-ink-muted', !actual);
        NUMERO_ACTUAL.split(' ').forEach((c) => num.classList.toggle(c, actual));
    });
}

// Alterna los dos iconos de un botón de reproducir/pausar
export function pintarPlay(boton, sonando, conTexto = false) {
    boton.querySelector('[data-icono-play]').classList.toggle('hidden', sonando);
    boton.querySelector('[data-icono-pausa]').classList.toggle('hidden', !sonando);
    if (conTexto) boton.querySelector('[data-texto]').textContent = sonando ? 'Pausar' : 'Reproducir';
    else boton.setAttribute('aria-label', sonando ? 'Pausar' : 'Reproducir');
}

// Barra deslizable accesible (x-slider): flechas, Inicio/Fin, clic y arrastre
export function conectarSlider(el, { max, valor, alCambiar, paso = 5, texto = (v) => v }) {
    const pintar = () => {
        const m = max();
        const v = valor();
        el.setAttribute('aria-valuemax', m);
        el.setAttribute('aria-valuenow', v);
        el.setAttribute('aria-valuetext', texto(v));
        el.querySelector('.snr-fill').style.width = `${m ? (v / m) * 100 : 0}%`;
    };
    const desdePuntero = (e) => {
        const r = el.getBoundingClientRect();
        alCambiar(((e.clientX - r.left) / r.width) * max());
    };
    el.addEventListener('pointerdown', (e) => {
        el.setPointerCapture(e.pointerId);
        desdePuntero(e);
        const mover = (ev) => desdePuntero(ev);
        el.addEventListener('pointermove', mover);
        el.addEventListener('pointerup', () => el.removeEventListener('pointermove', mover), { once: true });
    });
    el.addEventListener('keydown', (e) => {
        const v = valor();
        const nuevo = { ArrowRight: v + paso, ArrowUp: v + paso, ArrowLeft: v - paso, ArrowDown: v - paso, Home: 0, End: max() }[e.key];
        if (nuevo === undefined) return;
        e.preventDefault();
        alCambiar(nuevo);
    });
    return pintar;
}
