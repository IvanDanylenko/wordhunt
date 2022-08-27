<?php

namespace App\Models;

use App\Models\Base\Model;

class Translation extends Model
{
    const PART_OF_SPEECH_NOUN = 'noun';
    const PART_OF_SPEECH_PRONOUN = 'pronoun';
    const PART_OF_SPEECH_VERB = 'verb';
    const PART_OF_SPEECH_AUXILIARY_VERB = 'auxiliary_verb';
    const PART_OF_SPEECH_ADJECTIVE = 'adjective';
    const PART_OF_SPEECH_ADVERB = 'adverb';
    const PART_OF_SPEECH_NUMBER_WORD = 'number_word';
    const PART_OF_SPEECH_MEASURE_WORD = 'measure_word';
    const PART_OF_SPEECH_INTERJECTION = 'interjection';
    const PART_OF_SPEECH_ONOMATOPOEIA = 'onomatopoeia';
    const PART_OF_SPEECH_CONJUNCTION = 'conjunction';
    const PART_OF_SPEECH_PREPOSITION = 'preposition';
    const PART_OF_SPEECH_PARTICLE = 'particle';

    public static function getPartsOfSpeech(): array
    {
        return [
            self::PART_OF_SPEECH_NOUN,
            self::PART_OF_SPEECH_PRONOUN,
            self::PART_OF_SPEECH_VERB,
            self::PART_OF_SPEECH_AUXILIARY_VERB,
            self::PART_OF_SPEECH_ADJECTIVE,
            self::PART_OF_SPEECH_ADVERB,
            self::PART_OF_SPEECH_NUMBER_WORD,
            self::PART_OF_SPEECH_MEASURE_WORD,
            self::PART_OF_SPEECH_INTERJECTION,
            self::PART_OF_SPEECH_ONOMATOPOEIA,
            self::PART_OF_SPEECH_CONJUNCTION,
            self::PART_OF_SPEECH_PREPOSITION,
            self::PART_OF_SPEECH_PARTICLE,
        ];
    }

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
