<?php

use App\Enums\WordStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_word', function (Blueprint $table) {
            $table->uuid('client_id');
            $table->uuid('word_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('word_id')->references('id')->on('words');
            $table->tinyInteger('level')->unsigned();
            $table->enum('status', WordStatus::values());
            $table->timestamp('word_increased_level_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_word');
    }
};
