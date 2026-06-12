<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Utilisateur;

class AuthController extends Controller
{
    /**
     * login : Gère l'authentification et la génération du jeton d'accès (Token).
     * * Query : Recherche l'utilisateur par son email dans la table 'utilisateurs'.
     * Description : Vérifie si l'utilisateur existe et si le mot de passe est correct, 
     * puis génère un token Sanctum pour sécuriser la session.
     */
    public function login(Request $request) 
    {
        // Validation des données entrantes
        $data = $request->validate([
            'email'        => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        // Recherche de l'utilisateur via Eloquent
        $utilisateur = Utilisateur::where('email', $data['email'])->first();

        // Vérification de l'existence et du mot de passe haché
        if (!$utilisateur || !Hash::check($data['mot_de_passe'], $utilisateur->mot_de_passe)) {
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        // Création d'un nouveau Token personnel via Laravel Sanctum
        $token = $utilisateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token'   => $token,
            'user'    => $utilisateur
        ]);
    }

    /**
     * logout : Déconnecte l'utilisateur en révoquant ses accès.
     * * Mutation : Supprime tous les jetons de l'utilisateur actuellement authentifié.
     * Description : Invalide la session actuelle pour empêcher toute reconnexion sans mot de passe.
     */
    public function logout(Request $request) 
    {
        // Suppression de tous les tokens de l'utilisateur dans la base de données
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * me : Retourne les informations de l'utilisateur connecté.
     * * Query : Récupère les données du profil de l'utilisateur via le middleware auth:sanctum.
     * Description : Permet au front-end de synchroniser les données de l'utilisateur actuel.
     */
    public function me(Request $request) 
    {
        // Retourne les données stockées dans l'objet User de la requête
        return response()->json($request->user());
    }
}