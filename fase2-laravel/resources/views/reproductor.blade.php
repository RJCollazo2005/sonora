{{-- Pantalla Reproductor: la canción actual está en el navegador, así que JavaScript la pinta --}}
@extends('layouts.app')

@section('titulo', 'Reproductor')
@section('pagina', 'reproductor')
@section('sin-barra', 'si')

@section('contenido')
<div class="grid gap-8 lg:grid-cols-[1fr_320px]">
    <section aria-labelledby="r-titulo" class="flex flex-col items-center gap-6 rounded-lg bg-surface-raised p-6 md:p-8">
        <div class="flex w-full justify-start">
            <x-button variant="ghost" id="r-volver" :href="route('inicio')" class="-ml-2">Volver</x-button>
        </div>
        <div id="r-portada" class="w-full max-w-xs shadow-raise"></div>
        <div class="flex w-full max-w-md flex-col items-center gap-1 text-center">
            <h1 id="r-titulo" class="text-title"></h1>
            <p id="r-artista" class="text-body-sm text-ink-muted"></p>
            <p id="r-origen" class="text-body-sm text-ink-muted"></p>
        </div>
        <div class="flex w-full max-w-md items-center gap-3">
            <span id="r-t" class="w-12 text-right font-mono text-mono-sm text-ink-muted">00:00</span>
            <x-slider id="r-progreso" etiqueta="Progreso de la canción" class="flex-1" />
            <span id="r-dur" class="w-12 font-mono text-mono-sm text-ink-muted">00:00</span>
        </div>
        <div class="flex items-center gap-3">
            <x-icon-button id="r-aleatorio" icono="shuffle" etiqueta="Aleatorio" aria-pressed="false" />
            <x-icon-button id="r-anterior" icono="skip-prev" etiqueta="Anterior" />
            <x-play-button id="r-play" tam="size-8" class="size-16!" />
            <x-icon-button id="r-siguiente" icono="skip-next" etiqueta="Siguiente" />
            <x-icon-button id="r-gusta" icono="heart" etiqueta="Me gusta" aria-pressed="false" />
        </div>
        <div class="flex w-full max-w-60 items-center gap-2">
            <span class="text-ink-muted"><x-icon name="volume" class="size-5" /></span>
            <x-slider id="r-volumen" etiqueta="Volumen" class="flex-1" />
        </div>
    </section>

    <section aria-labelledby="t-cola" class="flex flex-col gap-4">
        <h2 id="t-cola" class="text-heading">En cola</h2>
        <ol id="r-cola" class="flex flex-col"></ol>
    </section>
</div>
@endsection
