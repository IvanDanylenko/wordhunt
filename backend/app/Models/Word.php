<?php

namespace App\Models;

use App\Models\Base\Model;
use App\Models\Users\Client;

class Word extends Model
{
    protected $fillable = [
        'name',
        'score',
    ];

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