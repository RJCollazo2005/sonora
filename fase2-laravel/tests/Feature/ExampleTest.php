<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    public function test_las_pantallas_responden(): void
    {
        $this->withoutVite();

        foreach (['/', '/playlists/manana-tranquila', '/albumes/otono-largo', '/reproductor', '/buscar?q=cafe', '/biblioteca'] as $url) {
            $this->get($url)->assertOk();
        }

        $this->get('/playlists/no-existe')->assertNotFound();
    }

    public function test_buscar_ignora_mayusculas_y_acentos(): void
    {
        $this->withoutVite();

        $this->get('/buscar?q=nube')->assertOk()->assertSee('2 canciones y 1 colección');
        $this->get('/buscar?q=cafe')->assertOk()->assertSee('1 canción y 0 colecciones');
        $this->get('/buscar?q=zzz')->assertOk()->assertSee('No encontramos nada');
    }
}
