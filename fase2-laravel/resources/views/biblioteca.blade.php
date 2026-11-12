{{-- Tu biblioteca: lo guardado y los "me gusta" viven en el navegador, JavaScript los pinta --}}
<x-layout titulo="Tu biblioteca" pagina="biblioteca" activa="biblioteca">
    <div class="flex flex-col gap-4">
        <h1 class="text-title md:text-display">Tu biblioteca</h1>
        <div id="filtros" role="group" aria-label="Elegir qué mostrar" class="flex flex-wrap gap-2">
            <x-chip activo data-vista="guardadas">Guardadas</x-chip>
            <x-chip data-vista="megusta">Me gusta</x-chip>
        </div>
    </div>
    <div id="biblioteca" class="flex flex-col items-start"></div>
</x-layout>
