<?php

// database/factories/EnseignantFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Utilisateur;

class EnseignantFactory extends Factory {
    public function definition(): array {
        return [
            'utilisateur_id' => Utilisateur::factory(),
            'specialite' => $this->faker->word(),
        ];
    }
}
