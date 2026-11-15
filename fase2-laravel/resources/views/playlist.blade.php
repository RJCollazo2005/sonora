{{-- Pantalla Playlist: sirve para playlists y álbumes (PlaylistController y AlbumController) --}}
@extends('layouts.app')

@section('titulo', $coleccion->nombre)
@section('pagina', 'playlist')

@section('contenido')
<header class="flex flex-col gap-6 sm:flex-row sm:items-end" data-coleccion="{{ $coleccion->slug }}">
    <x-portada :barras="$coleccion->barras()" class="w-48 shrink-0 gap-2! p-6! md:w-56" />
    <div class="flex min-w-0 flex-col gap-2">
        <p class="text-caption uppercase text-ink-muted">{{ $tipo }}</p>
        <h1 class="text-title md:text-display">{{ $coleccion->nombre }}</h1>
        <p class="text-body text-ink-muted">{{ $subtitulo }}</p>
        <p class="font-mono text-mono text-ink-muted">{{ $tracks->count() }} canciones · {{ \App\Support\Tiempo::total($coleccion->duracionTotal()) }}</p>
    </div>
</header>

<div class="flex flex-wrap items-center gap-2">
    {{-- Secundario: el botón ámbar de la vista es el de la barra del reproductor --}}
    <x-button variant="secondary" id="accion-play">
        <x-icon name="play" class="size-5" data-icono-play />
        <x-icon name="pause" class="hidden size-5" data-icono-pausa />
        <span data-texto>Reproducir</span>
    </x-button>
    <x-button variant="ghost" id="accion-aleatorio"><x-icon name="shuffle" class="size-5" /><span>Aleatorio</span></x-button>
    <x-icon-button id="accion-guardar" icono="heart" etiqueta="Guardar en tu biblioteca" aria-pressed="false" />
</div>

<section aria-labelledby="t-canciones">
    <h2 id="t-canciones" class="sr-only">Canciones</h2>
    <ol id="canciones" class="flex flex-col">
        @foreach ($tracks as $track)
            <x-song-row :numero="$loop->iteration" :track="$track" data-cancion="{{ $track->id }}" />
        @endforeach
    </ol>
</section>
@endsection
