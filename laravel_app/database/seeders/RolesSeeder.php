<?php

// database/seeders/RolesSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder {
    public function run(): void {
        Role::create(['nom_role' => 'admin']);
         Role::create(['nom_role' => 'enseignant']);
         Role::create(['nom_role' => 'etudiant']);
    }
}
