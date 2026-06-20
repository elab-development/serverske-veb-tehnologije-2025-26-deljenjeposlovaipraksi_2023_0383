<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        Company::truncate();

        User::where('role', 'company')->get()->each(function ($user) {
            Company::factory()->create(['user_id' => $user->id]);
        });
    }
}
