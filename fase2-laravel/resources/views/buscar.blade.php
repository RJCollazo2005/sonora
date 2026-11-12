<x-layout titulo="Buscar" pagina="buscar" activa="buscar">
    <div class="flex flex-col gap-4">
        <h1 class="text-title md:text-display">Buscar</h1>
        <form role="search" action="{{ route('buscar') }}" method="get" class="flex max-w-xl gap-2">
            <label for="q" class="sr-only">Buscar canciones, artistas o playlists</label>
            <input id="q" name="q" type="search" value="{{ $q }}" autocomplete="off" placeholder="¿Qué quieres escuchar?" class="snr-search">
            <x-button variant="secondary" type="submit">Buscar</x-button>
        </form>
    </div>

    @if ($q === '')
        <section aria-labelledby="t-explora" class="flex flex-col gap-4">
            <h2 id="t-explora" class="text-heading">Explora</h2>
            <x-rejilla>
                @foreach ($playlists->concat($albumes) as $coleccion)
                    <x-coleccion-card :coleccion="$coleccion" />
                @endforeach
            </x-rejilla>
        </section>
    @elseif ($tracks->isEmpty() && $playlists->isEmpty() && $albumes->isEmpty())
        <p class="text-body text-ink-muted" role="status">No encontramos nada para “{{ $q }}”. Prueba con otro nombre.</p>
    @else
        @php($colecciones = $playlists->count() + $albumes->count())
        <p class="sr-only" role="status">{{ $tracks->count() }} {{ $tracks->count() === 1 ? 'canción' : 'canciones' }} y {{ $colecciones }} {{ $colecciones === 1 ? 'colección' : 'colecciones' }} para “{{ $q }}”</p>
        @if ($tracks->isNotEmpty())
            <section aria-labelledby="t-canciones" class="flex flex-col gap-4">
                <h2 id="t-canciones" class="text-heading">Canciones</h2>
                <ol id="resultados" class="flex flex-col">
                    @foreach ($tracks as $track)
                        <x-song-row :numero="$loop->iteration" :track="$track" data-cancion="{{ $track->id }}" data-album="{{ $track->album->slug }}" />
                    @endforeach
                </ol>
            </section>
        @endif
        @if ($playlists->isNotEmpty() || $albumes->isNotEmpty())
            <section aria-labelledby="t-colecciones" class="flex flex-col gap-4">
                <h2 id="t-colecciones" class="text-heading">Playlists y álbumes</h2>
                <x-rejilla>
                    @foreach ($playlists->concat($albumes) as $coleccion)
                        <x-coleccion-card :coleccion="$coleccion" />
                    @endforeach
                </x-rejilla>
            </section>
        @endif
    @endif
</x-layout>
