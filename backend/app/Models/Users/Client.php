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

    public function getLastActiveAtAttribute()
    {
        $lastUpdatedWord = $this->words()->orderByPivot('updated_at', 'DESC')->first();
        return $lastUpdatedWord ? $lastUpdatedWord->updated_at : null;
    }

    public function getWordStatisticsAttribute()
    {
        $level0 = $this->words()->wherePivot('level', 0)->get();
        $level1 = $this->words()->wherePivot('level', 1)->get();
        $level2 = $this->words()->wherePivot('level', 2)->get();
        $level3 = $this->words()->wherePivot('level', 3)->get();
        $level4 = $this->words()->wherePivot('level', 4)->get();
        $level5 = $this->words()->wherePivot('level', 5)->get();
        $level6 = $this->words()->wherePivot('level', 6)->get();

        return [
            [
                'level' => 0,
                'count' => count($level0),
            ],
            [
                'level' => 1,
                'count' => count($level1),
            ],
            [
                'level' => 2,
                'count' => count($level2),
            ],
            [
                'level' => 3,
                'count' => count($level3),
            ],
            [
                'level' => 4,
                'count' => count($level4),
            ],
            [
                'level' => 5,
                'count' => count($level5),
            ],
            [
                'level' => 6,
                'count' => count($level6),
            ],
        ];
    }
}
