<?php

namespace Database\Seeders;

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

        Client::factory(5)->hasAttached($words, ['level' => 0, 'status' => Word::STATUS_NEW])->create();
    }
}
