{{-- Navegación principal: barra lateral (escritorio) o barra inferior (móvil) --}}
@props(['activa' => null, 'movil' => false])
@php
    $secciones = [
        ['inicio', 'Inicio', route('inicio'), 'home'],
        ['buscar', 'Buscar', route('buscar'), 'search'],
        ['biblioteca', 'Tu biblioteca', route('biblioteca'), 'library'],
    ];
@endphp
@if ($movil)
    <ul class="grid grid-cols-3">
        @foreach ($secciones as [$id, $texto, $url, $icono])
            <li>
                <a href="{{ $url }}" @if ($id === $activa) aria-current="page" @endif
                    class="snr-focus flex flex-col items-center gap-1 rounded-md py-2 text-caption {{ $id === $activa ? 'text-ink' : 'text-ink-muted' }} hover:text-ink">
                    <x-icon :name="$icono" /><span class="normal-case tracking-normal">{{ $texto }}</span>
                </a>
            </li>
        @endforeach
    </ul>
@else
    <ul class="flex flex-col gap-1">
        @foreach ($secciones as [$id, $texto, $url, $icono])
            <li>
                <a href="{{ $url }}" class="snr-nav-link" @if ($id === $activa) aria-current="page" @endif>
                    <x-icon :name="$icono" /><span>{{ $texto }}</span>
                </a>
            </li>
        @endforeach
    </ul>
@endif
