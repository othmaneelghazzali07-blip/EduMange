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
       Schema::create('notes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('etudiant_id')->constrained('etudiants')->cascadeOnDelete();
    $table->foreignId('matiere_id')->constrained('matieres')->cascadeOnDelete();
   $table->foreignId('enseignant_id')->nullable()->constrained('enseignants', 'utilisateur_id')->cascadeOnDelete();
    $table->string('type_examen'); // examen1, examen2, examen3
    $table->decimal('note', 5, 2); // 0 → 20
$table->unique(['etudiant_id', 'matiere_id', 'type_examen']);
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
