import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../auth/authSlice';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = selectCurrentToken(getState()) || Cookies.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Stats', 'Etudiants', 'EnseignantsAdmin', 'AdminClasses', 
    'Seances', 'salles', 'ClassesStats', 'Notes', 
    'EmploiDuTemps', 'Presences', 'Dashboard', 'SansClasse', 'EtudiantDetails'
  ],
  
  endpoints: (builder) => ({
    
    // ==========================================
    // AUTHENTICATION
    // ==========================================
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    // ==========================================
    // ADMIN : STATISTIQUES & DASHBOARD
    // ==========================================
    getStats: builder.query({
      query: (date) => ({
        url: '/admin/stats',
        method: 'GET',
        params: { date }
      }),
      providesTags: ['Stats']
    }),

    // ==========================================
    // ADMIN : GESTION DES ÉTUDIANTS (CRUD)
    // ==========================================
    getEtudiants: builder.query({
      query: () => '/admin/Etudiants',
      providesTags: ['Etudiants']
    }),
    addEtudiant: builder.mutation({
      query: (newEtudiant) => ({
        url: '/admin/Etudiants/ajouter',
        method: 'POST',
        body: newEtudiant
      }),
      invalidatesTags: ['Etudiants']
    }),
    updateEtudiant: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/admin/Etudiants/modifier/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Etudiants'],
    }),
    deleteEtudiant: builder.mutation({
      query: (id) => ({
        url: `/admin/Etudiants/supprimer/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Etudiants']
    }),
    getEtudiantDetails: builder.query({
      query: (id) => `/admin/etudiant/${id}/details`,
      providesTags: (result, error, id) => [{ type: 'EtudiantDetails', id }],
    }),

    // ==========================================
    // ADMIN : GESTION DES ENSEIGNANTS (CRUD)
    // ==========================================
    getEnseignantsAdmin: builder.query({
      query: () => '/admin/enseignants-admin',
      providesTags: ['EnseignantsAdmin'],
    }),
    getAllMatieres: builder.query({
      query: () => '/admin/matieres-all',
    }),
    ajouterEnseignantAdmin: builder.mutation({
      query: (body) => ({ url: '/admin/enseignants-admin', method: 'POST', body }),
      invalidatesTags: ['EnseignantsAdmin'],
    }),
    modifierEnseignantAdmin: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/admin/enseignants-admin/${id}`, method: 'PUT', body }),
      invalidatesTags: ['EnseignantsAdmin'],
    }),
    supprimerEnseignantAdmin: builder.mutation({
      query: (id) => ({ url: `/admin/enseignants-admin/${id}`, method: 'DELETE' }),
      invalidatesTags: ['EnseignantsAdmin'],
    }),
    modifierMatiereEnseignant: builder.mutation({
      query: ({ id, matiere_ids }) => ({
        url: `/admin/enseignants-admin/${id}/matieres`,
        method: 'PUT',
        body: { matiere_ids },
      }),
      invalidatesTags: ['EnseignantsAdmin'],
    }),

    // ==========================================
    // ADMIN : GESTION DES CLASSES & AFFECTATIONS
    // ==========================================
    getClassesAdmin: builder.query({
      query: () => '/admin/classes',
      providesTags: ['AdminClasses'],
    }),
    getClassesStats: builder.query({
      query: () => '/admin/classes',
      providesTags: ['ClassesStats'],
    }),
    getEnseignantsParMatiere: builder.query({
      query: (matiereId) => `/admin/matieres/${matiereId}/enseignants`,
    }),
    getEtudiantsSansClasse: builder.query({
      query: () => '/admin/etudiants-sans-classe',
      providesTags: ['SansClasse'],
    }),
    ajouterEtudiantClasse: builder.mutation({
      query: ({ classeId, etudiant_id }) => ({
        url: `/admin/classes/${classeId}/etudiants`,
        method: 'POST',
        body: { etudiant_id },
      }),
      invalidatesTags: ['AdminClasses', 'SansClasse'],
    }),
    supprimerEtudiantClasse: builder.mutation({
      query: ({ classeId, etudiantId }) => ({
        url: `/admin/classes/${classeId}/etudiants/${etudiantId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminClasses'],
    }),
    modifierEnseignantMatiere: builder.mutation({
      query: ({ classeId, matiere_id, enseignant_id }) => ({
        url: `/admin/classes/${classeId}/enseignant`,
        method: 'PUT',
        body: { matiere_id, enseignant_id },
      }),
      invalidatesTags: ['AdminClasses'],
    }),
    supprimerEnseignantMatiere: builder.mutation({
      query: ({ classeId, matiereId }) => ({
        url: `/admin/classes/${classeId}/matieres/${matiereId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminClasses'],
    }),

    // ==========================================
    // ADMIN : GESTION DES SÉANCES & SALLES (CRUD)
    // ==========================================
    getSeances: builder.query({
      query: () => '/admin/seances',
      providesTags: ['Seances'],
    }),
    addSeance: builder.mutation({
      query: (newSeance) => ({
        url: '/admin/seances/ajouter',
        method: 'POST',
        body: newSeance,
      }),
      invalidatesTags: ['Seances','Stats'],
    }),
    updateSeance: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/admin/seances/modifier/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Seances','Stats'],
    }),
    deleteSeance: builder.mutation({
      query: (id) => ({
        url: `/admin/seances/supprimer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Seances','Stats'],
    }),
    getSalles: builder.query({
      query: () => '/admin/salles',
      providesTags: ['salles'],
    }),

    // ==========================================
    // ENSEIGNANT : DASHBOARD & PLANNING
    // ==========================================
    getDashboardStats: builder.query({
      query: (id) => `/enseignant/dashboard/${id}`,
      providesTags: ['Dashboard'],
    }),
    getEmploiDuTemps: builder.query({
      query: () => '/enseignant/emploi-temps',
      providesTags: ['EmploiDuTemps'],
    }),

    // ==========================================
    // ENSEIGNANT : PRÉSENCES
    // ==========================================
    getMesSeances: builder.query({
      query: (date) => `/enseignant/seances?date=${date}`,
      providesTags: ['Seances'],
    }),
    getPresences: builder.query({
      query: (seanceId) => `/enseignant/seances/${seanceId}/presences`,
      providesTags: ['Presences'],
    }),
    enregistrerPresences: builder.mutation({
      query: ({ seanceId, presences }) => ({
        url: `/enseignant/seances/${seanceId}/presences`,
        method: 'POST',
        body: { presences },
      }),
      invalidatesTags: ['Presences'],
    }),

    // ==========================================
    // ENSEIGNANT : GESTION DES NOTES
    // ==========================================
    getClasses: builder.query({
      query: () => '/enseignant/classes',
      providesTags: ['ClassesStats'],
    }),
    getListeNotes: builder.query({
      query: (classeId) => `/enseignant/classes/${classeId}/notes`,
      providesTags: ['Notes'],
    }),
    ajouterNote: builder.mutation({
      query: (data) => ({
        url: '/enseignant/notes/ajouter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notes'],
    }),
    modifierNote: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/enseignant/notes/modifier/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Notes'],
    }),
    supprimerNote: builder.mutation({
      query: (id) => ({
        url: `enseignant/notes/supprimer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),

    // ==========================================
    // ÉTUDIANT : DASHBOARD & INFOS PERSO
    // ==========================================
    getEtudiantDashboard: builder.query({
      query: (id) => `/etudiants/dashboard/${id}`,
      providesTags: ['Stats'],
    }),
    getEmploiEtudiant: builder.query({
      query: () => '/etudiants/emploi-temps',
      providesTags: ['EmploiDuTemps'],
    }),
    getMesAbsences: builder.query({
      query: () => '/etudiants/MesAbsences',
      providesTags: ['Presences'],
    }),
    getBulletinNotes: builder.query({
      query: () => '/etudiants/MesNotes',
      providesTags: ['Notes'],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useLogoutMutation,

  // Admin Stats
  useGetStatsQuery,

  // Admin Étudiants
  useGetEtudiantsQuery,
  useAddEtudiantMutation,
  useUpdateEtudiantMutation,
  useDeleteEtudiantMutation,
  useGetEtudiantDetailsQuery,
  useGetEtudiantsSansClasseQuery,

  // Admin Enseignants
  useGetEnseignantsAdminQuery,
  useGetAllMatieresQuery,
  useAjouterEnseignantAdminMutation,
  useModifierEnseignantAdminMutation,
  useSupprimerEnseignantAdminMutation,
  useModifierMatiereEnseignantMutation,

  // Admin Classes
  useGetClassesStatsQuery,
  useGetClassesAdminQuery,
  useAjouterEtudiantClasseMutation,
  useSupprimerEtudiantClasseMutation,
  useModifierEnseignantMatiereMutation,
  useSupprimerEnseignantMatiereMutation,
  useGetEnseignantsParMatiereQuery,

  // Admin Séances & Salles
  useGetSeancesQuery,
  useAddSeanceMutation,
  useUpdateSeanceMutation,
  useDeleteSeanceMutation,
  useGetSallesQuery,

  // Enseignant
  useGetDashboardStatsQuery,
  useGetEmploiDuTempsQuery,
  useGetMesSeancesQuery,
  useGetPresencesQuery,
  useEnregistrerPresencesMutation,
  useGetClassesQuery,
  useGetListeNotesQuery,
  useAjouterNoteMutation,
  useModifierNoteMutation,
  useSupprimerNoteMutation,

  // Étudiant
  useGetEtudiantDashboardQuery,
  useGetEmploiEtudiantQuery,
  useGetMesAbsencesQuery,
  useGetBulletinNotesQuery,
} = apiSlice;