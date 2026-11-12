{{-- Barra del reproductor: siempre visible abajo (menos en la pantalla Reproductor) --}}
<div id="barra-reproductor" role="region" aria-label="Reproductor"
    class="fixed inset-x-0 bottom-16 z-20 border-t border-line bg-surface-raised md:bottom-0">
    <div class="mx-auto grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 md:grid-cols-[1fr_minmax(0,560px)_1fr] md:gap-6 md:py-3">
        <div class="flex min-w-0 items-center gap-3">
            <a href="{{ route('reproductor') }}" class="snr-focus flex min-w-0 items-center gap-3 rounded-md" aria-label="Abrir el reproductor">
                <span id="b-portada" class="block size-12 shrink-0"></span>
                <span class="min-w-0">
                    <span id="b-titulo" class="block truncate text-body-sm font-bold text-ink"></span>
                    <span id="b-artista" class="block truncate text-body-sm text-ink-muted"></span>
                </span>
            </a>
            <x-icon-button id="b-gusta" icono="heart" etiqueta="Me gusta" aria-pressed="false" class="hidden md:inline-flex" />
        </div>

        <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-2">
                <x-icon-button id="b-aleatorio" icono="shuffle" etiqueta="Aleatorio" aria-pressed="false" class="hidden md:inline-flex" />
                <x-icon-button id="b-anterior" icono="skip-prev" etiqueta="Anterior" class="hidden md:inline-flex" />
                <x-play-button id="b-play" />
                <x-icon-button id="b-siguiente" icono="skip-next" etiqueta="Siguiente" />
            </div>
            <div class="hidden w-full items-center gap-3 md:flex">
                <span id="b-t" class="w-12 text-right font-mono text-mono-sm text-ink-muted">00:00</span>
                <x-slider id="b-progreso" etiqueta="Progreso de la canción" class="flex-1" />
                <span id="b-dur" class="w-12 font-mono text-mono-sm text-ink-muted">00:00</span>
            </div>
        </div>

        <div class="hidden items-center justify-end gap-2 md:flex">
            <span class="text-ink-muted"><x-icon name="volume" class="size-5" /></span>
            <x-slider id="b-volumen" etiqueta="Volumen" class="w-28" />
        </div>
    </div>
    <div class="snr-track md:hidden" aria-hidden="true"><div id="b-progreso-movil" class="snr-fill" style="width: 0%"></div></div>
</div>
