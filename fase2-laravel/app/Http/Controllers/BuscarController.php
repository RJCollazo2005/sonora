<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Playlist;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class BuscarController extends Controller
{
    public function __invoke(Request $request): View
    {
        $q = trim((string) $request->query('q', ''));
        $playlists = Playlist::with('tracks')->orderBy('id')->get();
        $albumes = Album::with('tracks')->orderBy('id')->get();

        if ($q === '') {
            return view('buscar', ['q' => '', 'tracks' => collect(), 'playlists' => $playlists, 'albumes' => $albumes]);
        }

        // Se compara sin mayúsculas ni acentos: "cafe" encuentra "Café a las seis".
        // Con pocos datos basta filtrar en PHP; con miles convendría una columna normalizada o búsqueda de texto completo.
        $buscado = self::normalizar($q);
        $coincide = fn (string ...$textos) => str_contains(self::normalizar(implode(' ', $textos)), $buscado);

        return view('buscar', [
            'q' => $q,
            'tracks' => Track::with('album')->orderBy('titulo')->get()
                ->filter(fn ($t) => $coincide($t->titulo, $t->artista, $t->album->nombre))->values(),
            'playlists' => $playlists->filter(fn ($p) => $coincide($p->nombre))->values(),
            'albumes' => $albumes->filter(fn ($a) => $coincide($a->nombre, $a->artista))->values(),
        ]);
    }

    private static function normalizar(string $texto): string
    {
        return Str::lower(Str::ascii($texto));
    }
}
