<?php

// database/factories/UtilisateurFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class UtilisateurFactory extends Factory {
    public function definition(): array {
        return [
            'nom' => $this->faker->name(),
            'prenom' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'mot_de_passe' => Hash::make('password'),
            'role_id' => Role::inRandomOrder()->first()->id,
        ];
    }
}
