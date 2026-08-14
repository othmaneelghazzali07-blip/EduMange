<?php

// database/seeders/UtilisateursSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;

class UtilisateursSeeder extends Seeder {
    public function run(): void {
        Utilisateur::create([
            'nom' => 'AlaeEddin ',
            'prenom' => ' Lazrek',
            'email' => 'admin@epg.com',
            'mot_de_passe' => Hash::make('password'),
            'role_id' => 1,
        ]);
         Utilisateur::create( [
            'nom' => 'khalid ',
            'prenom' => 'naji',
            'email' => 'enseignant@epg.com',
            'mot_de_passe' => Hash::make('password'),
            'role_id' => 2, 
        ]);
    }
}
