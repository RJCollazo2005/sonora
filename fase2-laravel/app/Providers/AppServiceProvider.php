<?php

namespace App\Providers;

use App\Models\Album;
use App\Models\Playlist;
use App\Models\Track;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // El reproductor simulado necesita conocer todas las canciones y colecciones.
        // Se comparte con el layout y se entrega al navegador como JSON.
        View::composer('components.layout', function ($view) {
            $view->with('catalogo', [
                'canciones' => Track::with('album')->orderBy('id')->get()->map(fn ($t) => [
                    'id' => $t->id,
                    'titulo' => $t->titulo,
                    'artista' => $t->artista,
                    'album' => $t->album->nombre,
                    'albumId' => $t->album->slug,
                    'dur' => $t->duracion,
                    'barras' => $t->album->barras(),
                ]),
                'colecciones' => Playlist::with('tracks')->orderBy('id')->get()->map(fn ($p) => [
                    'id' => $p->slug,
                    'nombre' => $p->nombre,
                    'subtitulo' => 'Playlist',
                    'url' => route('playlists.show', $p),
                    'canciones' => $p->tracks->pluck('id'),
                    'dur' => $p->duracionTotal(),
                    'barras' => $p->barras(),
                ])->concat(Album::with('tracks')->orderBy('id')->get()->map(fn ($a) => [
                    'id' => $a->slug,
                    'nombre' => $a->nombre,
                    'subtitulo' => $a->artista,
                    'url' => route('albumes.show', $a),
                    'canciones' => $a->tracks->pluck('id'),
                    'dur' => $a->duracionTotal(),
                    'barras' => $a->barras(),
                ])),
            ]);
        });
    }
}
