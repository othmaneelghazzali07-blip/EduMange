<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnseignantMatiereSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('enseignant_matiere')->insert([
            // Teacher 43: Algorithmique, PHP, SQL
            ['utilisateur_id' => 43, 'matiere_id' => 1],
            ['utilisateur_id' => 43, 'matiere_id' => 3],
            ['utilisateur_id' => 43, 'matiere_id' => 6],
            // Teacher 44: HTML, React, JS
            ['utilisateur_id' => 44, 'matiere_id' => 2],
            ['utilisateur_id' => 44, 'matiere_id' => 4],
            ['utilisateur_id' => 44, 'matiere_id' => 5],
            // Teacher 45: Python, Stat, Java
            ['utilisateur_id' => 45, 'matiere_id' => 7],
            ['utilisateur_id' => 45, 'matiere_id' => 8],
            ['utilisateur_id' => 45, 'matiere_id' => 13],
            // Teacher 46: UI, Mobile
            ['utilisateur_id' => 46, 'matiere_id' => 9],
            ['utilisateur_id' => 46, 'matiere_id' => 14],
            // Teacher 47: Networks, Security, OS
            ['utilisateur_id' => 47, 'matiere_id' => 10],
            ['utilisateur_id' => 47, 'matiere_id' => 11],
            ['utilisateur_id' => 47, 'matiere_id' => 12],
        ]);
    }
}