<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admin_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type', 50);
            $table->string('title', 150);
            $table->text('message');
            $table->json('payload')->nullable();
            $table->foreignId('utilisateur_id')->nullable()->constrained('etudiants')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('utilisateurs')->nullOnDelete();
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_notifications');
    }
};
