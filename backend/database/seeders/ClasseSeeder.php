<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classe; 

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Classe::create(
            [
                'nom_classe' => 'Class A',
                'niveau' => '1ère Année',
                'annee_scolaire' => '2025-2026',
            ]);
           Classe::create ([
                'nom_classe' => 'Class B',
                'niveau' => '2ème Année',
                'annee_scolaire' => '2025-2026',
            ]);
            Classe::create([
                'nom_classe' => 'Class C',
                'niveau' => '3ème Année',
                'annee_scolaire' => '2025-2026',
            ]);
        
    }
}