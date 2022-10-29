<?php

namespace App\Http\Controllers\Client;

use App\Enums\WordStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ChangeStatusWordRequest;
use App\Http\Resources\Client\WordResource;
use App\Models\Users\Client;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     * TODO: REFACTOR!!!
     */
    public function index(Request $request)
    {
        $filter = $request->input('filter', []);

        if (is_string($filter)) {
            $filter = json_decode($filter, true);
        }

        if (isset($filter['status'])) {
            /** @var Client */
            $client = auth()->user();

            if ($filter['status'] === WordStatus::Unknown->value) {
                $relatedWords = $client->words()->get(['id'])->toArray();
                $relatedWordIds = array_map(function ($item) {
                    return $item['id'];
                }, $relatedWords);
                $query = Word::with('translations', 'examples')->whereNotIn('id', $relatedWordIds);
            } else {
                $query = $client->words()->with('translations', 'examples')
                    ->wherePivot('status', $filter['status']);
            }

            if ($filter['status'] === WordStatus::InProgress->value) {
                $query->wherePivot('is_active', 1)->inRandomOrder();
            }
        } else {
            $query = Word::with('translations', 'examples');
        }

        return WordResource::collection($query->paginate(request('per_page')));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new WordResource(Word::with('translations', 'examples')->find($id));
    }

    public function increaseLevel($id)
    {
        /** @var Client */
        $client = auth()->user();
        $pivot = $client->words()->wherePivot('word_id', $id)->firstOrFail()->pivot;

        if (
            $pivot->status === WordStatus::Learned->value ||
            $pivot->status === WordStatus::Skipped->value ||
            $pivot->status === WordStatus::Paused->value
        ) {
            return response()->json(['message' => 'Word cannot increase level'], 422);
        }

        if ($pivot->level < 5) {
            $newLevel = $pivot->level + 1;
            $newStatus = WordStatus::InProgress->value;
        } else {
            $newLevel = 6;
            $newStatus = WordStatus::Learned->value;
        }

        $client->words()->updateExistingPivot($id, [
            'level' => $newLevel,
            'status' => $newStatus,
            'is_active' => 0,
            'word_increased_level_at' => now(),
        ]);

        return ['status' => true];
    }

    public function changeStatusNew(ChangeStatusWordRequest $request)
    {
        /** @var Client */
        $client = auth()->user();
        $ids = $request->input('ids');

        $attributes = ['level' => 0, 'status' => WordStatus::NewWord->value];

        foreach ($ids as $id) {
            $isRelationExist = $client->words()->find($id);
            $isRelationExist ? $client->words()->updateExistingPivot($id, $attributes) : $client->words()->attach($id, $attributes);
        }

        return ['status' => true];
    }

    public function changeStatusInProgress(ChangeStatusWordRequest $request)
    {
        /** @var Client */
        $client = auth()->user();
        $ids = $request->input('ids');

        $attributes = ['status' => WordStatus::InProgress->value, 'is_active' => 1];

        foreach ($ids as $id) {
            $client->words()->updateExistingPivot($id, $attributes);
        }

        return ['status' => true];
    }

    public function changeStatusSkipped(ChangeStatusWordRequest $request)
    {
        /** @var Client */
        $client = auth()->user();
        $ids = $request->input('ids');

        $attributes = ['status' => WordStatus::Skipped->value];

        foreach ($ids as $id) {
            $isRelationExist = $client->words()->find($id);
            $isRelationExist ? $client->words()->updateExistingPivot($id, $attributes) : $client->words()->attach($id, array_merge($attributes, ['level' => 0]));
        }

        return ['status' => true];
    }

    public function returnWordsToExercises()
    {
        /** @var Client */
        $client = auth()->user();

        $intervals = [
            '1' => now()->subDay(),
            '2' => now()->subDays(3),
            '3' => now()->subDays(7),
            '4' => now()->subDays(21),
            '5' => now()->subDays(40),
        ];

        foreach ($intervals as $level => $time) {
            // Get all words that match conditions
            $words = $client->words()
                ->wherePivot('is_active', 0)
                ->wherePivot('level', $level)
                ->wherePivot('word_increased_level_at', '<', $time)
                ->get();

            // Make words active
            foreach ($words as $word) {
                $client->words()->updateExistingPivot($word->id, ['is_active' => 1]);
            }
        }

        return ['status' => true];
    }
}