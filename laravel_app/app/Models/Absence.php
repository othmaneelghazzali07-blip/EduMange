<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model {
    use HasFactory;
    protected $fillable = ['utilisateur_id','date_absence','statut'];

    public function etudiant() {
        return $this->belongsTo(Etudiant::class);
    }
}
