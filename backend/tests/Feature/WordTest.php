<?php

namespace Tests\Feature;

use App\Enums\WordStatus;
use App\Models\Example;
use App\Models\Translation;
use App\Models\Users\Admin;
use App\Models\Users\Client;
use App\Models\Word;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class WordTest extends TestCase
{
    use RefreshDatabase;

    public function testCrudForAdmin()
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

    public function testWordChangesStatuses()
    {
        /** @var Client */
        $client = Client::factory()->create();

        $this->actingAs($client, 'client');

        $words = Word::factory(2)->create();

        $response = $this->postJson(route('client.words.changeStatusNew'), ['ids' => [$words[0]->id]]);
        $response->assertOk();

        $this->assertDatabaseHas('client_word', [
            'client_id' => $client->id,
            'word_id' => $words[0]->id,
            'status' => WordStatus::NewWord->value,
            'level' => 0,
            'word_increased_level_at' => null,
        ]);
        $this->assertDatabaseCount('client_word', 1);

        $response = $this->postJson(route('client.words.changeStatusInProgress'), ['ids' => [$words[0]->id]]);
        $response->assertOk();

        $response = $this->getJson(route('client.words.index', ['filter' => json_encode(['status' => WordStatus::InProgress->value])]));

        $response->assertJson(function (AssertableJson $json) use ($words) {
            $json->has('data', 1)
                ->etc();
            $array = $json->toArray();
            $this->assertEquals($words[0]->id, $array['data'][0]['id']);
        }
        );

        $response = $this->postJson(route('client.words.changeStatusSkipped'), ['ids' => [$words[0]->id]]);
        $response->assertOk();

        $this->assertDatabaseHas('client_word', [
            'client_id' => $client->id,
            'word_id' => $words[0]->id,
            'status' => WordStatus::Skipped->value,
            'level' => 0,
            'word_increased_level_at' => null,
        ]);
    }

    public function testWordCannotIncreaseLevelWhenInWrongStatus()
    {
        /** @var Client */
        $client = Client::factory()->create();

        $this->actingAs($client, 'client');

        /** @var Word */
        $word = Word::factory()->create();

        $response = $this->postJson(route('client.words.increaseLevel', ['id' => $word->id]));
        $response->assertNotFound();

        $response = $this->postJson(route('client.words.changeStatusSkipped'), ['ids' => [$word->id]]);

        $this->assertDatabaseHas('client_word', ['word_id' => $word->id, 'status' => WordStatus::Skipped->value]);
        $response->assertOk();

        $response = $this->postJson(route('client.words.increaseLevel', ['id' => $word->id]));
        // Word can't increase level in status skipped
        $response->assertUnprocessable();
    }

    public function testWordIncreasesLevel()
    {
        /** @var Client */
        $client = Client::factory()->create();

        $this->actingAs($client, 'client');

        /** @var Word */
        $word = Word::factory()->create();

        $response = $this->postJson(route('client.words.changeStatusNew'), ['ids' => [$word->id]]);

        $this->assertDatabaseHas('client_word', ['word_id' => $word->id, 'status' => WordStatus::NewWord->value]);

        $response = $this->postJson(route('client.words.increaseLevel', ['id' => $word->id]));

        $this->assertDatabaseHas('client_word', ['word_id' => $word->id, 'status' => WordStatus::InProgress->value, 'level' => 1]);
        $response->assertOk();
    }

    public function testWordFiltersByUnknownStatus()
    {
        $attachedWord = Word::factory()->create();
        /** @var Client */
        $client = Client::factory()->hasAttached([$attachedWord], ['level' => 0, 'status' => WordStatus::NewWord->value])->create();

        $this->actingAs($client, 'client');

        /** @var Word */
        $word = Word::factory()->create();

        $this->assertDatabaseCount('words', 2);

        $response = $this->getJson(route('client.words.index', ['filter' => json_encode(['status' => WordStatus::Unknown->value])]));

        $response->assertOk();
        $response->assertJson(function (AssertableJson $json) use ($word) {
            $json->has('data', 1)
                ->etc();
            $array = $json->toArray();
            $this->assertEquals($word->id, $array['data'][0]['id']);
        }
        );

    }

    public function test_word_dissapears_from_exercises_if_it_not_active()
    {
        $word = Word::factory()->create();
        /** @var Client */
        $client = Client::factory()->hasAttached([$word], ['level' => 0, 'status' => WordStatus::NewWord->value, 'is_active' => 1])->create();

        $this->actingAs($client, 'client');

        $response = $this->postJson(route('client.words.increaseLevel', ['id' => $word->id]));
        $response->assertOk();

        $this->assertDatabaseHas('client_word', ['word_id' => $word->id, 'is_active' => 0]);

        $response = $this->getJson(route('client.words.index', ['filter' => json_encode(['status' => WordStatus::InProgress->value])]));

        $response->assertJson(function (AssertableJson $json) {
            $json->has('data', 0)
                ->etc();
        }
        );

    }
}