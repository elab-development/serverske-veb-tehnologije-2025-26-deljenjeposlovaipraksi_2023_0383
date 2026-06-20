<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Company::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        User::where('role', 'company')->get()->each(function ($user) {
            Company::factory()->create(['user_id' => $user->id]);
        });
    }
}
