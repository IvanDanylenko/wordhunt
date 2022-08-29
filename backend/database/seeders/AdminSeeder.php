<?php

namespace Database\Seeders;

use App\Models\Users\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::factory()->create(['email' => Admin::DEFAULT_EMAIL]);
    }
}
