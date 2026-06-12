<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant;
use App\Models\Utilisateur;

class EtudiantsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Créer 40 utilisateurs étudiants (Role ID = 3)
        $users = Utilisateur::factory()->count(40)->create(['role_id' => 3]);

        // 2. Créer un étudiant pour chaque utilisateur
        foreach ($users as $user) {
            Etudiant::create([
                'utilisateur_id' => $user->id,
                'classe_id'      => rand(1, 3), // Choix direct entre 1, 2 et 3
                'CNE'            => 'CNE' . rand(100000, 999999),
                'date_naissance' => '2005-05-15',
            ]);
        }
    }
}