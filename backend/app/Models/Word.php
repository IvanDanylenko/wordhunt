<?php

namespace App\Models;

use App\Models\Base\Model;
use App\Models\Users\Client;

class Word extends Model
{
    const STATUS_NEW = 'new';
    const STATUS_PAUSED = 'paused';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_LEARNED = 'learned';
    const STATUS_SKIPPED = 'skipped';

    public static function getStatuses(): array
    {
        return [
            self::STATUS_NEW,
            self::STATUS_PAUSED,
            self::STATUS_IN_PROGRESS,
            self::STATUS_LEARNED,
            self::STATUS_SKIPPED,
        ];
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class)->withPivot(['level', 'status', 'word_increased_level_at'])->withTimestamps();
    }

    public function translations()
    {
        return $this->hasMany(Translation::class);
    }

    public function examples()
    {
        return $this->hasMany(Example::class);
    }
}
