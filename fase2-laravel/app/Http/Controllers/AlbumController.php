<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\View\View;

class AlbumController extends Controller
{
    // Un álbum se muestra con la misma vista que una playlist
    public function show(Album $album): View
    {
        $album->load('tracks');

        return view('playlist', [
            'coleccion' => $album,
            'tipo' => 'Álbum',
            'subtitulo' => $album->artista,
            'tracks' => $album->tracks,
        ]);
    }
}
