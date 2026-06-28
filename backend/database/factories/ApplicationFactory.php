<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\JobListing;
use App\Models\JobSeeker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_seeker_id'  => JobSeeker::factory(),
            'job_listing_id' => JobListing::factory(),
            'status'         => fake()->randomElement([
                'accepted', 'pending', 'denied'
            ]),
            'applied_at'     => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
