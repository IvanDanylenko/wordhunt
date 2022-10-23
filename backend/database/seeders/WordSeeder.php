<?php

namespace Database\Seeders;

use App\Enums\PartOfSpeech;
use App\Models\Word;
use Illuminate\Database\Seeder;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reader = new Xlsx();

        $spreadsheet = $reader->load(storage_path('/chinese_words.xlsx'));

        $sheetData = $spreadsheet->getSheet(0)->toArray();
        // Remove headers row
        $sheetData = array_slice($sheetData, 1);

        foreach ($sheetData as $row) {
            if (!$row[1]) {
                // break cycle when word name is empty
                break;
            }

            $word = new Word([
                'name' => $row[1],
                'score' => 3001 - $row[0],
            ]);

            $word->save();

            $word->translations()->create([
                'name' => $row[3],
                'word_transcription' => $row[2],
                'part_of_speech' => PartOfSpeech::Noun->value,
                'score' => 0,
            ]);

            if ($row[4]) {
                $word->examples()->create([
                    'name' => $row[4],
                    'translation' => $row[5],
                    'score' => 0,
                ]);
            }
        }
    }
}