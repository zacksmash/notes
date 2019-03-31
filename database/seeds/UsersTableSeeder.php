<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Models\User::create([
            'first_name'        => 'John',
            'last_name'         => 'Doe',
            'email'             => 'john@example.com',
            'password'          => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
    }
}
