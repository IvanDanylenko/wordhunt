<?php

namespace App\Models;

use App\Models\Base\Model;

class Example extends Model
{
    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
