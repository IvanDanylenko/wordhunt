<?php

namespace App\Http\Requests\Admin;

use App\Enums\PartOfSpeech;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreWordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:100', 'unique:words'],
            'pinin' => ['required', 'string', 'max:100'],
            'score' => ['nullable', 'numeric'],
            'translations' => ['required', 'array'],
            'translations.*.name' => ['required', 'string', 'max:255'],
            'translations.*.part_of_speech' => ['required', new Enum(PartOfSpeech::class)],
            'translations.*.score' => ['nullable'],
            'translations.*.description' => ['nullable', 'string', 'max:255'],
            'translations.*.tag' => ['nullable', 'string', 'max:255'],
            'examples' => ['array'],
            'examples.*.name' => ['required', 'string', 'max:1000'],
            'examples.*.translation' => ['required', 'string', 'max:1000'],
            'examples.*.score' => ['nullable', 'numeric'],
        ];
    }
}
