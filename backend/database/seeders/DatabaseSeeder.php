<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Company;
use App\Models\JobListing;
use App\Models\JobSeeker;
use App\Models\User;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        JobListing::truncate();
        JobSeeker::truncate();
        Company::truncate();
        User::truncate();
        Application::truncate();

        User::factory(5)->create(['role' => 'job_seeker'])->each(function ($user){
            JobSeeker::factory()->create(['user_id' => $user->id]);
        });

        User::factory(3)->create(['role' => 'company'])->each(function ($user){
            $company = Company::factory()->create(['user_id' => $user->id]);
            JobListing::factory(4)->create(['company_id' => $company->id]);
        });

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
