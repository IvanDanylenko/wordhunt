<?php

namespace Database\Factories;

use App\Enums\PartOfSpeech;
use App\Models\Translation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Translation>
 */
class TranslationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'word_transcription' => fake()->word(),
            'name' => fake()->word(),
            'part_of_speech' => fake()->randomElement(PartOfSpeech::values()),
            'score' => fake()->numberBetween(0, 255),
            'description' => fake()->text(),
            'tag' => fake()->word(),
        ];
    }
}