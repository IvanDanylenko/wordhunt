<?php

namespace App\Models;

use App\Models\Base\Model;

class Translation extends Model
{
    protected $fillable = [
        'name',
        'part_of_speech',
        'score',
        'description',
        'tag',
    ];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
