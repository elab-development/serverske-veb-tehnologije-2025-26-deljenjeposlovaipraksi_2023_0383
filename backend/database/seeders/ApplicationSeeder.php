<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\JobListing;
use App\Models\JobSeeker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        Application::truncate();

        $jobSeekers = JobSeeker::all();
        $jobListings = JobListing::all();

        $jobSeekers->each(function ($jobSeeker) use ($jobListings) {
            Application::factory(2)->create([
                'job_seeker_id' => $jobSeeker->id,
                'job_listing_id' => $jobListings->random()->id,
            ]);
        });
    }
}
