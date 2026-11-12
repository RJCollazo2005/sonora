<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\View\View;

class PlaylistController extends Controller
{
    public function show(Playlist $playlist): View
    {
        $playlist->load('tracks');

        return view('coleccion', [
            'coleccion' => $playlist,
            'tipo' => 'Playlist',
            'subtitulo' => $playlist->descripcion,
            'tracks' => $playlist->tracks,
        ]);
    }
}
