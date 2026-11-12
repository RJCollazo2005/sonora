// Partes comunes: tema, aviso para lectores de pantalla y barra del reproductor
import { reproductor } from './reproductor.js';
import { fmt } from './catalogo.js';
import { Portada, conectarSlider, pintarPlay } from './componentes.js';

function pintarBotonesTema() {
    const claro = document.documentElement.dataset.theme === 'light';
    document.querySelectorAll('[data-tema]').forEach((b) => {
        b.textContent = 'corto' in b.dataset
            ? (claro ? 'Tema oscuro' : 'Tema claro')
            : (claro ? 'Usar tema oscuro' : 'Usar tema claro');
    });
}

export function montarShell() {
    pintarBotonesTema();
    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-tema]')) return;
        const nuevo = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = nuevo;
        try { localStorage.setItem('sonora-tema', nuevo); } catch (err) {}
        pintarBotonesTema();
    });

    reproductor.cargar();

    const aviso = document.getElementById('aviso');
    let primera = true;
    reproductor.alCambiar((est, cambio) => {
        if (cambio && !primera) aviso.textContent = `Reproduciendo ${reproductor.actual.titulo}, de ${reproductor.actual.artista}`;
        primera = false;
    });

    if (document.getElementById('barra-reproductor')) montarBarra();
}

function montarBarra() {
    const $ = (id) => document.getElementById(id);
    $('b-play').onclick = () => reproductor.alternar();
    $('b-siguiente').onclick = () => reproductor.siguiente();
    $('b-anterior').onclick = () => reproductor.anterior();
    $('b-aleatorio').onclick = () => reproductor.alternarAleatorio();
    $('b-gusta').onclick = () => reproductor.alternarMeGusta(reproductor.actual.id);

    const pintarProgreso = conectarSlider($('b-progreso'), {
        max: () => reproductor.actual.dur,
        valor: () => reproductor.estado.t,
        alCambiar: (v) => reproductor.buscarEn(v),
        texto: (v) => `${fmt(v)} de ${fmt(reproductor.actual.dur)}`,
    });
    const pintarVolumen = conectarSlider($('b-volumen'), {
        max: () => 100,
        valor: () => reproductor.estado.volumen,
        alCambiar: (v) => reproductor.ajustarVolumen(v),
        texto: (v) => `${v} %`,
        paso: 10,
    });

    let ultima = null;
    reproductor.alCambiar((est) => {
        const c = reproductor.actual;
        if (ultima !== c.id) {
            $('b-portada').innerHTML = Portada(c.barras, 'rounded-sm! p-2! gap-0.5!');
            ultima = c.id;
        }
        $('b-titulo').textContent = c.titulo;
        $('b-artista').textContent = c.artista;
        pintarPlay($('b-play'), est.sonando);
        const gusta = est.meGusta.includes(c.id);
        $('b-gusta').setAttribute('aria-pressed', gusta);
        $('b-gusta').setAttribute('aria-label', gusta ? 'Quitar de me gusta' : 'Me gusta');
        $('b-aleatorio').setAttribute('aria-pressed', est.aleatorio);
        $('b-t').textContent = fmt(est.t);
        $('b-dur').textContent = fmt(c.dur);
        $('b-progreso-movil').style.width = `${(est.t / c.dur) * 100}%`;
        pintarProgreso();
        pintarVolumen();
    });
}
