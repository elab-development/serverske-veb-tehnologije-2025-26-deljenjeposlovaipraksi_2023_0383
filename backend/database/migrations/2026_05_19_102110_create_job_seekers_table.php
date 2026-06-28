<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_seekers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id'); //dodavanje spoljnog kljuca
            $table->string('firstName');
            $table->string('lastName');
            $table->enum('education', [
                'osnovna_skola',
                'srednja_skola',
                'visa_skola',
                'fakultet',
                'master',
                'doktorske_studije'
            ])->nullable();
            $table->string('phone')->unique();
            $table->string('location');
            $table->text('bio');
            $table->string('github_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_seekers');
    }
};
