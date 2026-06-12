<?php

namespace Database\Factories;

use App\Models\Etudiant;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdminNotification>
 */
class AdminNotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
        'type' => $this->faker->randomElement(['urgent', 'inmportan', 'annonces']),
        'title' => $this->faker->sentence(3),
        'message' => $this->faker->paragraph(),
        'payload' => ['link' => $this->faker->url()],
        'utilisateur_id' => Etudiant::inRandomOrder()->first()?->id,
        'created_by' => Utilisateur::where('role_id', 1)->inRandomOrder()->first()?->id,
    ];
    }
}

