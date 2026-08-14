<?php

// database/seeders/AbsencesSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Absence;
use App\Models\Etudiant;

class AbsencesSeeder extends Seeder {
    public function run(): void {
        Absence::create([
            'etudiant_id' => Etudiant::inRandomOrder()->first()->id,
            'date_absence' => '2026-04-20',
            'statut' => 'absent',
        ]);
    }
}
