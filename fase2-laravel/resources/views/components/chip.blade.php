@props(['activo' => false])
<button type="button" aria-pressed="{{ $activo ? 'true' : 'false' }}" {{ $attributes->merge(['class' => 'snr-chip']) }}>{{ $slot }}</button>
