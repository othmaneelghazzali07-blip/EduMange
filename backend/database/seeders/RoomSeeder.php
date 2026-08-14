<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
            Room::create( ['salle'=>'s1','capacity'=>24]);
            Room::create(['salle'=>'s2','capacity'=>30]);
            Room::create(['salle'=>'s3','capacity'=>24]);
            Room::create(['salle'=>'info1','capacity'=>30]);
            Room::create(['salle'=>'info2','capacity'=>24]);
            Room::create(['salle'=>'info3','capacity'=>24]);
        
    }
}
