<?php

namespace Database\Factories;

use App\Models\Word;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Example>
 */
class ExampleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'word_id' => Word::factory(),
            'name' => fake()->text(),
            'translation' => fake()->text(),
            'score' => fake()->numberBetween(0, 255),
        ];

    }
}
