<?php

namespace App\Enums;

enum WordStatus: string {
    case New = 'new';
    case Paused = 'paused';
    case InProgress = 'in_progress';
    case Learned = 'learned';
    case Skipped = 'skipped';

    public static function values(): array
    {
       return array_column(self::cases(), 'value');
    }
}
