<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Playlist;
use Illuminate\View\View;

class InicioController extends Controller
{
    public function __invoke(): View
    {
        return view('inicio', [
            'playlists' => Playlist::with('tracks')->orderBy('id')->get(),
            'albumes' => Album::with('tracks')->orderBy('id')->get(),
        ]);
    }
}
