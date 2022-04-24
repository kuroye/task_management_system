<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = Faker::create();
        foreach(range(1,20) as $num)
        {
            User::create([
                'username' => 'jojo'.$num,
                'email' => $faker->safeEmail,
                'password' => bcrypt('12345678')
            ]);

        }
    }
}
