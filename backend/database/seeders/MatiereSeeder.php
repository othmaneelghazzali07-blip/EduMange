<?php

namespace Database\Seeders;

use App\Models\Matiere;
use Illuminate\Database\Seeder;

class MatiereSeeder extends Seeder
{
    public function run(): void
    {
        $matieres = [
            [ 'nom_matiere' => 'Algorithmique', 'coefficient' => 4, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            ['nom_matiere' => 'HTML/CSS', 'coefficient' => 3, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'PHP / Laravel', 'coefficient' => 5, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            ['nom_matiere' => 'React JS', 'coefficient' => 5, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'JavaScript', 'coefficient' => 4, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'SQL Database', 'coefficient' => 4, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Python', 'coefficient' => 4, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Statistiques', 'coefficient' => 2, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            ['nom_matiere' => 'UI/UX Design', 'coefficient' => 3, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Networks', 'coefficient' => 4, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Security', 'coefficient' => 4, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Operating Systems', 'coefficient' => 3, 'niveau' => '1st Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Java', 'coefficient' => 4, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Mobile App', 'coefficient' => 4, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
            [ 'nom_matiere' => 'Cloud Computing', 'coefficient' => 3, 'niveau' => '2nd Year', 'annee_scolaire' => '2023-2024'],
        ];

        foreach ($matieres as $matiere) {
            Matiere::create($matiere);
        }
    }
}