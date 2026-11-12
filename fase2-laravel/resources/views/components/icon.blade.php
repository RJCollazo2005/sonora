{{-- Icono oficial de Sonora (resources/icons). Toma el color del texto con currentColor. --}}
@props(['name'])
@php
    $svg = file_get_contents(resource_path("icons/{$name}.svg"));
    $interior = preg_replace('/^.*?<svg[^>]*>|<\/svg>\s*$/s', '', $svg);
@endphp
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" {{ $attributes->merge(['class' => 'size-6 shrink-0']) }}>{!! $interior !!}</svg>
