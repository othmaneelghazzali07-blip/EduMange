<?php

// database/factories/EtudiantFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Utilisateur;
use App\Models\Classe;

class EtudiantFactory extends Factory {
    public function definition(): array {
        return [
            'utilisateur_id' => Utilisateur::factory(['role_id'=>3]),
            'classe_id' => Classe::inRandomOrder()->first()->id,
            'CNE' => $this->faker->unique()->numerify('CNE#####'),
            'date_naissance' => $this->faker->date(),
        ];
    }
}

