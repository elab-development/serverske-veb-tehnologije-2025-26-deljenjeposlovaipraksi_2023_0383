<?php

namespace Database\Factories;

use App\Models\JobSeeker;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobSeeker>
 */
class JobSeekerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'    => User::factory(),
            'first_name' => fake()->firstName(),
            'last_name'  => fake()->lastName(),
            'education'  => fake()->randomElement([
                'osnovna_skola',
                'srednja_skola',
                'visa_skola',
                'fakultet',
                'master',
                'doktorske_studije'
            ]),
            'phone'      => fake()->phoneNumber(),
            'location'   => fake()->randomElement([
                'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Remote'
            ]),
            'bio'        => fake()->paragraph(),
            'github_url' => 'https://github.com/' . fake()->userName(),
        ];
    }
}
