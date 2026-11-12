<?php

namespace App\Support;

class Tiempo
{
    /** 258 → "04:18" */
    public static function formato(int $segundos): string
    {
        return sprintf('%02d:%02d', intdiv($segundos, 60), $segundos % 60);
    }

    /** Duración de una lista: "1:12:48" o "32:10" */
    public static function total(int $segundos): string
    {
        $h = intdiv($segundos, 3600);

        return $h
            ? sprintf('%d:%02d:%02d', $h, intdiv($segundos % 3600, 60), $segundos % 60)
            : self::formato($segundos);
    }
}
