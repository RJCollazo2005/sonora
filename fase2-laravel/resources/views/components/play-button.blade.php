{{-- Botón ámbar de reproducir/pausar: lleva los dos iconos y el JavaScript alterna cuál se ve --}}
@props(['id', 'tam' => 'size-6'])
<button type="button" id="{{ $id }}" aria-label="Reproducir" {{ $attributes->merge(['class' => 'snr-play']) }}>
    <x-icon name="play" class="{{ $tam }}" data-icono-play />
    <x-icon name="pause" class="{{ $tam }} hidden" data-icono-pausa />
</button>
