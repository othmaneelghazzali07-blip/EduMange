import React, { useState, useRef } from 'react';
import { useGetEmploiDuTempsQuery } from '../../features/api/apiSlice';
import { MapPinIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const CRENEAUX = [
  { label: '08:00 – 10:00', debut: '08' },
  { label: '10:00 – 12:00', debut: '10' },
  { label: '14:00 – 16:00', debut: '14' },
  { label: '16:00 – 18:00', debut: '16' },
];

const COLORS = [
  'border-l-blue-500',
  'border-l-violet-500',
  'border-l-emerald-500',
  'border-l-amber-500',
  'border-l-rose-500',
  'border-l-cyan-500',
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
  <div className={`bg-white border border-slate-200 border-l-4 ${colorClass} p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group`}>
    <div className="text-[10px] font-black text-slate-800 uppercase truncate group-hover:text-blue-600 transition-colors">
      {seance.matiere?.nom_matiere}
    </div>
    <div className="text-[9px] text-slate-500 flex items-center gap-1 mt-1 font-bold">
      <UserIcon className="w-3 h-3 text-orange-400 shrink-0" />
      <span className="truncate">{seance.classe?.nom_classe}</span>
    </div>
    <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
      <MapPinIcon className="w-3 h-3 shrink-0" />
      <span>{seance.room?.salle ?? '–'}</span>
    </div>
    <div className="mt-1 text-[8px] font-black text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full inline-block">
      {seance.heure_debut?.slice(0, 5)} → {seance.heure_fin?.slice(0, 5)}
    </div>
  </div>
);

const EmploiDuTemps = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const colorMapRef = useRef({});

  const getMatiereColor = (matiereId) => {
    if (!colorMapRef.current[matiereId]) {
      colorMapRef.current[matiereId] = COLORS[Object.keys(colorMapRef.current).length % COLORS.length];
    }
    return colorMapRef.current[matiereId];
  };

  const { data: seances = [], isLoading } = useGetEmploiDuTempsQuery(weekOffset);

  const filterSeances = (jour, creneau) => {
    const dateDuJour = getDateISO(jour, weekOffset);
    return seances.filter(
      (s) =>
        s.date?.split('T')[0] === dateDuJour &&
        s.heure_debut?.startsWith(creneau.debut)
    );
  };

  if (isLoading)
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Chargement du planning...
        </span>
      </div>
    );

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">
            Emploi du Temps
          </h1>
          <p className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.2em] mt-0.5">
            Organisation hebdomadaire des cours
          </p>
        </div>
      </div>

      {/* التنقل بين الأسابيع */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
        <button
          onClick={() => setWeekOffset(w => w - 1)}
          className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-orange-500 transition-colors uppercase"
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
              className="text-[9px] font-black text-orange-500 hover:text-orange-600 transition-colors mt-0.5"
            >
              Aujourd'hui
            </button>
          ) : (
            <div className="text-[9px] font-bold text-emerald-500 mt-0.5">● Semaine actuelle</div>
          )}
        </div>

        <button
          onClick={() => setWeekOffset(w => w + 1)}
          className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-orange-500 transition-colors uppercase"
        >
          Suiv.
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
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
              {CRENEAUX.map((creneau, creneauIndex) => (
                <tr key={creneau.debut} className={creneauIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                  <td className="p-4 text-center border-b border-slate-100 bg-slate-50/30">
                    <div className="text-[10px] font-black text-slate-700">
                      {creneau.label}
                    </div>
                  </td>
                  {JOURS.map((jour) => {
                    const seancesCellule = filterSeances(jour, creneau);
                    const isToday = getDateISO(jour, weekOffset) === todayISO;
                    return (
                      <td
                        key={jour}
                        className={`p-2 border border-slate-100 align-top min-w-[140px] transition-colors
                          ${isToday ? 'bg-orange-50/30' : 'hover:bg-slate-50/50'}`}
                      >
                        {seancesCellule.length === 0 ? (
                          <div className="h-16 flex items-center justify-center opacity-20">
                            <div className="w-6 h-0.5 bg-slate-300 rounded-full" />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {seancesCellule.map((s) => (
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

      <div className="flex items-center gap-4 py-2 opacity-60">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <span className="text-[8px] font-black uppercase text-slate-500">Heures de cours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-[8px] font-black uppercase text-slate-500">Matières</span>
        </div>
      </div>

    </div>
  );
};

export default EmploiDuTemps;