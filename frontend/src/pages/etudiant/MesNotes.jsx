import React from 'react';
import { useGetBulletinNotesQuery } from '../../features/api/apiSlice';
import { FileText, Calculator, Award, BookOpen, AlertCircle } from 'lucide-react';

// MesNotes : Composant qui affiche le bulletin de notes complet de l'étudiant
const MesNotes = () => {

  // useGetBulletinNotesQuery : Récupère le relevé de notes global
  // Description : Cette requête retourne la liste des notes par matière ainsi que la moyenne générale
  const { data, isLoading, isError } = useGetBulletinNotesQuery();

  const bulletin = data?.data?.bulletin || [];
  const moyenneGenerale = data?.data?.moyenne_generale || 0;

  // getNoteColor : Détermine la couleur de la note selon sa valeur
  const getNoteColor = (note) => {
    if (note === '--') return 'text-slate-300';
    return Number(note) >= 10 ? 'text-emerald-600 font-black' : 'text-red-500 font-black';
  };

  // getMoyenneStyle : Applique un style spécifique au badge de la moyenne
  const getMoyenneStyle = (moy) => {
    if (moy === '--') return 'bg-slate-100 text-slate-400';
    return Number(moy) >= 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002f56]"></div>
        <span className="ml-3 font-black text-[#002f56] uppercase italic text-[10px]">Chargement...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 font-black uppercase text-[10px]">Erreur de chargement</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- Section : Header du Bulletin --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#002f56] p-8 rounded-[2.5rem] shadow-2xl border-b-8 border-[#f39200] gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#f39200] p-2 rounded-xl">
              <FileText className="text-[#002f56] h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter m-0">
              Relevé de Notes
            </h1>
          </div>
          <p className="text-slate-300 font-bold text-[10px] uppercase tracking-[0.4em] pl-1">
            Session Académique 2024 - 2025
          </p>
        </div>

        {/* Bloc Moyenne Générale */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl flex items-center gap-4 min-w-[220px]">
          <div className="bg-[#f39200] p-3 rounded-2xl shadow-lg">
            <Award className="text-[#002f56] h-7 w-7" />
          </div>
          <div>
            <p className="text-[#f39200] text-[9px] font-black uppercase tracking-widest">Moyenne Générale</p>
            <p className="text-3xl font-black text-white">
              {moyenneGenerale} <span className="text-sm opacity-50">/ 20</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Section : Tableau des Résultats --- */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#002442] text-white">
                <th className="p-5 text-left text-[9px] font-black uppercase tracking-widest">Matière</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-widest border-l border-white/10">Coeff.</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-widest border-l border-white/10 text-[#f39200]">Contrôle 1</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-widest border-l border-white/10 text-[#f39200]">Contrôle 2</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-widest border-l border-white/10 text-[#f39200]">Contrôle 3</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-widest border-l border-white/10 bg-[#f39200] text-[#002f56]">Moyenne / 20</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {bulletin.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Aucune note disponible
                  </td>
                </tr>
              ) : (
                /* Boucle sur les matières pour afficher les détails de chaque note */
                bulletin.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                    
                    {/* Nom de la Matière */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#002f56] transition-colors duration-300">
                          <BookOpen className="h-4 w-4 text-[#002f56] group-hover:text-white" />
                        </div>
                        <span className="text-sm font-black text-[#002f56] uppercase tracking-tight">{item.matiere}</span>
                      </div>
                    </td>

                    {/* Coefficient de la matière */}
                    <td className="p-5 text-center border-l border-slate-50">
                      <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[11px] font-black text-slate-500">
                        x{item.coefficient}
                      </span>
                    </td>

                    {/* Notes des trois examens */}
                    <td className="p-5 text-center border-l border-slate-50">
                      <span className={`text-sm ${getNoteColor(item.examen1)}`}>{item.examen1}</span>
                    </td>
                    <td className="p-5 text-center border-l border-slate-50">
                      <span className={`text-sm ${getNoteColor(item.examen2)}`}>{item.examen2}</span>
                    </td>
                    <td className="p-5 text-center border-l border-slate-50">
                      <span className={`text-sm ${getNoteColor(item.examen3)}`}>{item.examen3}</span>
                    </td>

                    {/* Moyenne calculée pour la matière */}
                    <td className="p-5 text-center border-l border-slate-50 bg-[#f39200]/5">
                      <div className={`text-base font-black px-4 py-2 rounded-2xl inline-block ${getMoyenneStyle(item.moyenne_matiere)}`}>
                        {item.moyenne_matiere}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Section : Footer d'information --- */}
      <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-dashed border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-[#f39200] h-5 w-5" />
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] m-0">
            Moyenne calculée sur 3 contrôles — (C1 + C2 + C3) / 3
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#002f56] opacity-40">
          <Calculator className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-widest italic">EduManage v2.0</span>
        </div>
      </div>

    </div>
  );
};

export default MesNotes;