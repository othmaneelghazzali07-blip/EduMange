<?php


// database/seeders/NotesSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Note;
use App\Models\Etudiant;
use App\Models\Matiere;

class NotesSeeder extends Seeder {
    public function run(): void {
        Note::create([
            'etudiant_id' => Etudiant::inRandomOrder()->first()->id,
            'matiere_id' => Matiere::inRandomOrder()->first()->id,
            'type_examen' => 'examen1',
            'note' => 15.5,
        ]);
    }
}
