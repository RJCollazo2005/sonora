<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Playlist;
use App\Models\Track;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Datos de ejemplo inventados: ninguna canción, artista ni portada es real.
 */
class MusicaSeeder extends Seeder
{
    public function run(): void
    {
        $albumes = [
            'Mareas' => 'Faro Lento',
            'Rosa de los vientos' => 'Las Brújulas',
            'Cuaderno' => 'Coral Norte',
            'Domingos' => 'Nube Baja',
            'Otoño largo' => 'Tierra Tibia',
        ];

        foreach ($albumes as $nombre => $artista) {
            Album::create(['nombre' => $nombre, 'slug' => Str::slug($nombre), 'artista' => $artista]);
        }

        // [título, álbum, duración en segundos]; el artista es el del álbum
        $canciones = [
            ['Calle de sal', 'Mareas', 214],
            ['Siete vientos', 'Rosa de los vientos', 247],
            ['Papel y tinta', 'Cuaderno', 189],
            ['Luz de cocina', 'Domingos', 263],
            ['Ruta 45', 'Mareas', 301],
            ['Hojas secas', 'Otoño largo', 228],
            ['Mapa sin norte', 'Rosa de los vientos', 196],
            ['Ventana abierta', 'Domingos', 242],
            ['Café a las seis', 'Cuaderno', 175],
            ['Río arriba', 'Otoño largo', 286],
        ];

        foreach ($canciones as [$titulo, $album, $duracion]) {
            $a = Album::where('nombre', $album)->first();
            Track::create(['titulo' => $titulo, 'artista' => $a->artista, 'album_id' => $a->id, 'duracion' => $duracion]);
        }

        // Las canciones se referencian por título para que el seeder se lea fácil
        $playlists = [
            ['Mañana tranquila', 'Para empezar el día sin prisa', ['Luz de cocina', 'Café a las seis', 'Papel y tinta', 'Ventana abierta', 'Calle de sal']],
            ['Para concentrarte', 'Pistas largas y sin sobresaltos', ['Ruta 45', 'Río arriba', 'Siete vientos', 'Hojas secas', 'Papel y tinta', 'Mapa sin norte']],
            ['Camino a casa', 'El regreso con buena compañía', ['Calle de sal', 'Mapa sin norte', 'Ruta 45', 'Siete vientos', 'Ventana abierta']],
            ['Domingo lento', 'Café, sol y nada pendiente', ['Ventana abierta', 'Luz de cocina', 'Hojas secas', 'Café a las seis', 'Río arriba', 'Calle de sal', 'Papel y tinta']],
        ];

        foreach ($playlists as [$nombre, $descripcion, $titulos]) {
            $playlist = Playlist::create(['nombre' => $nombre, 'slug' => Str::slug($nombre), 'descripcion' => $descripcion]);
            foreach ($titulos as $posicion => $titulo) {
                $playlist->tracks()->attach(Track::where('titulo', $titulo)->value('id'), ['posicion' => $posicion + 1]);
            }
        }
    }
}
