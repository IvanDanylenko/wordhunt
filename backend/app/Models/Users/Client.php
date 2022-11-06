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
        $level0 = $this->words()->wherePivot('level', 0)->wherePivot('status', 'in_progress')->count();
        $level1 = $this->words()->wherePivot('level', 1)->wherePivot('status', 'in_progress')->count();
        $level2 = $this->words()->wherePivot('level', 2)->wherePivot('status', 'in_progress')->count();
        $level3 = $this->words()->wherePivot('level', 3)->wherePivot('status', 'in_progress')->count();
        $level4 = $this->words()->wherePivot('level', 4)->wherePivot('status', 'in_progress')->count();
        $level5 = $this->words()->wherePivot('level', 5)->wherePivot('status', 'in_progress')->count();
        $level6 = $this->words()->wherePivot('level', 6)->wherePivot('status', 'learned')->count();

        return [
            [
                'level' => 0,
                'count' => $level0,
            ],
            [
                'level' => 1,
                'count' => $level1,
            ],
            [
                'level' => 2,
                'count' => $level2,
            ],
            [
                'level' => 3,
                'count' => $level3,
            ],
            [
                'level' => 4,
                'count' => $level4,
            ],
            [
                'level' => 5,
                'count' => $level5,
            ],
            [
                'level' => 6,
                'count' => $level6,
            ],
        ];
    }
}