<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use App\Models\Role;
use App\Models\Classe;
use App\Models\Matiere;
use App\Models\Enseignant;
use App\Models\Etudiant;
use App\Models\Seance;
use App\Models\Note;
use App\Models\Absence;
use App\Models\AdminNotification;
use App\Models\Presence;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Dashboard statistiques 
    public function getDashboardStats(Request $request) {
         $NombreClasses=Classe::count();
         $classes=Classe::all();
         $NombreEtudiants=Etudiant::count();
         $NombreEnseignants=Enseignant::count();
         //

         $date=$request->query('date',now()->format('Y-m-d'));
         $seances=Seance::whereDate('date',$date)
         ->with(['matiere','classe','enseignant.utilisateur','room'])->get();
         // notification

       


        return response()->json([
           
            // liste et nombre de classes 
           'ClasseState'=> ['NombreClasses'=>$NombreClasses,'listClasse'=>$classes,],
           'EtudiantsState'=>$NombreClasses,
           'EnseignantsState'=>$NombreEnseignants,
           'EtudiantsState'=>$NombreEtudiants,
           'seances'=>$seances,
           
            
        ]);

    }

    //µ******************etudiant********************
//récupirer les etudiant
public function gestionEtudiants(Request $request){


    $ListEtudiants=Etudiant::with(['utilisateur','classe'])->latest()->get();
     return response()->json([
        'ListEtudiants'=>$ListEtudiants,
    ]);

}
 //ajouter etudiant
 public function AjouterEtudiant(Request $request)
{
    // validation 
   $validated = $request->validate([
    'nom' => 'required|string|max:255',
    'prenom' => 'required|string|max:255',
    'email' => 'required|email|unique:utilisateurs,email',
    'classe_id' => 'required|exists:classes,id',
    'CNE' => 'required|unique:etudiants,CNE', 
    'date_naissance' => 'required|date',
]);

    return DB::transaction(function () use ($validated ,$request) {
        
       //crrer utilisateur 
        $user = Utilisateur::create([
            'nom' => $validated['nom'],
            'prenom'=>$validated['prenom'],
            'email'=> $validated['email'],
            'mot_de_passe'  => Hash::make('password'), 
            'role_id' => 3,
        ]);

       //enregestrer comme etudiant
        $etudiant = Etudiant::create([
            'utilisateur_id' => $user->id,
            'classe_id' => $validated['classe_id'],
            'CNE'  => $request->CNE,
            'date_naissance' => $request->date_naissance,
        ]);

        return response()->json([
            'message' => 'étudiant a été créé avec succès !',
            'data'    => $etudiant->load('utilisateur', 'classe') 
        ]);
    });
}
//**************update****************


public function UpdateEtudiant(Request $request, $id) {
    // trouver l'etudiant
$etudiant = Etudiant::find( $id); 

if (!$etudiant) {
    return response()->json(['error' => 'ID ' . $id . ' ghayeb f database'], 404);
}

    // Validation 

    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|email|unique:utilisateurs,email,' . $etudiant->utilisateur_id,
        'classe_id' => 'required|exists:classes,id',
        'CNE' => 'required|unique:etudiants,CNE,' . $etudiant->id,
        'date_naissance' => 'required|date'
    ]);

    return DB::transaction(function () use ($validated, $etudiant) {
        // update
        $user = Utilisateur::find($etudiant->utilisateur_id);
        $user->update([
            'nom' => $validated['nom'],
            'prenom'=> $validated['prenom'],
            'email' => $validated['email'],
        ]);

     
        $etudiant->update([
            'classe_id' => $validated['classe_id'],
            'CNE' => $validated['CNE'],
            'date_naissance' => $validated['date_naissance'],
        ]);

        return response()->json([
            'message' => 'Étudiant modifié avec succès !',
            'data' => $etudiant->load('utilisateur', 'classe')
        ]);
    });
}
//*************Delete***************
public function DeleteEtudiant($id) {
    try {
        // trouver etudiant
        $etudiant = Etudiant::find($id);

        if (!$etudiant) {
            return response()->json(['error' => 'Had talamid khellaha moulaha '], 404);
        }

        $uId = $etudiant->utilisateur_id;

        return DB::transaction(function () use ($etudiant, $uId) {
            // supprimer Etudiant
            $etudiant->delete();

            //supprimer utilisateur
            Utilisateur::where('id', $uId)->delete();

            return response()->json([
                'message' => 'Étudiant supprimé  avec succes'
            ], 200);
        });

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Probleme f delete: ' . $e->getMessage()
        ], 500);
    }
}
//*************************CRUD ENSEIGNANT***************************** */

public function getEnseignantsAdmin()
{
    try {
        $enseignants = Enseignant::with([
            'utilisateur',
            'matieres',
        ])->get()->map(function($e) {

            //
            $classes = DB::table('classe_matiere')
                ->where('enseignant_id', $e->utilisateur_id)
                ->join('classes', 'classe_matiere.classe_id', '=', 'classes.id')
                ->select('classes.id', 'classes.nom_classe')
                ->distinct()
                ->get();

            return [
                'id'         => $e->utilisateur_id,
                'nom'        => $e->utilisateur->nom,
                'prenom'     => $e->utilisateur->prenom,
                'email'      => $e->utilisateur->email,
                'specialite' => $e->specialite,
                'matieres'   => $e->matieres->map(fn($m) => [
                    'id'          => $m->id,
                    'nom_matiere' => $m->nom_matiere,
                    'coefficient' => $m->coefficient ?? 1,
                ]),
                'classes' => $classes,
            ];
        });

        return response()->json(['success' => true, 'enseignants' => $enseignants]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}

// =====getAllMatieres=====
public function getAllMatieres()
{
    try {
        $matieres = Matiere::select('id','nom_matiere','coefficient')->get();
        return response()->json(['success' => true, 'matieres' => $matieres]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}




// =====ajouterEnseignantAdmin=====
public function ajouterEnseignantAdmin(Request $request)
{
    $request->validate([
        'nom'        => 'required|string|max:255',
        'prenom'     => 'required|string|max:255',
        'email'      => 'required|email|unique:utilisateurs,email',
        'specialite' => 'nullable|string|max:255',
        'matiere_id' => 'nullable|exists:matieres,id',
    ]);

    return DB::transaction(function () use ($request) {
        $user = Utilisateur::create([
            'nom'          => $request->nom,
            'prenom'       => $request->prenom,
            'email'        => $request->email,
            'mot_de_passe' => Hash::make('password'),
            'role_id'      => 2,
        ]);

        $enseignant = Enseignant::create([
            'utilisateur_id' => $user->id,
            'specialite'     => $request->specialite ?? null,
        ]);

    

        return response()->json(['success' => true],201);
    });
}

// ===== modifierEnseignantAdmin=====
public function modifierEnseignantAdmin(Request $request, $utilisateurId)
{
    $enseignant = Enseignant::where('utilisateur_id', $utilisateurId)->firstOrFail();

    $request->validate([
        'nom'        => 'required|string|max:255',
        'prenom'     => 'required|string|max:255',
        'email'      => 'required|email|unique:utilisateurs,email,' . $utilisateurId,
        'specialite' => 'nullable|string|max:255',
    ]);

    return DB::transaction(function () use ($request, $enseignant, $utilisateurId) {
        Utilisateur::where('id', $utilisateurId)->update([
            'nom'    => $request->nom,
            'prenom' => $request->prenom,
            'email'  => $request->email,
        ]);
        $enseignant->update(['specialite' => $request->specialite]);

        return response()->json(['success' => true]);
    });
}
// ===== modifierMatiereEnseignant=====
public function modifierMatiereEnseignant(Request $request, $utilisateurId)
{
    $request->validate([
        'matiere_ids' => 'required|array',
        'matiere_ids.*' => 'exists:matieres,id',
    ]);

    try {
       
        DB::table('enseignant_matiere')
            ->where('utilisateur_id', $utilisateurId)
            ->delete();


$rows = array_map(fn($mid) => [
    'utilisateur_id' => $utilisateurId,
    'matiere_id'     => $mid,
], $request->matiere_ids);

        DB::table('enseignant_matiere')->insert($rows);

        return response()->json(['success' => true]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}

// ===== supprimerEnseignantAdmin=====
public function supprimerEnseignantAdmin($utilisateurId)
{
    return DB::transaction(function () use ($utilisateurId) {
        Enseignant::where('utilisateur_id', $utilisateurId)->delete();
       Utilisateur::where('id', $utilisateurId)->delete();
        return response()->json(['success' => true]);
    });
}

// ===== ajouterClasseEnseignant =====
public function ajouterClasseEnseignant(Request $request, $utilisateurId)
{
    $request->validate([
        'classe_id'  => 'required|exists:classes,id',
        'matiere_id' => 'required|exists:matieres,id',
        'heure_debut'=> 'required',
        'heure_fin'  => 'required',
        'date'       => 'required|date',
    ]);

    Seance::create([
        'utilisateur_id' => $utilisateurId,
        'classe_id'      => $request->classe_id,
        'matiere_id'     => $request->matiere_id,
        'heure_debut'    => $request->heure_debut,
        'heure_fin'      => $request->heure_fin,
        'date'           => $request->date,
    ]);

    return response()->json(['success' => true]);
}

//**************gestionClasses*********
 

    // =====getClassesAdmin=====
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

    // ===== getEtudiantDetails=====
   public function getEtudiantDetails($etudiantId)
{
    try {
        $etudiant = Etudiant::with(['utilisateur', 'classe'])
            ->findOrFail($etudiantId);

 
        $nbAbsences = Presence::where('utilisateur_id', $etudiantId)
            ->where('status', 'absent')->count();
        $nbRetards = Presence::where('utilisateur_id', $etudiantId)
            ->where('status', 'late')->count();
        $noteConduite = max(0, 20 - ($nbAbsences * 1) - ($nbRetards * 0.5));


            $absences = Presence::where('utilisateur_id', $etudiant->id)
                ->whereIn('status', ['absent', 'late'])
                ->with([
                    'seance.matiere',
                    'seance.enseignant.utilisateur',
                    'seance.room'
                ])
                ->orderBy('created_at', 'desc')
                ->get();
   
        if (!$etudiant->classe) {
            return response()->json([
                'success'          => true,
                'etudiant'         => [
                    'id'     => $etudiant->id,
                    'nom'    => $etudiant->utilisateur->nom,
                    'prenom' => $etudiant->utilisateur->prenom,
                    'CNE'    => $etudiant->CNE,
                ],
                'stats_discipline' => [
                    'nb_absences'   => $nbAbsences,
                    'nb_retards'    => $nbRetards,
                    'note_conduite' => $noteConduite,
                    'data'=>   $absences,
                    
                ],
                
                'bulletin'         => [],
                'moyenne_generale' => null,
            ]);
        }

     
        $matieres = Matiere::whereHas('seances', function($q) use ($etudiant) {
            $q->where('classe_id', $etudiant->classe_id);
        })->get();

        if ($matieres->isEmpty()) {
            $matieres = $etudiant->classe->matieres ?? collect();
        }

        $totalPondere = 0;
        $sommeCoeff   = 0;

        $bulletin = $matieres->map(function ($matiere) use ($etudiant, &$totalPondere, &$sommeCoeff) {
            $notes = Note::where('etudiant_id', $etudiant->id)
                ->where('matiere_id', $matiere->id)
                ->get()
                ->keyBy('type_examen');

            $n1 = isset($notes['examen1']) ? $notes['examen1']->note : null;
            $n2 = isset($notes['examen2']) ? $notes['examen2']->note : null;
            $n3 = isset($notes['examen3']) ? $notes['examen3']->note : null;

            $validNotes = array_filter([$n1, $n2, $n3], fn($v) => $v !== null);
            $moyenne = count($validNotes) > 0
                ? round(array_sum($validNotes) / count($validNotes), 2)
                : null;

            $coeff = $matiere->coefficient ?? 1;
            if ($moyenne !== null) {
                $totalPondere += $moyenne * $coeff;
                $sommeCoeff   += $coeff;
            }

            return [
                'matiere_id'  => $matiere->id,
                'nom_matiere' => $matiere->nom_matiere,
                'coefficient' => $coeff,
                'examen1'     => $n1,
                'examen2'     => $n2,
                'examen3'     => $n3,
                'moyenne'     => $moyenne,
            ];
        });

        $moyenneGenerale = $sommeCoeff > 0
            ? round($totalPondere / $sommeCoeff, 2)
            : null;

        return response()->json([
            'success'          => true,
            'etudiant'         => [
                'id'     => $etudiant->id,
                'nom'    => $etudiant->utilisateur->nom,
                'prenom' => $etudiant->utilisateur->prenom,
                'CNE'    => $etudiant->CNE,
            ],
            'stats_discipline' => [
                'nb_absences'   => $nbAbsences,
                'nb_retards'    => $nbRetards,
                'note_conduite' => $noteConduite,
            ],
            'bulletin'         => $bulletin,
            'moyenne_generale' => $moyenneGenerale,
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error'   => $e->getMessage(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile(),
        ], 500);
    }
}

    // =====getEnseignantsParMatiere  primaryKey = 'utilisateur_id'
    public function getEnseignantsParMatiere($matiereId)
    {
        try {

            $enseignants = Enseignant::with('utilisateur')
                ->whereHas('matieres', function($q) use ($matiereId) {
                    $q->where('matieres.id', $matiereId);
                })
                ->get()
                ->map(fn($e) => [
                    'id'     => $e->utilisateur_id, // primaryKey
                    'nom'    => $e->utilisateur->nom,
                    'prenom' => $e->utilisateur->prenom,
                ]);

            return response()->json(['success' => true, 'enseignants' => $enseignants]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // =====  getAllEnseignants =====
    public function getAllEnseignants()
    {
        try {
            $enseignants = Enseignant::with('utilisateur')
                ->get()
                ->map(fn($e) => [
                    'id'     => $e->utilisateur_id,
                    'nom'    => $e->utilisateur->nom,
                    'prenom' => $e->utilisateur->prenom,
                ]);

            return response()->json(['success' => true, 'enseignants' => $enseignants]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // =====ajouterEtudiantClasse=====
    public function ajouterEtudiantClasse(Request $request, $classeId)
    {
        try {
            $request->validate(['etudiant_id' => 'required|exists:etudiants,id']);
            $etudiant = Etudiant::findOrFail($request->etudiant_id);
            $etudiant->update(['classe_id' => $classeId]);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // =====supprimerEtudiantClasse=====
    public function supprimerEtudiantClasse($classeId, $etudiantId)
    {
        try {
            $etudiant = Etudiant::where('id', $etudiantId)
                ->where('classe_id', $classeId)
                ->firstOrFail();
            $etudiant->update(['classe_id' => null]);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // =====modifierEnseignantMatiere====
public function modifierEnseignantMatiere(Request $request, $classeId)
{
    try {
        $request->validate([
            'matiere_id'    => 'required|exists:matieres,id',
            'enseignant_id' => 'required|exists:enseignants,utilisateur_id',
        ]);

        // حدث classe_matiere
        DB::table('classe_matiere')
            ->where('classe_id', (int)$classeId)
            ->where('matiere_id', (int)$request->matiere_id)
            ->update(['enseignant_id' => (int)$request->enseignant_id]);

        // ✅ حدث الحصص المستقبلية أو كلها لنفس القسم والمادة
        Seance::where('classe_id', $classeId)
            ->where('matiere_id', $request->matiere_id)
            ->where('date', '>=', now()->toDateString()) // المستقبلية فقط
            ->update(['utilisateur_id' => (int)$request->enseignant_id]);

        return response()->json(['success' => true]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}
    // =====supprimerEnseignantMatiere=====
    public function supprimerEnseignantMatiere($classeId, $matiereId)
    {
        try {
            Seance::where('classe_id', $classeId)
                ->where('matiere_id', $matiereId)
                ->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // =====  getEtudiantsSansClasse =====
    public function getEtudiantsSansClasse()
    {
        try {
            $etudiants = Etudiant::whereNull('classe_id')
                ->with('utilisateur:id,nom,prenom')
                ->get()
                ->map(fn($e) => [
                    'id'     => $e->id,
                    'nom'    => $e->utilisateur->nom,
                    'prenom' => $e->utilisateur->prenom,
                    'CNE'    => $e->CNE,
                ]);
            return response()->json(['success' => true, 'etudiants' => $etudiants]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

//*********************CRUDSeances************** *
 // getAllseances

public function getAllSeances() {
    try {
        $seances = Seance::with([
            'classe', 
            'enseignant.utilisateur',
            'matiere', 
            'room'
        ])->get();

        return response()->json([
            'success' => true,
            'data' => $seances
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des séances',
            'error' => $e->getMessage()
        ], 500);
    }
}
//ajoute seance

public function AjouteSeance(Request $request)
{
    $request->validate([
        'classe_id'      => 'required',
        'utilisateur_id' => 'required',
        'matiere_id'     => 'required',
        'room_id'        => 'required',
        'date'           => 'required|date',
        'heure_debut'    => 'required',
        'heure_fin'      => 'required',
    ]);

    // ✅ شرط أوقات العمل
    if ($request->heure_debut < '08:00' || $request->heure_fin > '18:30') {
        return response()->json([
            'success' => false,
            'message' => 'Les séances doivent être entre 08:00 et 18:30.'
        ], 422);
    }

    // ✅ شرط هeure_fin > heure_debut
    if ($request->heure_debut >= $request->heure_fin) {
        return response()->json([
            'success' => false,
            'message' => "L'heure de fin doit être après l'heure de début."
        ], 422);
    }

    // ✅ conflict detection
    $conflitClasse = Seance::where('date', $request->date)
        ->where('classe_id', $request->classe_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    $conflitProf = Seance::where('date', $request->date)
        ->where('utilisateur_id', $request->utilisateur_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    $conflitSalle = Seance::where('date', $request->date)
        ->where('room_id', $request->room_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    if ($conflitClasse || $conflitProf || $conflitSalle) {
        $raison = $conflitClasse ? 'Classe déjà réservée'
                : ($conflitProf  ? 'Professeur déjà réservé'
                : 'Salle déjà réservée');
        return response()->json([
            'success' => false,
            'message' => "Conflit détecté : $raison à ce créneau."
        ], 422);
    }

    $seance = Seance::create($request->all());
    return response()->json(['success' => true, 'data' => $seance], 201);
}

public function ModifierSeance(Request $request, $id)
{
    $request->validate([
        'classe_id'      => 'required',
        'utilisateur_id' => 'required',
        'matiere_id'     => 'required',
        'room_id'        => 'required',
        'date'           => 'required|date',
        'heure_debut'    => 'required',
        'heure_fin'      => 'required',
    ]);

    $seance = Seance::find($id);
    if (!$seance) {
        return response()->json(['success' => false, 'message' => 'Séance introuvable'], 404);
    }

    // condition de temps
    if ($request->heure_debut < '08:00' || $request->heure_fin > '18:30') {
        return response()->json([
            'success' => false,
            'message' => 'Les séances doivent être entre 08:00 et 18:30.'
        ], 422);
    }

    // heure_fin > heure_debut
    if ($request->heure_debut >= $request->heure_fin) {
        return response()->json([
            'success' => false,
            'message' => "L'heure de fin doit être après l'heure de début."
        ], 422);
    }

    // ✅ conflict detection
    $conflitClasse = Seance::where('id', '!=', $id)
        ->where('date', $request->date)
        ->where('classe_id', $request->classe_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    $conflitProf = Seance::where('id', '!=', $id)
        ->where('date', $request->date)
        ->where('utilisateur_id', $request->utilisateur_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    $conflitSalle = Seance::where('id', '!=', $id)
        ->where('date', $request->date)
        ->where('room_id', $request->room_id)
        ->where('heure_debut', '<', $request->heure_fin)
        ->where('heure_fin', '>', $request->heure_debut)
        ->exists();

    if ($conflitClasse || $conflitProf || $conflitSalle) {
        $raison = $conflitClasse ? 'Classe déjà réservée'
                : ($conflitProf  ? 'Professeur déjà réservé'
                : 'Salle déjà réservée');
        return response()->json([
            'success' => false,
            'message' => "Conflit détecté : $raison à ce créneau."
        ], 422);
    }

    $seance->update($request->all());
    return response()->json(['success' => true, 'data' => $seance]);
}
 //supprimer Seance
public function SupprimerSeance($id)
{
    $seance = Seance::find($id);
    if (!$seance) {
        return response()->json(['success' => false, 'message' => 'Seance introuvable'], 404);
    }
    $seance->delete();
    return response()->json(['success' => true, 'message' => 'Seance supprimée']);
}

//salles
public function getSalles() {
    return response()->json([
        'success' => true,
        'data' => Room::all() 
    ]);
}

}