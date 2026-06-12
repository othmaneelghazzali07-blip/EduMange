<?php

// database/factories/MatiereFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MatiereFactory extends Factory {
    public function definition(): array {
        return [
            'nom_matiere' => $this->faker->word(),
            'coefficient' => $this->faker->numberBetween(1, 5),
            'niveau' => 'Lycée',
            'annee_scolaire' => '2026/2027',
        ];
    }
}

