import React, { useState, useRef } from 'react';
import { useGetEmploiEtudiantQuery } from '../../features/api/apiSlice';
import { MapPinIcon, UserIcon, AcademicCapIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const CRENEAUX = [
  { label: '08:00 – 10:00', debut: '08' },
  { label: '10:00 – 12:00', debut: '10' },
  { label: '14:00 – 16:00', debut: '14' },
  { label: '16:00 – 18:00', debut: '16' },
];

const COLORS = [
  'border-l-[#f39200]',
  'border-l-blue-500',
  'border-l-emerald-500',
  'border-l-violet-500',
  'border-l-rose-500',
];

const todayISO = new Date().toISOString().split('T')[0];

const getDateISO = (jourNom, weekOffset = 0) => {
  const jourIndex = JOURS.indexOf(jourNom);
  if (jourIndex === -1) return '';
  const today = new Date();
  const currentDay = today.getDay();
  const lundi = new Date(today);
  lundi.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1) + weekOffset * 7);
  const date = new Date(lundi);
  date.setDate(lundi.getDate() + jourIndex);
  return date.toISOString().split('T')[0];
};

const getDateDuJour = (jourNom, weekOffset = 0) => {
  const iso = getDateISO(jourNom, weekOffset);
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

const getSemaineLabel = (weekOffset) => {
  const lundi = new Date();
  const currentDay = lundi.getDay();
  lundi.setDate(lundi.getDate() - (currentDay === 0 ? 6 : currentDay - 1) + weekOffset * 7);
  const samedi = new Date(lundi);
  samedi.setDate(lundi.getDate() + 5);
  const fmt = (d) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  return `${fmt(lundi)} – ${fmt(samedi)}`;
};

const SeanceCard = ({ seance, colorClass }) => (
  <div className={`bg-white border border-slate-200 border-l-4 ${colorClass} p-2 rounded-lg shadow-sm hover:shadow-md transition-all`}>
    <div className="text-[9px] font-black text-[#002f56] uppercase truncate leading-tight">
      {seance.matiere?.nom_matiere}
    </div>
    <div className="text-[8px] text-slate-500 flex items-center gap-1 mt-1 font-bold uppercase">
      <UserIcon className="w-2.5 h-2.5 text-[#f39200]" />
      <span className="truncate">Pr. {seance.enseignant?.utilisateur?.nom}</span>
    </div>
    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
      <div className="text-[7px] text-slate-400 flex items-center gap-1 font-bold">
        <MapPinIcon className="w-2.5 h-2.5" />
        <span>{seance.room?.salle}</span>
      </div>
      <div className="text-[7px] font-black text-[#f39200]">
        {seance.heure_debut?.slice(0, 5)}-{seance.heure_fin?.slice(0, 5)}
      </div>
    </div>
  </div>
);

const EmploiEtudiant = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const colorMapRef = useRef({});

  const getMatiereColor = (matiereId) => {
    if (!colorMapRef.current[matiereId]) {
      colorMapRef.current[matiereId] = COLORS[Object.keys(colorMapRef.current).length % COLORS.length];
    }
    return colorMapRef.current[matiereId];
  };

  const { data, isLoading } = useGetEmploiEtudiantQuery(weekOffset);
  const seances = data?.data || [];

  const getSeancesMatch = (jour, creneau) => {
    const dateDuJour = getDateISO(jour, weekOffset);
    return seances.filter(
      (s) =>
        s.date?.split('T')[0] === dateDuJour &&
        s.heure_debut?.slice(0, 2) === creneau.debut
    );
  };

  if (isLoading)
    return (
      <div className="p-10 text-center font-black text-[#002f56] animate-pulse">
        CHARGEMENT...
      </div>
    );

  return (
    <div className="space-y-4 animate-in fade-in duration-700">

      {/* الهيدر */}
      <div className="flex items-center justify-between bg-[#002f56] p-4 rounded-2xl shadow-lg border-b-4 border-[#f39200]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black text-white uppercase italic tracking-tighter m-0">
            Mon Emploi du Temps
          </h1>
          <div className="bg-[#f39200] text-[#002f56] px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
            <AcademicCapIcon className="w-3 h-3" />
            {seances[0]?.classe?.nom_classe || '–'}
          </div>
        </div>
        <p className="text-[#f39200] font-bold text-[8px] uppercase tracking-widest hidden sm:block">
          EPG POLYTECHNIQUE
        </p>
      </div>

      {/* التنقل بين الأسابيع */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
        <button
          onClick={() => setWeekOffset(w => w - 1)}
          className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-[#f39200] transition-colors uppercase"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Préc.
        </button>

        <div className="text-center">
          <div className="text-[11px] font-black text-slate-700 uppercase">
            {getSemaineLabel(weekOffset)}
          </div>
          {weekOffset !== 0 ? (
            <button
              onClick={() => setWeekOffset(0)}
              className="text-[9px] font-black text-[#f39200] hover:text-orange-600 transition-colors mt-0.5"
            >
              Aujourd'hui
            </button>
          ) : (
            <div className="text-[9px] font-bold text-emerald-500 mt-0.5">● Semaine actuelle</div>
          )}
        </div>

        <button
          onClick={() => setWeekOffset(w => w + 1)}
          className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-[#f39200] transition-colors uppercase"
        >
          Suiv.
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-white text-[9px] font-black uppercase border border-slate-600">
                  Horaire
                </th>
                {JOURS.map((jour) => {
                  const isToday = getDateISO(jour, weekOffset) === todayISO;
                  return (
                    <th
                      key={jour}
                      className={`p-3 text-[9px] font-black uppercase border border-slate-600
                        ${isToday ? 'bg-[#f39200] text-[#002f56]' : 'text-white'}`}
                    >
                      <div>{jour}</div>
                      <div className={`text-[7px] font-semibold mt-0.5 normal-case
                        ${isToday ? 'text-[#002f56]' : 'text-slate-400'}`}>
                        {getDateDuJour(jour, weekOffset)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {CRENEAUX.map((creneau) => (
                <tr key={creneau.debut}>
                  <td className="p-2 border border-slate-200 bg-slate-50 text-center">
                    <div className="text-[9px] font-black text-[#002f56] leading-none">
                      {creneau.label.split(' – ')[0]}
                      <span className="block text-[#f39200] mt-1 italic">—</span>
                      {creneau.label.split(' – ')[1]}
                    </div>
                  </td>
                  {JOURS.map((jour) => {
                    const matches = getSeancesMatch(jour, creneau);
                    const isToday = getDateISO(jour, weekOffset) === todayISO;
                    return (
                      <td
                        key={jour}
                        className={`border border-slate-200 p-1.5 align-top min-w-[130px]
                          ${isToday ? 'bg-orange-50/40' : 'bg-white'}`}
                      >
                        {matches.length === 0 ? (
                          <div className="h-12 flex items-center justify-center">
                            <div className="w-4 h-0.5 bg-slate-100 rounded-full" />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {matches.map((s) => (
                              <SeanceCard key={s.id} seance={s} colorClass={getMatiereColor(s.matiere?.id)} />
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">
          Optimisé pour l'affichage EPG
        </p>
      </div>

    </div>
  );
};

export default EmploiEtudiant;