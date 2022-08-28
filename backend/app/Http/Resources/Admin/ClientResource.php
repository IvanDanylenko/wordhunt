<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'word_statistics' => $this->getWordStatistics(),
            'last_active_at' => $this->getLastActiveAt(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    public function getLastActiveAt()
    {
        $lastUpdatedWord = $this->words()->orderByPivot('updated_at', 'DESC')->first();
        return $lastUpdatedWord ? $lastUpdatedWord->updated_at : null;
    }

    public function getWordStatistics()
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
