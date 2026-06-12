<?php

// database/seeders/EnseignantsSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enseignant;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EnseignantSeeder extends Seeder {
    public function run(): void {
        $Utilisateur= Utilisateur::where('nom','khalid')->first();
        if($Utilisateur){
 Enseignant::create([
            'utilisateur_id' =>$Utilisateur->id,
            'specialite' => 'Mathématiques',
        ]);
        }
      


        // 1. Insert into utilisateurs
        DB::table('utilisateurs')->insert([
            ['id' => 43, 'nom' => 'El Amrani', 'prenom' => 'Yassine', 'email' => 'yassine.prof@example.com', 'mot_de_passe' => Hash::make('password'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 44, 'nom' => 'Bennani',  'prenom' => 'Laila',   'email' => 'laila.prof@example.com',   'mot_de_passe' => Hash::make('password'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 45, 'nom' => 'Mansouri', 'prenom' => 'Karim',   'email' => 'karim.prof@example.com',   'mot_de_passe' => Hash::make('password'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 46, 'nom' => 'Tazi',     'prenom' => 'Sanaa',   'email' => 'sanaa.prof@example.com',   'mot_de_passe' => Hash::make('password'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 47, 'nom' => 'Zahiri',   'prenom' => 'Omar',    'email' => 'omar.prof@example.com',    'mot_de_passe' => Hash::make('password'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Insert into enseignants
        DB::table('enseignants')->insert([
            ['utilisateur_id' => 43, 'specialite' => 'Software Engineering', 'created_at' => now(), 'updated_at' => now()],
            ['utilisateur_id' => 44, 'specialite' => 'Web Development',      'created_at' => now(), 'updated_at' => now()],
            ['utilisateur_id' => 45, 'specialite' => 'Data Science',         'created_at' => now(), 'updated_at' => now()],
            ['utilisateur_id' => 46, 'specialite' => 'UI/UX Design',         'created_at' => now(), 'updated_at' => now()],
            ['utilisateur_id' => 47, 'specialite' => 'Cyber Security',       'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
       
  