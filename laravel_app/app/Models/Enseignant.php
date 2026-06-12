<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model {
    use HasFactory;
    protected $fillable = ['utilisateur_id','specialite'];
    protected $primaryKey ='utilisateur_id';

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class);
    }

    public function seances() {
        return $this->hasMany(Seance::class);
    }
    public function matieres(){
        return $this->belongsToMany(Matiere::class,'enseignant_matiere','utilisateur_id','matiere_id');
    }
}
