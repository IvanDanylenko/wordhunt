<?php

namespace Database\Seeders;

use App\Enums\WordStatus;
use App\Models\Users\Admin;
use App\Models\Users\Client;
use App\Models\Word;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $words = Word::get();

        Client::factory(1)
            ->hasAttached($words, ['level' => 0, 'status' => WordStatus::NewWord->value, 'is_active' => 1])
            ->create(['email' => Admin::DEFAULT_EMAIL]);
    }
}