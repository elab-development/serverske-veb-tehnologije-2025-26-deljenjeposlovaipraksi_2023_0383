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
        JobSeeker::truncate();

        User::where('role', 'job_seeker')->get()->each(function ($user) {
            JobSeeker::factory()->create(['user_id' => $user->id]);
        });
    }
}
