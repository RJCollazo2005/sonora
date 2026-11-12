{{-- Atajo: tarjeta de una playlist o un álbum --}}
@props(['coleccion'])
@php
    $esAlbum = $coleccion instanceof \App\Models\Album;
@endphp
<x-media-card
    :href="$esAlbum ? route('albumes.show', $coleccion) : route('playlists.show', $coleccion)"
    :titulo="$coleccion->nombre"
    :subtitulo="$esAlbum ? $coleccion->artista : 'Playlist'"
    :duracion="\App\Support\Tiempo::total($coleccion->duracionTotal())"
    :barras="$coleccion->barras()" />
