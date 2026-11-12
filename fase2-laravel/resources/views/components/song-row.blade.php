{{-- Fila de canción: número, título, artista y duración. aria-current marca la que suena. --}}
@props(['numero', 'track', 'actual' => false])
<li>
    <button type="button" class="snr-row" aria-current="{{ $actual ? 'true' : 'false' }}"
        aria-label="Reproducir {{ $track->titulo }}, de {{ $track->artista }}" {{ $attributes }}>
        <span class="font-mono text-mono-sm text-ink-muted" data-numero>{{ str_pad($numero, 2, '0', STR_PAD_LEFT) }}</span>
        <span class="min-w-0">
            <span class="block truncate text-body-sm font-bold text-ink">{{ $track->titulo }}</span>
            <span class="block truncate text-body-sm text-ink-muted">{{ $track->artista }}</span>
        </span>
        <span class="font-mono text-mono-sm text-ink-muted">{{ \App\Support\Tiempo::formato($track->duracion) }}</span>
    </button>
</li>
