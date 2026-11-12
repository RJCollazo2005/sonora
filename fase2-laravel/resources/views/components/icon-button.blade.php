{{-- Botón de solo icono: siempre necesita una etiqueta accesible --}}
@props(['icono', 'etiqueta'])
<button type="button" aria-label="{{ $etiqueta }}" {{ $attributes->merge(['class' => 'snr-icon-btn']) }}>
    <x-icon :name="$icono" class="size-5" />
</button>
