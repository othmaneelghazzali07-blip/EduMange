import React, { useState } from 'react';
import { useGetStatsQuery } from '../../features/api/apiSlice';
import { 
    Users, 
    School, 
    GraduationCap, 
    Calendar,
    Clock,
    MapPin,
    ArrowRight
} from 'lucide-react';

const DashboardAdmin = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const { data, isLoading, error } = useGetStatsQuery(selectedDate);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Chargement des données...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="p-8 my-6 bg-red-50 border border-red-100 rounded-xl text-center text-red-600 font-semibold text-sm">
            Impossible de charger les statistiques. Veuillez vérifier votre connexion.
        </div>
    );

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto p-2">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-100">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tableau de Bord</h1>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">Vue d'ensemble globale de la plateforme</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { label: 'Classes & Ressources', value: data?.ClasseState?.NombreClasses, icon: School, color: '#4f46e5', bg: 'bg-indigo-50' },
                    { label: 'Corps Enseignant', value: data?.EnseignantsState, icon: Users, color: '#0d9488', bg: 'bg-teal-50' },
                    { label: 'Étudiants Inscrits', value: data?.EtudiantsState, icon: GraduationCap, color: '#6366f1', bg: 'bg-violet-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 ${stat.bg} rounded-xl`}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded">Global</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value || 0}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Emploi du Temps */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-1 bg-indigo-600 rounded-full"></div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Emploi du temps du jour</h2>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)} 
                                className="bg-transparent border-none text-xs font-bold text-slate-700 outline-none cursor-pointer focus:ring-0 p-0"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/70 border-b border-slate-100">
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horaire</th>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matière & Staff</th>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Localisation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data?.seances?.map((seance) => (
                                        <tr key={seance.id} className="hover:bg-slate-50/40 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                    </div>
                                                    {seance.heure_debut.slice(0, 5)} - {seance.heure_fin.slice(0, 5)}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-slate-800 text-xs">{seance.matiere?.nom_matiere}</div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">Pr. {seance.enseignant?.utilisateur?.nom}</div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="inline-flex flex-col items-end gap-1">
                                                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">{seance.classe?.nom_classe}</span>
                                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-slate-300" /> Salle {seance.room?.salle}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {data?.seances?.length === 0 && (
                            <div className="p-16 text-center">
                                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Calendar className="w-5 h-5 text-slate-300" />
                                </div>
                                <p className="text-xs font-medium text-slate-400">Aucune séance prévue pour cette date</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Classes */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="h-4 w-1 bg-slate-700 rounded-full"></div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Classes Actives</h2>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 min-h-[400px]">
                        <div className="space-y-2">
                            {data?.ClasseState?.listClasse?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all cursor-pointer group">
                                    <div>
                                        <div className="text-xs font-bold text-slate-800">{item.nom_classe}</div>
                                        <div className="text-[10px] font-medium text-indigo-600 mt-0.5">{item.niveau}</div>
                                    </div>
                                    <div className="h-7 w-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors shadow-sm">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardAdmin;