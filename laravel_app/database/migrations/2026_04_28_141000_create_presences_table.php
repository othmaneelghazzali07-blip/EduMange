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
        Schema::create('presences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seance_id')->constrained('seances')->cascadeOnDelete();
            $table->foreignId('utilisateur_id')->constrained('etudiants')->cascadeOnDelete();
            $table->enum('status', ['present', 'absent', 'late']);
            $table->text('observation')->nullable();
            $table->timestamps();

            $table->unique(['seance_id', 'utilisateur_id'], 'uniq_presence_seance_student');
            $table->index(['utilisateur_id', 'created_at'], 'idx_presences_etudiant_created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presences');
    }
};
