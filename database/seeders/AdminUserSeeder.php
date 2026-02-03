<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $email = 'admin@example.com';

        $user = User::where('email', $email)->first();

        if (!$user) {
            User::create([
                'name' => 'Administrator',
                'email' => $email,
                'password' => bcrypt('secret'),
                'role' => 'admin',
                'username' => 'admin',
            ]);
        }
    }
}
