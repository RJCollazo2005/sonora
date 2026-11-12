// Punto de entrada de Vite: monta la estructura común y la pantalla actual
import { montarShell } from './sonora/shell.js';
import inicio from './sonora/paginas/inicio.js';
import coleccion from './sonora/paginas/coleccion.js';
import reproductor from './sonora/paginas/reproductor.js';
import buscar from './sonora/paginas/buscar.js';
import biblioteca from './sonora/paginas/biblioteca.js';

const paginas = { inicio, coleccion, reproductor, buscar, biblioteca };

montarShell();
paginas[document.body.dataset.pagina]?.();
