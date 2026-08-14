<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle Seance : Représente une séance de cours dans l'emploi du temps.
 */
class Seance extends Model 
{
    use HasFactory;

    // Liste des champs autorisés pour le remplissage de masse (Mass Assignment)
    protected $fillable = [
        'classe_id',
        'utilisateur_id',
        'matiere_id',
        'room_id',
        'date',
        'heure_debut',
        'heure_fin'
    ];

    /**
     * classe : Définit la relation avec la classe.
     * Relation : BelongsTo (Une séance appartient à une seule classe).
     */
    public function classe() 
    {
        return $this->belongsTo(Classe::class);
    }

    /**
     * enseignant : Définit la relation avec l'enseignant qui anime la séance.
     * Relation : BelongsTo (Une séance est animée par un enseignant spécifique).
     * Note : Utilise 'utilisateur_id' comme clé étrangère.
     */
    public function enseignant() 
    {
        return $this->belongsTo(Enseignant::class, 'utilisateur_id', 'utilisateur_id');
    }

    /**
     * matiere : Définit la relation avec la matière enseignée.
     * Relation : BelongsTo (Une séance concerne une seule matière).
     */
    public function matiere() 
    {
        return $this->belongsTo(Matiere::class);
    }

    /**
     * room : Définit la relation avec la salle (Room) où se déroule la séance.
     * Relation : BelongsTo (Une séance a lieu dans une seule salle).
     */
    public function room() 
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * presences : Définit la relation avec les feuilles de présence.
     * Relation : HasMany (Une séance peut avoir plusieurs enregistrements de présence).
     */
    public function presences() 
    {
        return $this->hasMany(Presence::class);
    }
}