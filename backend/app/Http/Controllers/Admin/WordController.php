<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreWordRequest;
use App\Http\Resources\Admin\WordResource;
use App\Models\Example;
use App\Models\Translation;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = Word::with('translations', 'examples');
        return WordResource::collection($query->paginate(request('per_page')));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWordRequest $request)
    {
        DB::beginTransaction();
        $word = new Word($request->only('name', 'pinin', 'score'));
        $word->save();

        $word->translations()->createMany($request->translations);

        if ($request->examples) {
            $word->examples()->createMany($request->examples);
        }

        DB::commit();

        return (new WordResource($word->with('translations', 'examples')->first()))
            ->response()
            ->setStatusCode(201);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreWordRequest $request, $id)
    {
        DB::beginTransaction();

        $word = Word::find($id);
        $word->update($request->only('name', 'pinin', 'score'));

        // Delete from database previous translations and examples
        Translation::destroy(array_column($word->translations->all(), 'id'));
        Example::destroy(array_column($word->examples->all(), 'id'));

        $word22 = Word::with('translations')->find($id)->toArray();

        $word->translations()->createMany($request->translations);

        if ($request->examples) {
            $word->examples()->createMany($request->examples);
        }

        DB::commit();

        return new WordResource($word->with('translations', 'examples')->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        $word = Word::with('translations', 'examples')->find($id);

        Translation::destroy(array_column($word->translations->all(), 'id'));
        Example::destroy(array_column($word->examples->all(), 'id'));

        $word->delete();

        DB::commit();

        return response()->json(['status' => true]);
    }
}
