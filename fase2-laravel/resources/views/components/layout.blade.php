{{-- Estructura común de todas las pantallas --}}
@props(['titulo', 'pagina', 'activa' => null, 'conBarra' => true])
<!doctype html>
<html lang="es" data-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $titulo }} · Sonora</title>
    <link rel="icon" href="{{ asset('logos/sonora-mark-dark.svg') }}" type="image/svg+xml">
    {{-- Aplica el tema guardado antes de pintar para evitar un destello --}}
    <script>try { document.documentElement.dataset.theme = localStorage.getItem('sonora-tema') || 'dark'; } catch (e) {}</script>
    <script>window.sonora = @json($catalogo);</script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-dvh" data-pagina="{{ $pagina }}">
    <a href="#contenido" class="snr-btn-secondary sr-only bg-surface-raised focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">Saltar al contenido</a>

    <div class="md:grid md:grid-cols-[240px_1fr]">
        <aside class="sticky top-0 hidden h-dvh border-r border-line bg-surface-raised pb-24 md:block">
            <div class="flex h-full flex-col gap-6 p-4">
                <div class="px-3 pt-2"><x-logo /></div>
                <nav aria-label="Principal"><x-nav :activa="$activa" /></nav>
                <div class="mt-auto"><x-button variant="ghost" class="w-full justify-start" data-tema>Usar tema claro</x-button></div>
            </div>
        </aside>

        <div class="min-w-0">
            <header class="flex items-center justify-between px-4 pt-4 md:hidden">
                <x-logo />
                <x-button variant="ghost" class="px-3 py-2" data-tema data-corto>Tema claro</x-button>
            </header>
            <main id="contenido" tabindex="-1" class="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-44 pt-6 focus:outline-none md:px-8 md:pb-32 md:pt-8">
                {{ $slot }}
            </main>
        </div>
    </div>

    @if ($conBarra)
        <x-player-bar />
    @endif
    <nav aria-label="Principal" class="fixed inset-x-0 bottom-0 z-20 h-16 border-t border-line bg-surface-raised md:hidden">
        <x-nav :activa="$activa" movil />
    </nav>
    <p id="aviso" class="sr-only" aria-live="polite"></p>
</body>
</html>
