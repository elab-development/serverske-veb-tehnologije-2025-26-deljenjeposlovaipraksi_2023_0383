<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\JobListing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobListing>
 */
class JobListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement([
                'Junior PHP Developer',
                'Senior Laravel Developer',
                'Frontend React Developer',
                'Backend Node.js Developer',
                'Full Stack Developer',
                'Junior Java Developer',
                'Python Developer',
                'DevOps Engineer',
                'QA Engineer',
                'Mobile Developer',
                'Android Developer',
                'iOS Developer',
                'UI/UX Designer',
                'Data Analyst',
                'Machine Learning Engineer',
                'Database Administrator',
                'Cloud Engineer',
                'Cybersecurity Analyst',
                'Software Architect',
                'IT Support Engineer',
            ]),
            'description'      => fake()->paragraphs(3, true),
            'location'         => fake()->randomElement([
                'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Remote'
            ]),
            'type'             => fake()->randomElement(['posao', 'praksa']),
            'experience_level' => fake()->randomElement(['intern', 'junior', 'medior', 'senior']),
            'salary_min'       => fake()->numberBetween(80000, 150000),
            'salary_max'       => fake()->numberBetween(150000, 300000),
            'is_active'        => true,
            'expires_at'       => fake()->dateTimeBetween('now', '+3 months'),
            'company_id'       => Company::factory(),
        ];
    }
}
