{{-- Barra deslizable accesible (progreso o volumen). El JavaScript la conecta por su id. --}}
@props(['id', 'etiqueta'])
<div id="{{ $id }}" role="slider" tabindex="0" aria-label="{{ $etiqueta }}" aria-valuemin="0"
    {{ $attributes->merge(['class' => 'snr-focus flex cursor-pointer items-center rounded-pill py-2']) }}>
    <div class="snr-track"><div class="snr-fill" style="width: 0%"></div></div>
</div>
