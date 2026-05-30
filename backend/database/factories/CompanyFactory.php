<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'      => User::factory(),
            'company_name' => fake()->company(),
            'website'      => fake()->url(),
            'location'     => fake()->randomElement([
                'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Remote'
            ]),
            'company_size' => fake()->randomElement([
                '0-50', '50-100', '100-500', '500-1000', '1000+'
            ]),
            'description'  => fake()->paragraph(),
        ];
    }
}
