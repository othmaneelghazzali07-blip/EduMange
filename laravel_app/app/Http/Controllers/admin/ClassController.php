<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
      public function getClassesAdmin()
{
    try {
        $classes = Classe::with([
            'etudiants.utilisateur',
            'matieres',
        ])->withCount('etudiants as nb_eleves')->get();

        $classes = $classes->map(function($classe) {
            $classe->matieres = $classe->matieres->map(function($matiere) use ($classe) {
                $pivot = DB::table('classe_matiere')
                    ->where('classe_id', $classe->id)
                    ->where('matiere_id', $matiere->id)
                    ->first();

                $enseignant = null;
                if ($pivot && $pivot->enseignant_id) {
                    $ens = \App\Models\Enseignant::with('utilisateur')
                        ->where('utilisateur_id', $pivot->enseignant_id)
                        ->first();
                    if ($ens) {
                        $enseignant = [
                            'id'     => $ens->utilisateur_id,
                            'nom'    => $ens->utilisateur->nom,
                            'prenom' => $ens->utilisateur->prenom,
                        ];
                    }
                }
                $matiere->enseignant_classe = $enseignant;
                return $matiere;
            });
            return $classe;
        });

        return response()->json(['success' => true, 'classes' => $classes]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
