import React from 'react';
import { useSelector } from 'react-redux';
import { useGetEtudiantDashboardQuery } from '../../features/api/apiSlice';
import { 
    AlertCircle, 
    CheckCircle2, 
    Calendar,
    Clock,
    MapPin,
} from 'lucide-react';


const DashboardEtudiant = () => {

     const { user } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetEtudiantDashboardQuery(user?.id);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#f39200] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#002f56]">Chargement des données...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="p-10 text-center text-red-500 font-black uppercase text-xs tracking-widest">
            Impossible de charger les données. Veuillez vérifier votre connexion.
        </div>
    );

    const dashboardData = data?.data;
    const infos = dashboardData?.infos_personnelles;
    const stats = dashboardData?.stats_discipline;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-[#002f56] uppercase tracking-tight">
                        Bienvenue, {infos?.prenom} {infos?.nom}
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {infos?.classe} | CNE: {infos?.cne}
                    </p>
                </div>
                <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                    <span className="text-[10px] font-black text-[#002f56] uppercase block opacity-50">
                        Date d'aujourd'hui
                    </span>
                    <span className="text-sm font-bold text-[#002f56]">
                        {new Date().toLocaleDateString('fr-FR')}
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Absences enregistrées', value: stats?.nb_absences, color: '#f39200', bg: 'bg-[#f39200]/5', icon: AlertCircle, iconColor: 'text-red-500' },
                    { label: 'Retards enregistrés',   value: stats?.nb_retards,  color: '#f39200', bg: 'bg-[#f39200]/5', icon: AlertCircle, iconColor: 'text-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border-b-4 border-slate-100 hover:border-[#f39200] transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-4 ${stat.bg} rounded-2xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Cette année</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-[#002f56]">{stat.value || 0}</h3>
                    </div>
                ))}

                {/* Note de conduite */}
                <div className="bg-[#002f56] p-6 rounded-[2rem] shadow-xl border-b-4 border-[#f39200] hover:scale-[1.02] transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-4 bg-[#f39200]/20 rounded-2xl">
                            <CheckCircle2 className="w-6 h-6 text-[#f39200]" />
                        </div>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Sur 20</span>
                    </div>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Note de comportement</p>
                    <h3 className="text-3xl font-black text-white">{stats?.note_conduite ?? 20}/20</h3>
                </div>
            </div>


            {/* Emploi du temps du jour */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                    <div className="h-4 w-1 bg-[#f39200] rounded-full"></div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-[#002f56]">
                        Emploi du temps du jour
                    </h2>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Horaire</th>
                                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Matière</th>
                                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Localisation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {dashboardData?.seances_aujourdhui?.map((seance, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3 text-xs font-black text-[#002f56]">
                                                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-[#f39200]/10 transition-colors">
                                                    <Clock className="w-3 h-3 text-[#f39200]" />
                                                </div>
                                                {seance.heure_debut?.slice(0, 5)} - {seance.heure_fin?.slice(0, 5)}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="font-black text-[#002f56] text-xs uppercase">
                                                {seance.matiere}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="inline-flex flex-col items-end">
                                                <span className="text-[9px] font-bold text-[#f39200] flex items-center gap-1 uppercase">
                                                    <MapPin className="w-3 h-3" /> Salle {seance.salle}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {dashboardData?.seances_aujourdhui?.length === 0 && (
                        <div className="p-20 text-center">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-6 h-6 text-slate-200" />
                            </div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                Aucune séance prévue aujourd'hui
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DashboardEtudiant;