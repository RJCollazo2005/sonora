<?php

namespace App\Models;

use App\Support\Portada;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    protected $fillable = ['nombre', 'slug', 'artista'];

    public function tracks(): HasMany
    {
        return $this->hasMany(Track::class)->orderBy('id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /** Duración total en segundos */
    public function duracionTotal(): int
    {
        return (int) $this->tracks->sum('duracion');
    }

    /** Alturas de las barras del marcador de portada */
    public function barras(): array
    {
        return Portada::barras($this->nombre);
    }
}
