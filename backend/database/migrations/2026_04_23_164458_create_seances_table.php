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
    Schema::create('seances', function (Blueprint $table) {
        $table->id();
        $table->foreignId('classe_id')->constrained('classes')->cascadeOnDelete();
        $table->unsignedBigInteger('utilisateur_id');
        $table->foreign('utilisateur_id')->references('utilisateur_id')->on('enseignants')->cascadeOnDelete();
        $table->foreignId('matiere_id')->constrained('matieres')->cascadeOnDelete();
        $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
        $table->date('date');
        $table->time('heure_debut');
        $table->time('heure_fin');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
