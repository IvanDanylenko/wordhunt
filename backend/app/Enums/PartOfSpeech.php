<?php

namespace App\Enums;

enum PartOfSpeech: string {
    // TODO: write a description for each part of speech
    case Noun = 'noun';
    case Verb = 'verb';
    case AuxiliaryVerb = 'auxiliary_verb';
    case Adjective = 'adjective';
    case Adverb = 'adverb';
    case NumberWord = 'number_word';
    case MeasureWord = 'measure_word';
    case Interjection = 'interjection';
    case Onomatopoeia = 'onomatopoeia';
    case Conjunction = 'conjunction';
    case Preposition = 'preposition';
    case Particle = 'particle';

    public static function values(): array
    {
       return array_column(self::cases(), 'value');
    }
}
