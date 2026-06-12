<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    protected $fillable = ['seance_id', 'utilisateur_id', 'status', 'observation'];

    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }

    public function student()
    {
        return $this->belongsTo(Etudiant::class, 'student_id');
    }
}
