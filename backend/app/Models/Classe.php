<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle Classe : Représente une section ou un groupe scolaire.
 */
class Classe extends Model 
{
    use HasFactory;

    // Attributs pouvant être assignés en masse
    protected $fillable = [
        'nom_classe',
        'niveau',
        'annee_scolaire'
    ];

    /**
     * etudiants : Récupère la liste des étudiants inscrits dans cette classe.
     * Relation : HasMany (Une classe possède plusieurs étudiants).
     * Description : Permet d'accéder à tous les profils élèves liés à cette section.
     */
    public function etudiants() 
    {
        return $this->hasMany(Etudiant::class);
    }

    /**
     * seances : Récupère le planning des cours (séances) pour cette classe.
     * Relation : HasMany (Une classe a plusieurs séances programmées).
     * Description : Utilisé pour générer l'emploi du temps spécifique à la classe.
     */
    public function seances() 
    {
        return $this->hasMany(Seance::class);
    }

    /**
     * matieres : Récupère les matières enseignées à cette classe.
     * Relation : BelongsToMany (Une classe suit plusieurs matières).
     * Description : Passage par la table pivot 'classe_matiere' pour définir le programme scolaire.
     */
    public function matieres()
    {
        return $this->belongsToMany(Matiere::class, 'classe_matiere');
    }
}