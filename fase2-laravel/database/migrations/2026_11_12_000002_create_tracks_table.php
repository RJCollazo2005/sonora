<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('artista');
            $table->foreignId('album_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('duracion'); // en segundos
            $table->string('portada')->nullable(); // opcional: ruta de una imagen
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracks');
    }
};
