<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Seance;
use App\Models\Classe;
use App\Models\Enseignant;
use App\Models\Matiere;
use App\Models\Room;
use Carbon\Carbon;

class SeanceSeeder extends Seeder
{
    public function run(): void
    {
        $classes = Classe::all();
        $teachers = Enseignant::all();
        $matieres = Matiere::all();
        $rooms = Room::all();

        if ($classes->isEmpty() || $teachers->isEmpty() || $rooms->isEmpty()) {
            return;
        }

        // Configuration des créneaux horaires (Time Slots)
        $slots = [
            ['08:30:00', '10:30:00'],
            ['10:30:00', '12:30:00'],
            ['14:30:00', '16:30:00'],
            ['16:30:00', '18:30:00'],
        ];

        $currentMonday = Carbon::now()->startOfWeek();

        // Génération des séances pour la semaine actuelle (Lundi à Vendredi)
        for ($dayIndex = 0; $dayIndex < 5; $dayIndex++) {
            $date = $currentMonday->copy()->addDays($dayIndex)->format('Y-m-d');

            foreach ($slots as $slot) {
                Seance::create([
                    'classe_id'     => $classes->random()->id,
                    'utilisateur_id' => $teachers->random()->utilisateur_id,
                    'matiere_id'    => $matieres->random()->id,
                    'room_id'       => $rooms->random()->id,
                    'date'          => $date,
                    'heure_debut'   => $slot[0],
                    'heure_fin'     => $slot[1],
                ]);
            }
        }
    }
}