<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\Matiere;
use App\Models\Note;
use App\Models\Presence;
use App\Models\Seance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class EtudiantController extends Controller
{
    /**
     * getEtudiantDashboard : Récupère les statistiques et les infos de base pour l'étudiant.
     * Query : Recherche le profil étudiant associé à l'utilisateur connecté.
     * Description : Calcule le nombre d'absences, de retards et génère une note de conduite automatique.
     */
    public function getEtudiantDashboard($id)
{
    try {
        $etudiant = Etudiant::where('utilisateur_id', $id)
            ->with(['classe', 'utilisateur'])
            ->first();

        if (!$etudiant) {
            return response()->json(['status' => 'error', 'message' => 'Profil non trouvé'], 404);
        }

        $today = Carbon::today()->toDateString();

        $seancesAujourdhui = Seance::where('classe_id', $etudiant->classe_id)
            ->where('date', $today)
            ->with(['matiere', 'room'])
            ->get()
            ->map(fn($s) => [
                'matiere'     => $s->matiere->nom_matiere ?? 'N/A',
                'heure_debut' => $s->heure_debut,
                'heure_fin'   => $s->heure_fin,
                'salle'       => $s->room->salle ?? 'N/A',
            ]);

        $nbAbsences   = $etudiant->presences()->where('status', 'absent')->count();
        $nbRetards    = $etudiant->presences()->where('status', 'late')->count();
        $noteConduite = max(0, 20 - ($nbAbsences * 1) - ($nbRetards * 0.5));

        return response()->json([
            'status' => 'success',
            'data'   => [
                'infos_personnelles' => [
                    'nom'    => $etudiant->utilisateur->nom,
                    'prenom' => $etudiant->utilisateur->prenom,
                    'cne'    => $etudiant->CNE,
                    'classe' => $etudiant->classe->nom_classe ?? 'Non assignée',
                ],
                'stats_discipline'   => [
                    'nb_absences'   => $nbAbsences,
                    'nb_retards'    => $nbRetards,
                    'note_conduite' => $noteConduite
                ],
                'seances_aujourdhui' => $seancesAujourdhui
            ]
        ], 200);

    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
}

    /**
     * getEmploiEtudiant : Récupère l'emploi du temps complet de l'étudiant.
     * Query : Filtre les séances par le 'classe_id' de l'étudiant.
     * Description : Charge les relations matière, enseignant et salle pour l'affichage du planning.
     */
   public function getEmploiEtudiant(Request $request)
{
    try {
        $user     = auth()->user();
        $etudiant = Etudiant::where('utilisateur_id', $user->id)->first();

        if (!$etudiant) {
            return response()->json(['message' => 'Profil non trouvé'], 404);
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

        $schedule = Seance::where('classe_id', $etudiant->classe_id)
            ->with(['matiere', 'enseignant.utilisateur', 'room'])
            ->whereBetween('date', [$debutSemaine, $finSemaine])
            ->orderBy('date', 'asc')
            ->orderBy('heure_debut', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $schedule
        ], 200);

    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}

    /**
     * getMyAbsences : Liste tous les manquements (absences et retards) de l'étudiant.
     * Query : Recherche dans la table 'presences' via l'identifiant de l'étudiant.
     * Description : Fournit le détail de chaque absence incluant la matière et le professeur concerné.
     */
    public function getMyAbsences()
    {
        try {
            $user = auth()->user();
            $etudiant = Etudiant::where('utilisateur_id', $user->id)->first();

            if (!$etudiant) {
                return response()->json(['message' => 'Profil non trouvé'], 404);
            }

            $absences = Presence::where('utilisateur_id', $etudiant->id)
                ->whereIn('status', ['absent', 'late'])
                ->with([
                    'seance.matiere',
                    'seance.enseignant.utilisateur',
                    'seance.room'
                ])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data'   => $absences
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * getBulletinEtudiant : Génère le relevé de notes et calcule la moyenne générale.
     * Query : Récupère les matières liées à la classe et les notes correspondantes à l'étudiant.
     * Description : Calcule la moyenne pondérée de chaque matière et la moyenne globale du semestre.
     */
public function getBulletinEtudiant()
{
    try {
        $user = auth()->user();
        $etudiant = Etudiant::where('utilisateur_id', $user->id)
            ->with('classe')
            ->first();

        if (!$etudiant || !$etudiant->classe) {
            return response()->json(['status' => 'error', 'message' => 'Classe non assignée'], 404);
        }

        // relation seance
        $matieres = Matiere::whereHas('seances', function($q) use ($etudiant) {
            $q->where('classe_id', $etudiant->classe_id);
        })->get();

        // relation class 
        if ($matieres->isEmpty()) {
            $matieres = Matiere::whereHas('classes', function($q) use ($etudiant) {
                $q->where('classes.id', $etudiant->classe_id);
            })->get();
        }

        $totalPondere    = 0;
        $sommeCoeff      = 0;
        $toutesNotesSaisies = true;

        $bulletin = $matieres->map(function ($matiere) use ($etudiant, &$totalPondere, &$sommeCoeff, &$toutesNotesSaisies) {

            $notes = Note::where('etudiant_id', $etudiant->id)
                ->where('matiere_id', $matiere->id)
                ->get()
                ->keyBy('type_examen');

            $n1 = isset($notes['examen1']) ? (float)$notes['examen1']->note : null;
            $n2 = isset($notes['examen2']) ? (float)$notes['examen2']->note : null;
            $n3 = isset($notes['examen3']) ? (float)$notes['examen3']->note : null;

            if ($n1 === null || $n2 === null || $n3 === null) {
                $toutesNotesSaisies = false;
            }

            $moyenneMatiere = ($n1 !== null && $n2 !== null && $n3 !== null)
                ? round(($n1 + $n2 + $n3) / 3, 2)
                : null;

            $coeff = $matiere->coefficient ?? 1;

            if ($moyenneMatiere !== null) {
                $totalPondere += $moyenneMatiere * $coeff;
                $sommeCoeff   += $coeff;
            }

            return [
                'id'              => $matiere->id,
                'matiere'         => $matiere->nom_matiere,
                'coefficient'     => $coeff,
                'examen1'         => $n1 ?? '--',
                'examen2'         => $n2 ?? '--',
                'examen3'         => $n3 ?? '--',
                'moyenne_matiere' => $moyenneMatiere ?? '--',
            ];
        });

        $moyenneGenerale = ($toutesNotesSaisies && $sommeCoeff > 0)
            ? round($totalPondere / $sommeCoeff, 2)
            : '--';

        return response()->json([
            'status' => 'success',
            'data'   => [
                'bulletin'         => $bulletin,
                'moyenne_generale' => $moyenneGenerale,
                'complet'          => $toutesNotesSaisies
            ]
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status'  => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
}
}