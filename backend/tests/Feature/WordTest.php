<?php

namespace Tests\Feature;

use App\Models\Example;
use App\Models\Translation;
use App\Models\Users\Admin;
use App\Models\Word;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WordTest extends TestCase
{
    use RefreshDatabase;

    public function testCRUDForAdmin()
    {
        Admin::factory()->create();

        $this->actingAs(Admin::first(), 'admin');

        $word = Word::factory()->make()->toArray();

        $translations = Translation::factory(3)->make()->toArray();
        $examples = Example::factory(3)->make()->toArray();

        // Check validation for translations
        $response = $this->postJson(route('admin.words.store'), $word);
        $response->assertUnprocessable();

        // Creating a new word
        $word['translations'] = $translations;
        $word['examples'] = $examples;
        $response = $this->postJson(route('admin.words.store'), $word);
        $response->assertCreated();

        $responseData = $response->offsetGet('data');

        $this->assertDatabaseHas('words', ['id' => $responseData['id']]);

        $this->assertDatabaseHas('translations', ['word_id' => $responseData['id']]);
        $this->assertDatabaseCount('translations', 3);

        $this->assertDatabaseHas('examples', ['word_id' => $responseData['id']]);
        $this->assertDatabaseCount('examples', 3);

        // Updating existing word
        $response = $this->putJson(route('admin.words.update', ['word' => $responseData['id']]), array_merge($word, ['name' => 'My word']));
        $response->assertOk();

        $this->assertDatabaseHas('words', ['name' => 'My word']);

        // Deleting existing word
        $response = $this->deleteJson(route('admin.words.destroy', ['word' => $responseData['id']]));
        $response->assertOk();
        $this->assertDatabaseMissing('words', ['id' => $responseData['id']]);
        $this->assertDatabaseMissing('translations', ['word_id' => $responseData['id']]);
        $this->assertDatabaseMissing('examples', ['word_id' => $responseData['id']]);
    }
}
