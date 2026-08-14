<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use App\Models\Enseignant;
use App\Models\Etudiant;
use App\Models\Note;
use App\Models\Presence;
use App\Models\Seance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EnseignantController extends Controller
{
    /**
     * getDashboardStats : Récupère les statistiques du tableau de bord pour un enseignant.
     * Query : Récupère toutes les séances de l'enseignant avec les relations classe, matière et salle.
     * Description : Filtre les séances pour n'extraire que celles d'aujourd'hui et liste les classes uniques de l'enseignant.
     */
    public function getDashboardStats($id)
    {
        try {
              $etudiant = Etudiant::where('utilisateur_id', $id)->first();
            $today = Carbon::today()->toDateString();

            $allSeances = Seance::where('utilisateur_id', $id)
                ->with(['classe', 'matiere', 'room'])
                ->get();

            $seancesAujourdhui = $allSeances->where('date', $today)->values();

            $mesClasses = $allSeances->pluck('classe')
                ->filter()
                ->unique('id')
                ->values();

            return response()->json([
                'status' => 'success',
                'data'   => [
                    'seances_aujourdhui' => $seancesAujourdhui,
                    'mes_classes'        => $mesClasses
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Erreur lors de la récupération : ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * mesClassesAvecEtudiants : Liste les classes et les étudiants affectés à l'enseignant.
     * Query : Récupère les séances pour identifier les classes, puis charge les étudiants et matières liés.
     */
public function mesClassesAvecEtudiants()
{
    $enseignant = Auth::user()->enseignant;

    if (!$enseignant) {
        return response()->json(['error' => 'Enseignant non trouvé'], 404);
    }

    $enseignantId = $enseignant->utilisateur_id;

    $classeIds = DB ::table('classe_matiere')
        ->where('enseignant_id', $enseignantId)
        ->pluck('classe_id')
        ->unique();

    $classes = Classe::whereIn('id', $classeIds)
        ->with(['etudiants.utilisateur:id,nom,prenom'])
        ->get()
        ->map(function ($c) use ($enseignantId) {
            $matieres = DB::table('classe_matiere')
                ->where('classe_id', $c->id)
                ->where('enseignant_id', $enseignantId)
                ->join('matieres', 'classe_matiere.matiere_id', '=', 'matieres.id')
                ->select('matieres.id', 'matieres.nom_matiere', 'matieres.coefficient')
                ->get();

            return [
                'id'         => $c->id,
                'nom_classe' => $c->nom_classe,
                'niveau'     => $c->niveau,
                'matieres'   => $matieres,
                'etudiants'  => $c->etudiants->map(fn($e) => [
                    'id'     => $e->id,
                    'nom'    => $e->utilisateur->nom,
                    'prenom' => $e->utilisateur->prenom,
                    'CNE'    => $e->CNE,
                ])
            ];
        })
        ->values();

    return response()->json($classes);
}

    /**
     * ajouterNote : Enregistre une nouvelle note pour un étudiant.
     * Mutation : Crée une entrée dans la table 'notes' après validation.
     */
    public function ajouterNote(Request $request)
    {
        $enseignant = Auth::user()->enseignant;

        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant non trouvé'], 403);
        }

        $request->validate([
            'etudiant_id' => 'required|exists:etudiants,id',
            'matiere_id'  => 'required|exists:matieres,id',
            'note'        => 'required|numeric|min:0|max:20',
            'type_examen' => 'required|in:examen1,examen2,examen3',
        ]);

        $exists = Note::where('etudiant_id', $request->etudiant_id)
            ->where('matiere_id', $request->matiere_id)
            ->where('type_examen', $request->type_examen)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Note déjà enregistrée'], 409);
        }

        $note = Note::create([
            'etudiant_id'   => $request->etudiant_id,
            'matiere_id'    => $request->matiere_id,
            'enseignant_id' => $enseignant->utilisateur_id,
            'note'          => $request->note,
            'type_examen'   => $request->type_examen,
        ]);

        return response()->json($note, 201);
    }

    /**
     * modifierNote : Met à jour une note existante.
     * Mutation : Modifie la valeur 'note' d'une entrée spécifique.
     */
    public function modifierNote(Request $request, $id)
    {
        $request->validate([
            'note' => 'required|numeric|min:0|max:20',
        ]);

        $note = Note::findOrFail($id);
        $note->update(['note' => $request->note]);

        return response()->json($note);
    }

    /**
     * supprimerNote : Supprime une note de la base de données.
     * Mutation : Supprime l'enregistrement si l'enseignant est bien le propriétaire.
     */
    public function supprimerNote($id)
    {
        $enseignant = Auth::user()->enseignant;

        $note = Note::where('id', $id)
            ->where('enseignant_id', $enseignant->utilisateur_id)
            ->firstOrFail();

        $note->delete();

        return response()->json(['message' => 'Note supprimée']);
    }

    /**
     * getListeNotes : Récupère la liste des étudiants d'une classe avec leurs notes respectives.
     * Query : Filtre les notes par matière et par enseignant connecté.
     */
public function getListeNotes($classeId)
{
    $enseignant = Auth::user()->enseignant;

    $matiereIds = Seance::where('utilisateur_id', $enseignant->utilisateur_id)
        ->where('classe_id', $classeId)
        ->pluck('matiere_id')
        ->unique();

    $etudiants = Etudiant::where('classe_id', $classeId)
        ->with([
            'utilisateur:id,nom,prenom',
            'notes' => fn($q) => $q->whereIn('notes.matiere_id', $matiereIds)
        ])
        ->get()
        ->map(fn($e) => [
            'id'     => $e->id,
            'nom'    => $e->utilisateur->nom,
            'prenom' => $e->utilisateur->prenom,
            'CNE'    => $e->CNE,
         
            'notes'  => $e->notes->values(),
        ]);

    return response()->json($etudiants);
}

    /**
     * mesSeances : Récupère le planning des séances de l'enseignant pour une date donnée.
     * Query : Liste les séances chronologiquement selon la date fournie.
     */
    public function mesSeances(Request $request)
    {
        $enseignant = Auth::user()->enseignant;
        $date = $request->date ?? Carbon::today()->toDateString();

        $seances = Seance::with(['classe', 'matiere'])
            ->where('utilisateur_id', $enseignant->utilisateur_id)
            ->where('date', $date)
            ->orderBy('heure_debut')
            ->get();

        return response()->json($seances);
    }

    /**
     * getPresences : Récupère l'état de présence des étudiants pour une séance spécifique.
     * Query : Charge les étudiants de la classe et croise avec les données de présence existantes.
     */
    public function getPresences($seanceId)
    {
        $seance = Seance::findOrFail($seanceId);

        $etudiants = Etudiant::where('classe_id', $seance->classe_id)
            ->with('utilisateur:id,nom,prenom')
            ->get();

        $presences = Presence::where('seance_id', $seanceId)
            ->get()
            ->keyBy('utilisateur_id');

        $result = $etudiants->map(function ($etudiant) use ($presences) {
            $presence = $presences->get($etudiant->id);
            return [
                'id'          => $etudiant->id,
                'nom'         => $etudiant->utilisateur->nom,
                'prenom'      => $etudiant->utilisateur->prenom,
                'CNE'         => $etudiant->CNE,
                'presence_id' => $presence?->id,
                'status'      => $presence?->status ?? 'present',
                'observation' => $presence?->observation ?? '',
            ];
        });

        return response()->json($result);
    }

    /**
     * enregistrerPresences : Enregistre ou met à jour l'appel (présences/absences).
     * Mutation : Utilise updateOrCreate pour chaque étudiant de la liste reçue.
     */
    public function enregistrerPresences(Request $request, $seanceId)
    {
        $request->validate(['presences' => 'required|array']);
        $presences = $request->input('presences', []);

        foreach ($presences as $p) {
            $etudiant = Etudiant::find($p['etudiant_id']);
            if (!$etudiant) continue;

            // Enregistrement un par un dans la boucle
            Presence::updateOrCreate(
                [
                    'seance_id'      => $seanceId,
                    'utilisateur_id' => $etudiant->id,
                ],
                [
                    'status'      => $p['status'] ?? 'present',
                    'observation' => $p['observation'] ?? null,
                ]
            );
        }

        return response()->json(['message' => 'Présences enregistrées avec succès !']);
    }

    /**
     * emploiDuTemps : Récupère l'intégralité du calendrier de cours de l'enseignant.
     * Query : Extrait toutes les séances liées à l'identifiant de l'enseignant.
     */
public function getEmploiDuTemps(Request $request)
{
    $enseignant = Auth::user()->enseignant;

    if (!$enseignant) {
        return response()->json(['error' => 'Enseignant introuvable'], 404);
    }

    $weekOffset = (int) $request->query('week', 0);

    $debutSemaine = Carbon::now()
        ->addWeeks($weekOffset)
        ->startOfWeek(Carbon::MONDAY)
        ->toDateString();

    $finSemaine = Carbon::now()
        ->addWeeks($weekOffset)
        ->endOfWeek(Carbon::SATURDAY)
        ->toDateString();

    $seances = Seance::with(['classe', 'matiere', 'room'])
        ->where('utilisateur_id', $enseignant->utilisateur_id)
        ->whereBetween('date', [$debutSemaine, $finSemaine])
        ->get();

    return response()->json($seances);
}
}