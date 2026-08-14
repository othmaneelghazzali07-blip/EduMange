<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
{
    Schema::table('classe_matiere', function (Blueprint $table) {
        $table->unsignedBigInteger('enseignant_id')->nullable();
        $table->foreign('enseignant_id')
              ->references('utilisateur_id')
              ->on('enseignants')
              ->onDelete('set null');
    });
}

public function down(): void
{
    Schema::table('classe_matiere', function (Blueprint $table) {
        $table->dropForeign(['enseignant_id']);
        $table->dropColumn('enseignant_id');
    });
}
};
