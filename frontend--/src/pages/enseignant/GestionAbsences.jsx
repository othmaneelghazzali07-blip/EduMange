import React, { useState, useEffect } from 'react';
import {
  useGetMesSeancesQuery,
  useGetPresencesQuery,
  useEnregistrerPresencesMutation,
} from '../../features/api/apiSlice';
import { CalendarDays, Clock, BookOpen, CheckCircle2, XCircle, Clock3, Save, Users } from 'lucide-react';

// ==========================================
// Composant : StatutBtns
// Gère les boutons de sélection d'état pour chaque étudiant
// ==========================================
const StatutBtns = ({ statut, onChange }) => {
  const opts = [
    { key: 'present', label: 'Présent', icon: CheckCircle2,
      active: 'bg-emerald-500 text-white border-emerald-500',
      idle: 'bg-white border-slate-100 text-slate-300 hover:border-emerald-200' },
    { key: 'absent', label: 'Absent', icon: XCircle,
      active: 'bg-red-500 text-white border-red-500',
      idle: 'bg-white border-slate-100 text-slate-300 hover:border-red-200' },
    { key: 'late', label: 'Retard', icon: Clock3,
      active: 'bg-amber-500 text-white border-amber-500',
      idle: 'bg-white border-slate-100 text-slate-300 hover:border-amber-200' },
  ];

  return (
    <div className="flex gap-1">
      {opts.map(({ key, label, icon: Icon, active, idle }) => (
        <button 
          key={key} 
          onClick={() => onChange(key)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all duration-200 ${statut === key ? active : idle}`}
        >
          <Icon className="w-3 h-3" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

// ==========================================
// Composant : AbsenceStats
// Affiche le résumé visuel des présences pour la séance
// ==========================================
const AbsenceStats = ({ statutsMap }) => {
  const vals = Object.values(statutsMap);
  const total = vals.length;
  const count = (s) => vals.filter((v) => v === s).length;

  const statsConfig = [
    { s: 'present', label: 'Présents', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { s: 'absent',  label: 'Absents',  color: 'text-red-500',     bg: 'bg-red-50 border-red-100' },
    { s: 'late',    label: 'Retards',  color: 'text-amber-500',   bg: 'bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {statsConfig.map(({ s, label, color, bg }) => (
        <div key={s} className={`${bg} border rounded-xl p-3 text-center transition-all`}>
          <div className={`text-xl font-black ${color}`}>{count(s)}</div>
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
          <div className="text-[8px] text-slate-300 font-bold">
            {total > 0 ? Math.round((count(s) / total) * 100) : 0}%
          </div>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// Composant : PresencesList
// Gère la liste interactive et l'enregistrement des données
// ==========================================
const PresencesList = ({ seanceId }) => {
  const { data: etudiants = [], isLoading } = useGetPresencesQuery(seanceId);
  const [enregistrer, { isLoading: saving }] = useEnregistrerPresencesMutation();
  const [statutsMap, setStatutsMap] = useState({});
  const [statusFeedback, setStatusFeedback] = useState({ type: '', msg: '' });

  // Initialisation de la map des statuts lors de la réception des données
  useEffect(() => {
    if (etudiants.length > 0) {
      const map = {};
      etudiants.forEach((e) => { map[e.id] = e.status || 'present'; });
      setStatutsMap(map);
    }
  }, [etudiants]);

  const handleSave = async () => {
    setStatusFeedback({ type: '', msg: '' });
    try {
      const presences = etudiants.map((e) => ({
        etudiant_id: e.id,
        status: statutsMap[e.id] || 'present',
      }));
      await enregistrer({ seanceId, presences }).unwrap();
      setStatusFeedback({ type: 'success', msg: 'Feuille de présence enregistrée !' });
      setTimeout(() => setStatusFeedback({ type: '', msg: '' }), 3000);
    } catch (error) {
      setStatusFeedback({ type: 'error', msg: "Échec de l'enregistrement." });
    }
  };

  if (isLoading) return (
    <div className="p-10 text-center font-black text-[#002f56] animate-pulse text-[10px] tracking-widest uppercase">
      Chargement de la liste...
    </div>
  );

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <AbsenceStats statutsMap={statutsMap} />

      {statusFeedback.msg && (
        <div className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-center border ${
          statusFeedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {statusFeedback.msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#002442] text-white">
                <th className="px-4 py-3 text-[9px] font-black uppercase text-left">#</th>
                <th className="px-4 py-3 text-[9px] font-black uppercase text-left">Étudiant</th>
                <th className="px-4 py-3 text-[9px] font-black uppercase text-center">CNE</th>
                <th className="px-4 py-3 text-[9px] font-black uppercase text-center text-[#f39200]">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {etudiants.map((eleve, idx) => (
                <tr key={eleve.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-[10px] font-black text-slate-300">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-black text-[#002f56] uppercase text-[11px] tracking-tight">
                      {eleve.nom} {eleve.prenom}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-[10px] font-bold text-slate-400">{eleve.CNE}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <StatutBtns
                        statut={statutsMap[eleve.id] || 'present'}
                        onChange={(s) => setStatutsMap((prev) => ({ ...prev, [eleve.id]: s }))}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full bg-[#002f56] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#002f56]/20 hover:bg-[#002442] transition-all disabled:opacity-50"
      >
        {saving ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        Valider la présence
      </button>
    </div>
  );
};

// ==========================================
// Composant Principal : GestionAbsences
// ==========================================
const GestionAbsences = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSeance, setSelectedSeance] = useState(null);

  const { data: seances = [], isLoading } = useGetMesSeancesQuery(selectedDate);

  // Reset de la séance sélectionnée si la date change
  useEffect(() => { setSelectedSeance(null); }, [selectedDate]);

  if (isLoading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-100 border-t-[#f39200] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* En-tête de page */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#002f56] uppercase italic tracking-tighter">
            Pointage des Absences
          </h1>
          <p className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.2em] mt-0.5">
            Suivi quotidien & Assiduité
          </p>
        </div>

        {/* Filtre Date */}
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <CalendarDays className="w-4 h-4 text-[#f39200]" />
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Journée du</p>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-[#002f56] font-black text-xs outline-none bg-transparent" 
            />
          </div>
        </div>
      </div>

      {/* Sélecteur de Séances */}
      <section>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Users className="w-3 h-3" /> Séances disponibles ({seances.length})
        </p>

        {seances.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
            <CalendarDays className="w-8 h-8 text-slate-100 mx-auto mb-2" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Aucun cours programmé ce jour
            </p>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {seances.map((s) => (
              <button 
                key={s.id}
                onClick={() => setSelectedSeance(s)}
                className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase transition-all border-2 flex items-center gap-2 whitespace-nowrap ${
                  selectedSeance?.id === s.id
                    ? 'bg-[#002f56] border-[#002f56] text-white shadow-md'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 shadow-sm'
                }`}
              >
                <BookOpen className="w-3 h-3 opacity-50" />
                <div className="text-left">
                  <div>{s.matiere?.nom_matiere}</div>
                  <div className={`text-[8px] flex items-center gap-1 mt-0.5 ${selectedSeance?.id === s.id ? 'text-[#f39200]' : 'text-slate-300'}`}>
                    <Clock className="w-2.5 h-2.5" />
                    {s.heure_debut?.slice(0, 5)} – {s.heure_fin?.slice(0, 5)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Détails de la séance et Liste */}
      {selectedSeance && (
        <div className="animate-in slide-in-from-bottom-3 duration-400 space-y-3">
          <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 flex flex-wrap items-center gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#f39200]" />
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Matière</p>
                <p className="text-[#002f56] font-black uppercase text-xs">{selectedSeance.matiere?.nom_matiere}</p>
              </div>
            </div>
            <div className="border-l border-slate-100 pl-6 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#f39200]" />
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Classe</p>
                <p className="text-[#002f56] font-black uppercase text-xs">{selectedSeance.classe?.nom_classe}</p>
              </div>
            </div>
            <div className="border-l border-slate-100 pl-6 flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#f39200]" />
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Horaire</p>
                <p className="text-[#f39200] font-black text-xs">
                  {selectedSeance.heure_debut?.slice(0, 5)} – {selectedSeance.heure_fin?.slice(0, 5)}
                </p>
              </div>
            </div>
          </div>

          <PresencesList seanceId={selectedSeance.id} />
        </div>
      )}
    </div>
  );
};

export default GestionAbsences;