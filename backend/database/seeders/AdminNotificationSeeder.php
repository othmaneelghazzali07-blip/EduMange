<?php

namespace Database\Seeders;

use App\Models\AdminNotification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminNotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    AdminNotification::factory()->count(20)->create();
    }
}
