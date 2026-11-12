<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\BuscarController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\PlaylistController;
use Illuminate\Support\Facades\Route;

Route::get('/', InicioController::class)->name('inicio');
Route::get('/playlists/{playlist}', [PlaylistController::class, 'show'])->name('playlists.show');
Route::get('/albumes/{album}', [AlbumController::class, 'show'])->name('albumes.show');
Route::get('/buscar', BuscarController::class)->name('buscar');

// La cola, "me gusta" y lo guardado viven en el navegador (localStorage),
// así que estas dos pantallas se arman con JavaScript a partir del catálogo.
Route::view('/reproductor', 'reproductor')->name('reproductor');
Route::view('/biblioteca', 'biblioteca')->name('biblioteca');
