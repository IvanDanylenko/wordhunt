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
            }
            else {
                $query = $client->words()->wherePivot('status', $filter['status']);
            }
        }
        else {
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
        }
        else {
            $newLevel = 6;
            $newStatus = WordStatus::Learned->value;
        }

        $client->words()->updateExistingPivot($id, [
            'level' => $newLevel,
            'status' => $newStatus,
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

        $attributes = ['status' => WordStatus::InProgress->value];

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
}