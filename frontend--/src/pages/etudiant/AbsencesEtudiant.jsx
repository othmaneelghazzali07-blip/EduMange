import React from 'react';
import { useGetMesAbsencesQuery } from '../../features/api/apiSlice';
import { CalendarDays, Clock, User, BookOpen, MapPin } from 'lucide-react';

// AbsencesEtudiant : Affiche la liste des absences et retards d'un étudiant
const AbsencesEtudiant = () => {
  
  // useGetMesAbsencesQuery : Récupère les données d'absences depuis l'API
  // Description : Appelle le endpoint pour obtenir l'historique d'assiduité de l'étudiant connecté
  const { data, isLoading } = useGetMesAbsencesQuery();
  
  const absences = data?.data || [];

  if (isLoading) return (
    <div className="p-10 text-center font-black text-[#002f56] animate-pulse tracking-widest uppercase text-[10px]">
      Chargement...
    </div>
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      
      {/* En-tête de la page */}
      <div>
        <h1 className="text-xl font-black text-[#002f56] uppercase italic tracking-tighter">
          Mes Absences
        </h1>
        <p className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.2em] mt-0.5">
          Suivi & Assiduité
        </p>
      </div>

      {/* Affichage conditionnel : Message vide ou Tableau des données */}
      {absences.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <CalendarDays className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Aucune absence enregistrée
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              
              <thead>
                <tr className="bg-[#002442] text-white">
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-left border-r border-white/10">
                    Séance Info
                  </th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-left border-r border-white/10">
                    Matière & Prof
                  </th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-center border-r border-white/10">
                    Salle
                  </th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-center text-[#f39200]">
                    Statut
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {/* Boucle sur la liste des absences pour générer les lignes du tableau */}
                {absences.map((abs) => (
                  <tr key={abs.id} className="hover:bg-slate-50/50 transition-all">

                    {/* Section : Date et Heure de la séance */}
                    <td className="p-4 border-r border-slate-50">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="h-4 w-4 text-[#f39200] shrink-0" />
                        <div>
                          <p className="text-xs font-black text-[#002f56]">
                            {abs.seance?.date}
                          </p>
                          <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {abs.seance?.heure_debut?.slice(0, 5)} – {abs.seance?.heure_fin?.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Section : Détails de la Matière et de l'Enseignant */}
                    <td className="p-4 border-r border-slate-50">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-[#002f56] shrink-0" />
                          <span className="text-xs font-black text-[#002f56] uppercase">
                            {abs.seance?.matiere?.nom_matiere}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="text-[10px] font-bold text-slate-400 italic">
                            Pr. {abs.seance?.enseignant?.utilisateur?.nom} {abs.seance?.enseignant?.utilisateur?.prenom}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Section : Emplacement (Salle) */}
                    <td className="p-4 border-r border-slate-50 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-black text-[#002f56] uppercase">
                          {abs.seance?.room?.salle ?? '–'}
                        </span>
                      </div>
                    </td>

                    {/* Section : Statut (Absent ou Retard) */}
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        abs.status === 'late'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {abs.status === 'late' ? '⚠ Retard' : '✖ Absent'}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AbsencesEtudiant;