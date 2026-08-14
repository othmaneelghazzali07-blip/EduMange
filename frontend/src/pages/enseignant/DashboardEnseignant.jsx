import React from 'react';
import { useGetDashboardStatsQuery } from '../../features/api/apiSlice';
import { useSelector } from 'react-redux';

// ==========================================
// Composant : DashboardEnseignant
// Affiche le résumé quotidien, l'emploi du temps 
// et les classes assignées à l'enseignant.
// ==========================================
const DashboardEnseignant = () => {
  // Récupération des informations de l'enseignant depuis le store Redux
  const { user } = useSelector((state) => state.auth);
  
  // Appel API pour récupérer les statistiques via le hook auto-généré
  const { data, isLoading, isError } = useGetDashboardStatsQuery(user?.id);

  // Gestion de l'état de chargement
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-bounce font-black text-blue-600 text-2xl tracking-tighter uppercase italic">
        Chargement du Dashboard...
      </div>
    </div>
  );

  // Gestion des erreurs d'affichage
  if (isError) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2rem] text-center">
        <p className="text-red-600 font-black uppercase italic tracking-tight">
          Erreur lors de la récupération des données.
        </p>
      </div>
    </div>
  );

  const stats = data?.data;

  return (
    <div className="p-3 md:p-10 max-w-7xl mx-auto space-y-4 bg-gray-40/30 min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* --- Section 1: Header --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-white pb-6">
        <div className="animate-in slide-in-from-left duration-700">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
            Bonjour, <span className="text-blue-600">Pr. {user?.nom}</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.4em] mt-4 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-blue-600"></span> 
            Tableau de Bord Académique
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 min-w-[200px] text-center">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Date du jour</p>
          <p className="font-black text-gray-800 text-lg uppercase">
            {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- Section 2: Séances du Jour --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">
              Emploi du temps (Aujourd'hui)
            </h2>
          </div>

          <div className="grid gap-6">
            {stats?.seances_aujourdhui?.length > 0 ? (
              stats.seances_aujourdhui.map((seance) => (
                <div key={seance.id} 
                  className="group relative bg-white p-8 rounded-[2.5rem] border-2 border-transparent hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-2xl flex items-center justify-between overflow-hidden">
                  
                  {/* Effet visuel au survol */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex items-center gap-8 relative z-10">
                    <div className="bg-blue-600 text-white w-20 h-20 rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-blue-200">
                      <span className="text-[10px] font-black uppercase opacity-70">Heure</span>
                      <span className="text-xl font-black leading-none mt-1">{seance.heure_debut?.slice(0, 5)}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-black text-2xl text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {seance.matiere?.nom_matiere}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {seance.classe?.nom_classe}
                        </span>
                        <span className="text-gray-300 font-bold">•</span>
                        <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">
                          Salle: {seance.room?.salle || seance.room?.name || seance.room_id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-end relative z-10">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Statut</span>
                     <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full border border-green-100">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase">Confirmé</span>
                     </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border-4 border-dashed border-gray-100 p-16 rounded-[3rem] text-center">
                <p className="text-gray-300 font-black italic text-xl uppercase tracking-tighter">
                  Aucune séance prévue pour aujourd'hui
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Section 3: Liste des Classes --- */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-8 bg-gray-900 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Mes Classes</h2>
          </div>

          <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-10 -mt-10"></div>
            
            <div className="space-y-8 relative z-10">
              {stats?.mes_classes?.map((classe) => (
                <div key={classe.id} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 last:border-0">
                  <div>
                    <h5 className="font-black text-xl uppercase group-hover:text-blue-400 transition-colors tracking-tight">
                      {classe.nom_classe}
                    </h5>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">
                      {classe.niveau || 'Niveau non défini'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Section Statistiques en pied de carte */}
            <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-2 gap-6 relative z-10">
              <div>
                <p className="text-4xl font-black text-blue-500 tracking-tighter">{stats?.mes_classes?.length || 0}</p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Total Classes</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white tracking-tighter">{stats?.seances_aujourdhui?.length || 0}</p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Séances / Jour</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardEnseignant;