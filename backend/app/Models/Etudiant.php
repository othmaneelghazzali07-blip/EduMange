<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model {
    use HasFactory;
    protected $fillable = ['utilisateur_id','classe_id','CNE','date_naissance'];

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class);
    }

    public function classe() {
        return $this->belongsTo(Classe::class);
    }

    public function notes() {
        return $this->hasMany(Note::class);
    }

    public function absences() {
        return $this->hasMany(Absence::class);
    }

    public function presences() {
        return $this->hasMany(Presence::class, 'utilisateur_id','id');
    }
}

