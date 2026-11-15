@extends('layouts.app')

@section('titulo', 'Inicio')
@section('pagina', 'inicio')
@section('activa', 'inicio')

@section('contenido')
<div class="flex flex-col gap-4">
    <h1 id="saludo" class="text-title md:text-display">Hola</h1>
    <div id="filtros" role="group" aria-label="Filtrar contenido" class="flex flex-wrap gap-2">
        <x-chip activo data-filtro="todo">Todo</x-chip>
        <x-chip data-filtro="playlists">Playlists</x-chip>
        <x-chip data-filtro="albumes">Álbumes</x-chip>
    </div>
</div>

{{-- Se llena con JavaScript: lo escuchado vive en el navegador --}}
<section id="sec-recientes" aria-labelledby="t-recientes" class="flex flex-col gap-4" hidden>
    <h2 id="t-recientes" class="text-heading">Recién escuchado</h2>
    <x-rejilla id="lista-recientes" />
</section>

<section id="sec-playlists" aria-labelledby="t-playlists" class="flex flex-col gap-4">
    <h2 id="t-playlists" class="text-heading">Tus mezclas</h2>
    <x-rejilla>
        @foreach ($playlists as $playlist)
            <x-coleccion-card :coleccion="$playlist" />
        @endforeach
    </x-rejilla>
</section>

<section id="sec-albumes" aria-labelledby="t-albumes" class="flex flex-col gap-4">
    <h2 id="t-albumes" class="text-heading">Álbumes</h2>
    <x-rejilla>
        @foreach ($albumes as $album)
            <x-coleccion-card :coleccion="$album" />
        @endforeach
    </x-rejilla>
</section>
@endsection
