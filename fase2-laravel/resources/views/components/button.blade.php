{{-- Botón de Sonora: <x-button variant="secondary">Seguir</x-button>. Con href se vuelve enlace. --}}
@props(['variant' => 'primary', 'href' => null])
@php
    $clase = ['primary' => 'snr-btn-primary', 'secondary' => 'snr-btn-secondary', 'ghost' => 'snr-btn-ghost'][$variant];
@endphp
@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $clase]) }}>{{ $slot }}</a>
@else
    <button {{ $attributes->merge(['type' => 'button', 'class' => $clase]) }}>{{ $slot }}</button>
@endif
