<?php

namespace App\Models\Users;

use App\Models\Word;

class Client extends User
{
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function words()
    {
        return $this->belongsToMany(Word::class)->withPivot(['level', 'status', 'word_increased_level_at'])->withTimestamps();
    }
}
