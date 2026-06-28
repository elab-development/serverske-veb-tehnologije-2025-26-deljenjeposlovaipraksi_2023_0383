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
        Schema::table('job_seekers', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        
        // Nullable polja
            $table->string('phone')->nullable()->change();
            $table->text('bio')->nullable()->change();
            $table->string('github_url')->nullable()->change();
            $table->string('location')->nullable()->change();
            
            // Preimenuj camelCase u snake_case
            $table->renameColumn('firstName', 'first_name');
            $table->renameColumn('lastName', 'last_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_seekers', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->renameColumn('first_name', 'firstName');
            $table->renameColumn('last_name', 'lastName');
        });
    }
};
