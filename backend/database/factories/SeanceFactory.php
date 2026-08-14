<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Classe;
use App\Models\Enseignant;
use App\Models\Matiere;

class SeanceFactory extends Factory
{
    public function definition()
    {
        return [
            'classe_id' => Classe::inRandomOrder()->first()->id ?? Classe::factory(),
            'enseignant_id' => Enseignant::inRandomOrder()->first()->id ?? Enseignant::factory(),
            'matiere_id' => Matiere::inRandomOrder()->first()->id ?? Matiere::factory(),
            'salle' => 'Salle ' . $this->faker->randomDigit(),
            'date' => $this->faker->date(),
            'heure_debut' => $this->faker->randomElement(['08:00','10:00','14:00']),
            'heure_fin' => $this->faker->randomElement(['10:00','12:00','16:00']),
        ];
    }
}
