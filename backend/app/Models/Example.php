<?php

namespace App\Models;

use App\Models\Base\Model;

class Example extends Model
{
    protected $fillable = [
        'name',
        'translation',
        'score',
    ];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
