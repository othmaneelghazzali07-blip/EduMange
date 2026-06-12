<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'title', 'message', 'payload', 'utilisateur_id', 'created_by'];

    protected $casts = [
        'payload' => 'array',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'utilisateur_id');
    }

    public function creator()
    {
        return $this->belongsTo(Utilisateur::class, 'created_by');
    }
}
