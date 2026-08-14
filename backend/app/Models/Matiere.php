<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle Matiere : Représente une matière enseignée dans l'établissement.
 */
class Matiere extends Model 
{
    use HasFactory;

    // Liste des champs autorisés pour l'insertion de données
    protected $fillable = [
        'nom_matiere',
        'coefficient',
        'niveau',
        'annee_scolaire'
    ];

    /**
     * notes : Récupère toutes les notes liées à cette matière.
     * Relation : HasMany (Une matière possède plusieurs notes).
     */
    public function notes() 
    {
        return $this->hasMany(Note::class);
    }

    /**
     * seances : Récupère toutes les séances de cours programmées pour cette matière.
     * Relation : HasMany (Une matière peut avoir plusieurs séances dans l'emploi du temps).
     */
    public function seances() 
    {
        return $this->hasMany(Seance::class);
    }

    /**
     * enseignants : Récupère la liste des enseignants capables de donner cette matière.
     * Relation : BelongsToMany (Plusieurs enseignants peuvent enseigner plusieurs matières).
     * Description : Utilise la table pivot 'enseignant_matiere' pour lier les matières aux professeurs.
     */
    public function enseignants()
    {
        return $this->belongsToMany(
            Enseignant::class,  
            'enseignant_matiere',  
            'matiere_id',  
            'enseignant_id'
        )->with('utilisateur');
    }
}