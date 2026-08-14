<?php

// database/factories/RoleFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory {
    public function definition(): array {
        return [
            'nom' => $this->faker->unique()->randomElement(['admin','enseignant','etudiant']),
        ];
    }
}
