<?php

namespace Database\Seeders;

use App\Models\Example;
use App\Models\Translation;
use App\Models\Word;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Word::factory(50)->has(Example::factory(2))->has(Translation::factory(5))->create();
    }
}
