<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EtudiantController;
use Illuminate\Support\Facades\Route;

// ------------------- Auth -------------------
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // ------------------- Admin -------------------
    Route::prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'getDashboardStats']);
        //crud pour les etufiants 
        Route::get('/Etudiants',[AdminController::class,'gestionEtudiants']);
        Route::post('/Etudiants/ajouter',[AdminController::class,'AjouterEtudiant']);
        Route::put('/Etudiants/modifier/{id}',[AdminController::class,'UpdateEtudiant']);
        Route::delete('/Etudiants/supprimer/{id}',[AdminController::class,'DeleteEtudiant']);

        //*********getClassesWithDetailedStats**** */

    Route::get('/classes',                                  [AdminController::class, 'getClassesAdmin']);
    Route::get('/etudiant/{id}/details',                   [AdminController::class, 'getEtudiantDetails']);
    Route::post('/classes/{classeId}/etudiants',           [AdminController::class, 'ajouterEtudiantClasse']);
    Route::delete('/classes/{classeId}/etudiants/{id}',    [AdminController::class, 'supprimerEtudiantClasse']);
    Route::get('/enseignants',                             [AdminController::class, 'getAllEnseignants']);
    Route::get('/matieres/{matiereId}/enseignants',        [AdminController::class, 'getEnseignantsParMatiere']);
    Route::put('/classes/{classeId}/enseignant',           [AdminController::class, 'modifierEnseignantMatiere']);
    Route::delete('/classes/{classeId}/matieres/{id}',     [AdminController::class, 'supprimerEnseignantMatiere']);
    Route::get('/etudiants-sans-classe',                   [AdminController::class, 'getEtudiantsSansClasse']);

        //*********CRUD Seances**** */
        Route::get('/seances',[AdminController::class,'getAllSeances']);
        //ajouter Seance
         Route::post('/seances/ajouter',[AdminController::class,'AjouteSeance']);
         //modifier Seance        
          Route::put('/seances/modifier/{id}',[AdminController::class,'ModifierSeance']);
        //supprimer Seance        
        Route::delete('/seances/supprimer/{id}',[AdminController::class,'SupprimerSeance']);

        //******************************CRUD ENSEIGNANT************************** */
        // CRUD Enseignants


    Route::get('/enseignants-admin',              [AdminController::class, 'getEnseignantsAdmin']);
    Route::get('/matieres-all',                   [AdminController::class, 'getAllMatieres']);
    Route::post('/enseignants-admin',             [AdminController::class, 'ajouterEnseignantAdmin']);
    Route::put('/enseignants-admin/{id}',         [AdminController::class, 'modifierEnseignantAdmin']);
    Route::delete('/enseignants-admin/{id}',      [AdminController::class, 'supprimerEnseignantAdmin']);
    Route::post('/enseignants-admin/{id}/classe', [AdminController::class, 'ajouterClasseEnseignant']);
    Route::put('/enseignants-admin/{id}/matieres', [AdminController::class, 'modifierMatiereEnseignant']);

        // *******************salles*************************
        Route::get('/salles', [AdminController::class, 'getSalles']);

    });

    // ------------------- Enseignant -------------------
    Route::prefix('enseignant')->group(function () {
        Route::get('/dashboard/{id}', [EnseignantController::class, 'getDashboardStats']);
        // CRUD Notes

Route::get('/classes', [EnseignantController::class, 'mesClassesAvecEtudiants']);
Route::get('/classes/{classeId}/notes', [EnseignantController::class, 'getListeNotes']);
Route::post('/notes/ajouter', [EnseignantController::class, 'ajouterNote']);
Route::put('/notes/modifier/{id}', [EnseignantController::class, 'modifierNote']);
Route::delete('/notes/supprimer/{id}', [EnseignantController::class, 'supprimerNote']);

// absences

Route::get('/seances', [EnseignantController::class, 'mesSeances']);
Route::get('/seances/{seanceId}/presences', [EnseignantController::class, 'getPresences']);
Route::post('/seances/{seanceId}/presences', [EnseignantController::class, 'enregistrerPresences']);

//emploi du temps
Route::get('/emploi-temps',[EnseignantController::class,'getEmploiDuTemps']);


    });


    // ------------------- Etudiant -------------------
  
Route::prefix('etudiants')->group(function () {

     Route::get('/dashboard/{id}', [EtudiantController::class, 'getEtudiantDashboard']);
     Route::get('/emploi-temps', [EtudiantController::class, 'getEmploiEtudiant']);
     Route::get('/MesAbsences', [EtudiantController::class, 'getMyAbsences']);
     Route::get('/MesNotes', [EtudiantController::class, 'getBulletinEtudiant']);

       
 });

  });