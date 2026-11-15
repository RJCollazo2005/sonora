@extends('layouts.app')

@section('titulo', 'No encontrada')
@section('pagina', 'error')

@section('contenido')
<div class="flex flex-col items-start gap-4">
    <h1 class="text-title md:text-display">No encontramos esta página</h1>
    <p class="text-body text-ink-muted">Puede que el enlace esté mal escrito o que la playlist ya no exista.</p>
    <x-button variant="secondary" :href="route('inicio')">Volver al inicio</x-button>
</div>
@endsection
