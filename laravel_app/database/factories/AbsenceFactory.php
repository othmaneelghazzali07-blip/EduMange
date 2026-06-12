<?php

// database/factories/AbsenceFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Etudiant;

class AbsenceFactory extends Factory {
    public function definition(): array {
        return [
            'etudiant_id' => Etudiant::inRandomOrder()->first()->id,
            'date_absence' => $this->faker->date(),
            'statut' => $this->faker->randomElement(['present','absent','retard']),
        ];
    }
}
