<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable {
     use HasApiTokens , HasFactory;
    protected $fillable = ['nom','prenom','email','mot_de_passe','role_id'];

    protected $hidden = ['mot_de_passe'];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function enseignant() {
        return $this->hasOne(Enseignant::class);
    }

    public function etudiant() {
        return $this->hasOne(Etudiant::class);
    }
}
