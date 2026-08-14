<?php

// database/factories/ClasseFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClasseFactory extends Factory {
    public function definition(): array {
        return [
            'nom_classe' => $this->faker->word(),
            'niveau' => 'Lycée',
            'annee_scolaire' => '2026/2027',
        ];
    }
}
