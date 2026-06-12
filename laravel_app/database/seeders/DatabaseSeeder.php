<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UtilisateursSeeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\ClassesSeeder;
use Database\Seeders\EnseignantSeeder;
use Database\Seeders\MatieresSeeder;
use Database\Seeders\EtudiantsSeeder;
use Database\Seeders\SeanceSeeder;
use Database\Seeders\RoomSeeder;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
  public function run() {
  $this->call([
    RolesSeeder::class, 
    UtilisateursSeeder::class,
   ClasseSeeder::class,
   MatiereSeeder::class,
   RoomSeeder::class,
   EtudiantsSeeder::class,
   EnseignantSeeder::class,
   EnseignantMatiereSeeder::class,
   ClasseMatiereSeeder::class,
   SeanceSeeder::class,
   AdminNotificationSeeder::class,

    
  ]);
   

}

}
