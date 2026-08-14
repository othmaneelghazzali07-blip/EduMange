import React, { useState, useMemo } from 'react';
import { 
  useGetSeancesQuery, useAddSeanceMutation, useUpdateSeanceMutation,
  useDeleteSeanceMutation, useGetClassesStatsQuery, useGetSallesQuery,
} from '../../features/api/apiSlice';
import { 
  PencilIcon, TrashIcon, MapPinIcon, UserIcon, 
  XMarkIcon, FunnelIcon, CheckCircleIcon, 
  ExclamationCircleIcon, ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const Alert = ({ type, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-300 text-green-700',
    error:   'bg-red-50 border-red-300 text-red-700',
    warning: 'bg-orange-50 border-orange-300 text-orange-700',
  };
  const icons = {
    success: <CheckCircleIcon className="w-4 h-4 shrink-0" />,
    error:   <ExclamationCircleIcon className="w-4 h-4 shrink-0" />,
    warning: <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />,
  };
  return (
    <div className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-[10px] font-black uppercase ${styles[type]}`}>
      <div className="flex items-center gap-2">{icons[type]}{message}</div>
      {onClose && (
        <button onClick={onClose}><XMarkIcon className="w-4 h-4 opacity-50 hover:opacity-100" /></button>
      )}
    </div>
  );
};

const ModalConfirmation = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-full">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-[11px] font-black text-slate-700 uppercase">Confirmation</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Voulez-vous vraiment supprimer cette séance ?</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase hover:bg-slate-200 transition-all">Annuler</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase hover:bg-red-600 transition-all">Supprimer</button>
      </div>
    </div>
  </div>
);

const GestionSeances = () => {
  const aujourdhui = new Date().toISOString().split('T')[0];

  const [dateSelectionnee, setDateSelectionnee] = useState(aujourdhui);
  const [afficherModal, setAfficherModal]       = useState(false);
  const [modeEdition, setModeEdition]           = useState(false);
  const [alerteGlobale, setAlerteGlobale]       = useState(null);
  const [alerteModal, setAlerteModal]           = useState(null);
  const [confirmSuppr, setConfirmSuppr]         = useState(null);
  const [chargement, setChargement]             = useState(false);

  const [formulaire, setFormulaire] = useState({
    id: null, classe_id: '', utilisateur_id: '',
    matiere_id: '', room_id: '', date: '', heure_debut: '', heure_fin: ''
  });

  // ── Hooks API ──
  const { data: reponseSeances, refetch } = useGetSeancesQuery();
  const { data: reponseClasses }          = useGetClassesStatsQuery();
  const { data: reponseSalles }           = useGetSallesQuery();

  const [ajouterSeance]   = useAddSeanceMutation();
  const [modifierSeance]  = useUpdateSeanceMutation();
  const [supprimerSeance] = useDeleteSeanceMutation();

  const listeSeances = useMemo(() => reponseSeances?.data    || [], [reponseSeances]);
  const listeClasses = useMemo(() => reponseClasses?.classes || [], [reponseClasses]);
  const listeSalles  = useMemo(() => reponseSalles?.data     || [], [reponseSalles]);


  const classeSelectionnee = useMemo(() =>
    listeClasses.find(c => String(c.id) === String(formulaire.classe_id))
  , [listeClasses, formulaire.classe_id]);

  const matieresDisponibles = classeSelectionnee?.matieres || [];

 
  const matiereSelectionnee = useMemo(() =>
    matieresDisponibles.find(m => String(m.id) === String(formulaire.matiere_id))
  , [matieresDisponibles, formulaire.matiere_id]);

  const enseignantAuto = matiereSelectionnee?.enseignant_classe ?? null;

  const creneaux = [
    { label: '08:00 - 10:00', debut: '08' },
    { label: '10:00 - 12:00', debut: '10' },
    { label: '14:00 - 16:00', debut: '14' },
    { label: '16:00 - 18:00', debut: '16' },
  ];

  const seancesFiltrees = useMemo(() =>
    listeSeances.filter(s => s.date.split('T')[0] === dateSelectionnee)
  , [listeSeances, dateSelectionnee]);

  const afficherAlerteGlobale = (type, message) => {
    setAlerteGlobale({ type, message });
    setTimeout(() => setAlerteGlobale(null), 4000);
  };

  const ouvrirModalAjout = () => {
    setModeEdition(false);
    setFormulaire({ id: null, classe_id: '', utilisateur_id: '', matiere_id: '', room_id: '', date: '', heure_debut: '', heure_fin: '' });
    setAlerteModal(null);
    setAfficherModal(true);
  };

  const ouvrirModalEdition = (seance) => {
    setModeEdition(true);
    setAlerteModal(null);
    setFormulaire({
      id:             seance.id,
      classe_id:      String(seance.classe_id),
      matiere_id:     String(seance.matiere_id),
      utilisateur_id: String(seance.utilisateur_id),
      room_id:        String(seance.room_id),
      date:           seance.date.split('T')[0],
      heure_debut:    seance.heure_debut,
      heure_fin:      seance.heure_fin,
    });
    setTimeout(() => setAfficherModal(true), 0);
  };

  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    setAlerteModal(null);

    if (!formulaire.classe_id || !formulaire.matiere_id || !formulaire.utilisateur_id || !formulaire.room_id || !formulaire.date) {
      setAlerteModal({ type: 'warning', message: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    setChargement(true);
    const donnees = {
      ...formulaire,
      classe_id:      Number(formulaire.classe_id),
      utilisateur_id: Number(formulaire.utilisateur_id),
      matiere_id:     Number(formulaire.matiere_id),
      room_id:        Number(formulaire.room_id),
    };

    try {
      if (modeEdition) {
        await modifierSeance({ id: formulaire.id, ...donnees }).unwrap();
        afficherAlerteGlobale('success', 'Séance mise à jour avec succès.');
      } else {
        await ajouterSeance(donnees).unwrap();
        afficherAlerteGlobale('success', 'Nouvelle séance programmée avec succès.');
      }
      setAfficherModal(false);
      refetch();
    } catch (erreur) {
      setAlerteModal({ 
        type: 'error', 
        message: erreur?.data?.message || "Conflit d'horaire détecté : Professeur, Salle ou Classe déjà réservé."
      });
    } finally {
      setChargement(false);
    }
  };


  const confirmerSuppr = async () => {
    const id = confirmSuppr;
    setConfirmSuppr(null);
    try {
      await supprimerSeance(id).unwrap();
      afficherAlerteGlobale('success', 'La séance a été retirée du planning.');
      refetch();
    } catch {
      afficherAlerteGlobale('error', "Erreur lors de la suppression.");
    }
  };

  return (
    <div className="p-4 bg-[#F8F9FD] min-h-screen">

      {alerteGlobale && (
        <div className="mb-4">
          <Alert type={alerteGlobale.type} message={alerteGlobale.message} onClose={() => setAlerteGlobale(null)} />
        </div>
      )}

      {confirmSuppr && (
        <ModalConfirmation onConfirm={confirmerSuppr} onCancel={() => setConfirmSuppr(null)} />
      )}

      {/* Barre de contrôle */}
      <div className="flex flex-wrap justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <FunnelIcon className="w-5 h-5 text-slate-400" />
          <input
            type="date"
            className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] font-black outline-none"
            value={dateSelectionnee}
            onChange={(e) => setDateSelectionnee(e.target.value)}
          />
          {dateSelectionnee !== aujourdhui && (
            <button onClick={() => setDateSelectionnee(aujourdhui)} className="text-[10px] font-black text-slate-400 hover:text-orange-500 transition-all uppercase">
              Aujourd'hui
            </button>
          )}
        </div>
        <button onClick={ouvrirModalAjout} className="bg-[#1e293b] text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-orange-600 transition-all">
          + NOUVELLE SÉANCE
        </button>
      </div>

      {/* Grille */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-32 p-3 bg-slate-800 text-white text-[10px] font-black uppercase border border-slate-700 rounded-tl-2xl">Horaire</th>
              {listeClasses.map((classe, index) => (
                <th key={classe.id} className={`p-3 bg-slate-800 text-white text-[10px] font-black uppercase border border-slate-700 ${index === listeClasses.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                  <div>{classe.nom_classe}</div>
                  <div className="text-orange-400 font-normal text-[9px] mt-0.5">{classe.niveau}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creneaux.map((creneau, creneauIndex) => (
              <tr key={creneau.debut} className={creneauIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="border border-slate-200 p-3 text-center">
                  <div className="text-[10px] font-black text-slate-700">{creneau.label}</div>
                </td>
                {listeClasses.map(classe => {
                  const seancesDuCreneau = seancesFiltrees.filter(s =>
                    String(s.classe_id) === String(classe.id) &&
                    s.heure_debut?.startsWith(creneau.debut)
                  );
                  return (
                    <td key={classe.id} className="border border-slate-200 p-2 align-top min-w-[160px]">
                      {seancesDuCreneau.length === 0 ? (
                        <div className="h-16 flex items-center justify-center">
                          <div className="w-8 h-0.5 bg-slate-200 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {seancesDuCreneau.map(s => (
                            <div key={s.id} className="bg-white border border-slate-200 border-l-4 border-l-orange-500 p-2 rounded-lg shadow-sm group relative hover:shadow-md transition-shadow">
                              <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-sm border border-slate-100 p-0.5">
                                <button onClick={() => ouvrirModalEdition(s)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                                  <PencilIcon className="w-3 h-3" />
                                </button>
                                <button onClick={() => setConfirmSuppr(s.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                                  <TrashIcon className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="text-[10px] font-black text-slate-800 uppercase truncate pr-10">{s.matiere?.nom_matiere}</div>
                              <div className="text-[9px] text-slate-500 flex items-center gap-1 mt-1 font-bold">
                                <UserIcon className="w-3 h-3 text-orange-400 shrink-0" />
                                <span className="truncate">{s.enseignant?.utilisateur?.nom} {s.enseignant?.utilisateur?.prenom}</span>
                              </div>
                              <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <MapPinIcon className="w-3 h-3 shrink-0" />
                                <span>{s.room?.salle}</span>
                              </div>
                              <div className="mt-1 text-[8px] font-black text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full inline-block">
                                {s.heure_debut?.slice(0,5)} → {s.heure_fin?.slice(0,5)}
                              </div>
                            </div>
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

      {/* Modal Formulaire */}
      {afficherModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="bg-slate-800 p-5 flex justify-between items-center">
              <h2 className="text-[10px] font-black uppercase text-white tracking-widest">
                {modeEdition ? '✏️ Modifier' : '+ Ajouter'} une Séance
              </h2>
              <button onClick={() => setAfficherModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={soumettreFormulaire} className="p-6 space-y-4">
              {alerteModal && <Alert type={alerteModal.type} message={alerteModal.message} onClose={() => setAlerteModal(null)} />}

              <div className="grid grid-cols-2 gap-4">
                {/* Classe */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Classe</label>
                  <select
                    required
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black outline-none"
                    value={formulaire.classe_id}
                    onChange={(e) => setFormulaire({ 
                      ...formulaire, 
                      classe_id: e.target.value, 
                      matiere_id: '', 
                      utilisateur_id: '' 
                    })}
                  >
                    <option value="">Choisir...</option>
                    {listeClasses.map(c => <option key={c.id} value={c.id}>{c.nom_classe}</option>)}
                  </select>
                </div>

                {/* Salle */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Salle</label>
                  <select
                    required
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black outline-none"
                    value={formulaire.room_id}
                    onChange={(e) => setFormulaire({ ...formulaire, room_id: e.target.value })}
                  >
                    <option value="">Choisir...</option>
                    {listeSalles.map(s => <option key={s.id} value={s.id}>{s.salle}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Matière */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Matière</label>
                  <select
                    required
                    disabled={!formulaire.classe_id}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black disabled:opacity-40 outline-none"
                    value={formulaire.matiere_id}
                    onChange={(e) => {
                      // جيب الأستاذ أوتوماتيك من المادة المختارة
                      const mat = matieresDisponibles.find(m => String(m.id) === e.target.value);
                      setFormulaire({ 
                        ...formulaire, 
                        matiere_id: e.target.value, 
                        utilisateur_id: mat?.enseignant_classe?.id 
                          ? String(mat.enseignant_classe.id) 
                          : ''
                      });
                    }}
                  >
                    <option value="">Matière...</option>
                    {matieresDisponibles.map(m => <option key={m.id} value={m.id}>{m.nom_matiere}</option>)}
                  </select>
                </div>

                {/* Enseignant - أوتوماتيك */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-orange-500 uppercase">Enseignant</label>
                  {enseignantAuto ? (
                    // باين أوتوماتيك
                    <div className="w-full bg-orange-50 border border-orange-200 p-2.5 rounded-xl text-[11px] font-black text-slate-700 flex items-center gap-2 min-h-[40px]">
                      <UserIcon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{enseignantAuto.nom} {enseignantAuto.prenom}</span>
                    </div>
                  ) : (
                    // placeholder
                    <div className={`w-full border p-2.5 rounded-xl text-[11px] min-h-[40px] flex items-center
                      ${!formulaire.matiere_id 
                        ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-60' 
                        : 'bg-red-50 border-red-200 text-red-400'
                      }`}>
                      {!formulaire.matiere_id 
                        ? 'Auto après matière...' 
                        : '⚠ Aucun enseignant assigné'
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase">Date</label>
                <input
                  type="date" required
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black outline-none"
                  value={formulaire.date}
                  onChange={(e) => setFormulaire({ ...formulaire, date: e.target.value })}
                />
              </div>

              {/* Heures */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Heure début</label>
                  {/* Heure début */}
<input
  type="time"
  required
  min="08:00"
  max="18:30"
  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black outline-none"
  value={formulaire.heure_debut}
  onChange={(e) => setFormulaire({ ...formulaire, heure_debut: e.target.value })}
/>

{/* Heure fin */}
<input
  type="time"
  required
  min="08:00"
  max="18:30"
  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-[11px] font-black outline-none"
  value={formulaire.heure_fin}
  onChange={(e) => setFormulaire({ ...formulaire, heure_fin: e.target.value })}
/>
                </div>
              </div>

              <button
                type="submit"
                disabled={chargement || (!enseignantAuto && !!formulaire.matiere_id)}
                className="w-full bg-orange-500 text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chargement ? 'Traitement...' : modeEdition ? 'Mettre à jour' : 'Programmer la séance'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionSeances;