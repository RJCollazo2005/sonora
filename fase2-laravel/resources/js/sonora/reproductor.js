// Reproducción simulada: no hay audio, solo una cola de canciones y un temporizador.
// El estado se guarda en localStorage para que la música "siga sonando" al cambiar de página.
import { canciones, colecciones, cancionPorId } from './catalogo.js';

const CLAVE = 'sonora-estado';
const primera = colecciones[0];

export const reproductor = {
    estado: {
        cola: primera ? primera.canciones.slice() : canciones.map((c) => c.id),
        origen: primera?.id ?? null,
        i: 0,
        t: 0,
        sonando: false,
        aleatorio: false,
        volumen: 70,
        meGusta: [],
        guardadas: [],
        recientes: [],
    },
    timer: null,
    oyentes: [],

    cargar() {
        try {
            const guardado = JSON.parse(localStorage.getItem(CLAVE));
            // Si la base de datos cambió y la cola apunta a canciones que ya no existen, se ignora
            if (guardado && guardado.cola?.length && guardado.cola.every((id) => cancionPorId(id))) {
                Object.assign(this.estado, guardado);
            }
        } catch (e) { /* se usa el estado inicial */ }
        this.estado.i = Math.min(this.estado.i, this.estado.cola.length - 1);
        if (this.estado.sonando) this.iniciarTimer();
    },
    guardar() {
        try { localStorage.setItem(CLAVE, JSON.stringify(this.estado)); } catch (e) {}
    },
    // Las vistas se suscriben para volver a pintarse cuando cambia el estado
    alCambiar(fn) { this.oyentes.push(fn); fn(this.estado, true); },
    avisar(cambioDePista = false) {
        this.guardar();
        this.oyentes.forEach((fn) => fn(this.estado, cambioDePista));
    },

    get actual() { return cancionPorId(this.estado.cola[this.estado.i]); },

    iniciarTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.estado.t++;
            if (this.estado.t >= this.actual.dur) return this.siguiente();
            this.avisar();
        }, 1000);
    },

    reproducir() { this.estado.sonando = true; this.iniciarTimer(); this.avisar(); },
    pausar() { this.estado.sonando = false; clearInterval(this.timer); this.avisar(); },
    alternar() { this.estado.sonando ? this.pausar() : this.reproducir(); },

    siguiente() {
        const { cola, aleatorio } = this.estado;
        if (aleatorio && cola.length > 1) {
            let j;
            do { j = Math.floor(Math.random() * cola.length); } while (j === this.estado.i);
            this.estado.i = j;
        } else {
            this.estado.i = (this.estado.i + 1) % cola.length;
        }
        this.estado.t = 0;
        this.avisar(true);
    },
    anterior() {
        // Si ya avanzó, vuelve al inicio de la pista
        if (this.estado.t > 3) { this.estado.t = 0; return this.avisar(); }
        const n = this.estado.cola.length;
        this.estado.i = (this.estado.i - 1 + n) % n;
        this.estado.t = 0;
        this.avisar(true);
    },
    buscarEn(segundos) {
        this.estado.t = Math.max(0, Math.min(Math.round(segundos), this.actual.dur - 1));
        this.avisar();
    },

    // Reproduce una colección (playlist, álbum o "me gusta") desde una canción
    reproducirColeccion(col, cancionId = col.canciones[0], aleatorio = false) {
        this.estado.cola = col.canciones.slice();
        this.estado.origen = col.id;
        this.estado.aleatorio = aleatorio;
        this.estado.i = Math.max(0, col.canciones.indexOf(cancionId));
        this.estado.t = 0;
        this.estado.recientes = [col.id, ...this.estado.recientes.filter((r) => r !== col.id)].slice(0, 6);
        this.estado.sonando = true;
        this.iniciarTimer();
        this.avisar(true);
    },
    reproducirDeCola(i) {
        this.estado.i = i;
        this.estado.t = 0;
        this.estado.sonando = true;
        this.iniciarTimer();
        this.avisar(true);
    },

    alternarAleatorio() { this.estado.aleatorio = !this.estado.aleatorio; this.avisar(); },
    ajustarVolumen(v) { this.estado.volumen = Math.max(0, Math.min(100, Math.round(v))); this.avisar(); },
    alternarMeGusta(id) {
        const l = this.estado.meGusta;
        this.estado.meGusta = l.includes(id) ? l.filter((x) => x !== id) : [...l, id];
        this.avisar();
    },
    alternarGuardada(id) {
        const l = this.estado.guardadas;
        this.estado.guardadas = l.includes(id) ? l.filter((x) => x !== id) : [...l, id];
        this.avisar();
    },
};
