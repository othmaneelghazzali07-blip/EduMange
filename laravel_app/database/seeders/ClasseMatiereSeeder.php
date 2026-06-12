<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClasseMatiereSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('classe_matiere')->insert([
            // Classe 1
            ['classe_id' => 1, 'matiere_id' => 1],
            ['classe_id' => 1, 'matiere_id' => 2],
            ['classe_id' => 1, 'matiere_id' => 6],
            ['classe_id' => 1, 'matiere_id' => 7],
            // Classe 2
            ['classe_id' => 2, 'matiere_id' => 3],
            ['classe_id' => 2, 'matiere_id' => 4],
            ['classe_id' => 2, 'matiere_id' => 5],
            ['classe_id' => 2, 'matiere_id' => 13],
            // Classe 3
            ['classe_id' => 3, 'matiere_id' => 10],
            ['classe_id' => 3, 'matiere_id' => 11],
            ['classe_id' => 3, 'matiere_id' => 14],
            ['classe_id' => 3, 'matiere_id' => 15],
        ]);
    }
}