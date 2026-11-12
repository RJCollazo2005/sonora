{{-- Marcador de portada: superficie surface-high con barras de ecualizador (no hay imágenes reales) --}}
@props(['barras'])
<div {{ $attributes->merge(['class' => 'snr-cover']) }} aria-hidden="true">
    @foreach ($barras as $altura)
        <span style="height: {{ $altura }}%"></span>
    @endforeach
</div>
