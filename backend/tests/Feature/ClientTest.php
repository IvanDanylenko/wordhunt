<?php

namespace Tests\Feature;

use App\Enums\WordStatus;
use App\Models\Translation;
use App\Models\Users\Admin;
use App\Models\Users\Client;
use App\Models\Word;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    public function testWordStatistics()
    {
        Admin::factory()->create();

        $this->actingAs(Admin::first(), 'admin');

        $word = Word::factory()->has(Translation::factory())->create();

        $client = Client::factory()->hasAttached($word, [
            'level' => 2,
            'status' => WordStatus::InProgress->value,
            'word_increased_level_at' => now(),
        ])->create();

        $response = $this->getJson(route('admin.clients.show', ['client' => $client->id]));
        $response->assertOk();

        $responseData = $response->offsetGet('data');

        // Assert that we have one word on second level
        $this->assertEquals(1, $responseData['word_statistics'][2]['count']);
        $this->assertEquals(2, $responseData['word_statistics'][2]['level']);
    }
}
