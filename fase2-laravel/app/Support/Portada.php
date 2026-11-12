<?php

namespace App\Support;

/**
 * Marcador de portada: como no hay imágenes, cada colección muestra
 * cinco barras de ecualizador cuya altura sale de su nombre (siempre la misma).
 */
class Portada
{
    public static function barras(string $semilla): array
    {
        $h = 0;
        foreach (mb_str_split($semilla) as $letra) {
            $h = ($h * 31 + mb_ord($letra)) & 0xFFFFFFFF;
        }

        return array_map(fn ($k) => 35 + (($h >> ($k * 5)) % 60), range(0, 4));
    }
}
