<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    use WithoutModelEvents;
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0');
        User::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1');

        User::factory(5)->create(['role' => 'job_seeker']);
        User::factory(3)->create(['role' => 'company']);

        User::create([
            'email'    => 'admin@karijera.rs',
            'password' => Hash::make('admin123'),
            'role'     => 'admin',
        ]);
    }
}
