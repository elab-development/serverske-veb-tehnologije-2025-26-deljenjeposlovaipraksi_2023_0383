<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\JobListing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobListingSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0');
        JobListing::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Company::all()->each(function ($company) {
            JobListing::factory(4)->create(['company_id' => $company->id]);
        });
    }
}
