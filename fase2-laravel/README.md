# Sonora: fase 2 (Laravel)

Las pantallas de la fase 1 pasadas a **Laravel 13 + Blade + Tailwind CSS v4 (Vite)**. Las canciones, álbumes y playlists vienen de la base de datos y cada pantalla tiene su ruta y su controlador. La reproducción sigue siendo simulada.

Autora: Rosa De Jesus Collazo Mendoza

## Requisitos

- PHP 8.3 o más reciente, con la extensión `pdo_sqlite`
- Composer
- Node.js 20 o más reciente

## Cómo ejecutarlo

Desde la carpeta `fase2-laravel`:

```bash
composer run setup
```

Ese comando instala las dependencias, crea `.env`, genera la llave, crea la base de datos SQLite con las canciones de ejemplo y compila los estilos. Después:

```bash
php artisan serve
```

y abre http://localhost:8000.

Paso a paso, por si prefieres hacerlo a mano:

```bash
composer install
cp .env.example .env            # en Windows: copy .env.example .env
php artisan key:generate
php artisan migrate --seed      # si pregunta si crea database.sqlite, responde yes
npm install
npm run build                   # o "npm run dev" en otra terminal mientras editas
php artisan serve
```

Para volver a cargar los datos de ejemplo desde cero: `php artisan migrate:fresh --seed`.

Pruebas: `php artisan test` (revisa que todas las pantallas respondan y que la búsqueda funcione).

## Rutas

| Ruta | Nombre | Controlador / vista |
|---|---|---|
| `/` | `inicio` | `InicioController` → `inicio.blade.php` |
| `/playlists/{slug}` | `playlists.show` | `PlaylistController@show` → `playlist.blade.php` |
| `/albumes/{slug}` | `albumes.show` | `AlbumController@show` → `playlist.blade.php` |
| `/reproductor` | `reproductor` | vista `reproductor.blade.php` |
| `/buscar?q=` | `buscar` | `BuscarController` → `buscar.blade.php` |
| `/biblioteca` | `biblioteca` | vista `biblioteca.blade.php` |

Una dirección que no existe muestra `errors/404.blade.php` con el estilo de Sonora.

## Base de datos

- `albums`: nombre, slug, artista
- `tracks`: título, artista, álbum, duración en segundos y portada (opcional)
- `playlists`: nombre, slug, descripción
- `playlist_track`: qué canciones tiene cada playlist y en qué posición

Modelos: `Album` (tiene muchas `Track`), `Track` (pertenece a un `Album` y a varias `Playlist`) y `Playlist` (tiene muchas `Track` en orden). Los datos de ejemplo, todos inventados, están en `database/seeders/MusicaSeeder.php`: 10 canciones, 5 álbumes y 4 playlists.

## Vistas

Organizadas como el ejemplo del sistema de diseño: una plantilla base y una vista por pantalla que la extiende.

```
resources/views/
├── layouts/
│   └── app.blade.php        ← plantilla base: barra lateral, menú móvil y barra del reproductor
├── inicio.blade.php         ← Inicio
├── playlist.blade.php       ← Playlist (también muestra álbumes)
├── reproductor.blade.php    ← Reproductor
├── buscar.blade.php         ← Buscar
├── biblioteca.blade.php     ← Tu biblioteca
├── errors/404.blade.php     ← página no encontrada
└── components/              ← componentes Blade reutilizables
```

Cada vista empieza así:

```blade
@extends('layouts.app')

@section('titulo', 'Inicio')
@section('pagina', 'inicio')     {{-- qué script de JavaScript se monta --}}
@section('activa', 'inicio')     {{-- qué enlace del menú se marca --}}

@section('contenido')
    …
@endsection
```

## Componentes Blade

En `resources/views/components/`:

| Componente | Uso |
|---|---|
| `<x-button variant="primary|secondary|ghost">` | Botones del sistema; con `href` se vuelve enlace |
| `<x-chip :activo="true">` | Filtros con `aria-pressed` |
| `<x-media-card>` y `<x-coleccion-card>` | Tarjeta de playlist o álbum |
| `<x-song-row>` | Fila de canción |
| `<x-portada>` | Marcador de portada con barras |
| `<x-slider>` | Barra de progreso o volumen accesible con teclado |
| `<x-icon name="play">` | Iconos oficiales, leídos de `resources/icons` |
| `<x-icon-button>`, `<x-play-button>`, `<x-nav>`, `<x-logo>`, `<x-player-bar>`, `<x-rejilla>` | Piezas de la interfaz |

Los estilos están en `resources/css/app.css`: los tokens del sistema y las utilidades `snr-`, iguales a las de la fase 1.

## JavaScript

`resources/js/app.js` monta la pantalla según `@section('pagina')` de cada vista (queda en `data-pagina` del `<body>`). En `resources/js/sonora/`:

- `catalogo.js` lee el catálogo que Laravel manda como JSON (`AppServiceProvider`).
- `reproductor.js` contiene el estado y la reproducción simulada, que se guardan en `localStorage`.
- `componentes.js` tiene las versiones en JavaScript de la tarjeta y la fila, para lo que se pinta en el navegador.
- `paginas/` tiene un archivo por pantalla.
