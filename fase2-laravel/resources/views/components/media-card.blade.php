{{-- Tarjeta de medio: portada, título, subtítulo (artista o tipo) y duración --}}
@props(['href', 'titulo', 'subtitulo', 'duracion' => null, 'barras'])
<a href="{{ $href }}" {{ $attributes->merge(['class' => 'snr-card group']) }}>
    <x-portada :barras="$barras" />
    <p class="mt-4 truncate text-heading text-ink">{{ $titulo }}</p>
    <p class="truncate text-body-sm text-ink-muted">{{ $subtitulo }}</p>
    @if ($duracion)
        <p class="mt-1 font-mono text-mono-sm text-ink-muted">{{ $duracion }}</p>
    @endif
</a>
