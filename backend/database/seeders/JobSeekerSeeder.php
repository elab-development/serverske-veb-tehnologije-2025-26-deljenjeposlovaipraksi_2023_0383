<?php

namespace Database\Seeders;

use App\Models\JobSeeker;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeekerSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0');
        JobSeeker::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1');

        User::where('role', 'job_seeker')->get()->each(function ($user) {
            JobSeeker::factory()->create(['user_id' => $user->id]);
        });
    }
}
