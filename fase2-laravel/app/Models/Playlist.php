<?php

namespace App\Models;

use App\Support\Portada;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    protected $fillable = ['nombre', 'slug', 'descripcion'];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class)->withPivot('posicion')->orderByPivot('posicion');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function duracionTotal(): int
    {
        return (int) $this->tracks->sum('duracion');
    }

    public function barras(): array
    {
        return Portada::barras($this->slug);
    }
}
