import React, { useState } from 'react';
import {
  useGetClassesAdminQuery,
  useGetEtudiantDetailsQuery,
  useGetEnseignantsParMatiereQuery,
  useGetEtudiantsSansClasseQuery,
  useAjouterEtudiantClasseMutation,
  useSupprimerEtudiantClasseMutation,
  useModifierEnseignantMatiereMutation,
  useSupprimerEnseignantMatiereMutation,
} from '../../features/api/apiSlice';
import {
  Users, BookOpen, X, GraduationCap, UserCheck,
  Plus, Trash2, Edit3, ShieldCheck, AlertTriangle,
  Award, FileText,CalendarDaysIcon,Clock,MapPin
} from 'lucide-react';



// BulletinModal

const BulletinModal = ({ etudiantId, onClose }) => {
  const { data, isLoading } = useGetEtudiantDetailsQuery(etudiantId);
  const d = data;

  return (
    <div className="fixed inset-0 bg-[#002442]/70 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#002f56] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f39200] rounded-xl flex items-center justify-center font-black text-[#002f56] text-sm">
              {d?.etudiant?.nom?.[0] ?? '?'}
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">
                {d?.etudiant?.nom} {d?.etudiant?.prenom}
              </h3>
              <p className="text-[#f39200] text-[10px] font-bold uppercase">CNE: {d?.etudiant?.CNE}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#f39200] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">

            {/* Stats Discipline */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Absences', val: d?.stats_discipline?.nb_absences ?? 0,          color: 'text-red-500',     bg: 'bg-red-50 border-red-100' },
                { label: 'Retards',  val: d?.stats_discipline?.nb_retards ?? 0,            color: 'text-amber-500',   bg: 'bg-amber-50 border-amber-100' },
                { label: 'Conduite', val: `${d?.stats_discipline?.note_conduite ?? 20}/20`, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
              ].map(({ label, val, color, bg }) => (
                <div key={label} className={`${bg} border rounded-xl p-3 text-center`}>
                  <div className={`text-lg font-black ${color}`}>{val}</div>
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>

            {/* Tableau Absences Détaillées */}
            {d?.stats_discipline?.details?.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-red-400 rounded-full" />
                  <h4 className="text-[10px] font-black text-[#002f56] uppercase tracking-widest">
                    Détail des Absences & Retards
                  </h4>
                </div>
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#002442] text-white">
                        <th className="px-3 py-2.5 text-[8px] font-black uppercase tracking-widest text-left">Séance</th>
                        <th className="px-3 py-2.5 text-[8px] font-black uppercase text-left">Matière & Prof</th>
                        <th className="px-3 py-2.5 text-[8px] font-black uppercase text-center">Salle</th>
                        <th className="px-3 py-2.5 text-[8px] font-black uppercase text-center text-[#f39200]">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {d.stats_discipline.details.map((abs) => (
                        <tr key={abs.id} className="hover:bg-slate-50/50 transition-all">
                          
                          {/* Date & Heure */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-3.5 w-3.5 text-[#f39200] shrink-0" />
                              <div>
                                <p className="text-[10px] font-black text-[#002f56]">
                                  {abs.seance?.date}
                                </p>
                                <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  {abs.seance?.heure_debut?.slice(0, 5)} – {abs.seance?.heure_fin?.slice(0, 5)}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Matière & Prof */}
                          <td className="px-3 py-2.5">
                            <div className="font-black text-[#002f56] text-[10px] uppercase">
                              {abs.seance?.matiere?.nom_matiere}
                            </div>
                            <div className="text-[9px] text-slate-400 font-bold italic">
                              Pr. {abs.seance?.enseignant?.utilisateur?.nom} {abs.seance?.enseignant?.utilisateur?.prenom}
                            </div>
                          </td>

                          {/* Salle */}
                          <td className="px-3 py-2.5 text-center">
                            <div className="inline-flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                              <MapPin className="h-2.5 w-2.5 text-slate-400" />
                              <span className="text-[9px] font-black text-[#002f56] uppercase">
                                {abs.seance?.room?.salle ?? '–'}
                              </span>
                            </div>
                          </td>

                          {/* Statut */}
                          <td className="px-3 py-2.5 text-center">
                            <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase border ${
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

            {/* Bulletin Notes */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 bg-[#f39200] rounded-full" />
                <h4 className="text-[10px] font-black text-[#002f56] uppercase tracking-widest">Bulletin de Notes</h4>
              </div>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#002442] text-white">
                      <th className="px-3 py-3 text-[8px] font-black uppercase tracking-widest text-left">Matière</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center">Coeff</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center text-[#f39200]">C1</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center text-[#f39200]">C2</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center text-[#f39200]">C3</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center bg-[#f39200] text-[#002f56]">Moy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(d?.bulletin ?? []).map((row) => (
                      <tr key={row.matiere_id} className="hover:bg-slate-50/60 transition-all">
                        <td className="px-3 py-2.5">
                          <div className="font-black text-[#002f56] text-[10px] uppercase">{row.nom_matiere}</div>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className="text-[10px] font-black text-slate-400">{row.coefficient}</span>
                        </td>
                        {['examen1', 'examen2', 'examen3'].map(type => (
                          <td key={type} className="px-3 py-2.5 text-center">
                            {row[type] !== null && row[type] !== undefined ? (
                              <span className={`text-xs font-black ${row[type] >= 10 ? 'text-[#002f56]' : 'text-red-500'}`}>
                                {row[type]}
                              </span>
                            ) : (
                              <span className="text-[8px] text-slate-200 font-black">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-3 py-2.5 text-center bg-[#f39200]/5">
                          {row.moyenne !== null ? (
                            <span className={`px-2 py-1 rounded-lg font-black text-xs ${
                              row.moyenne >= 10 ? 'bg-[#f39200] text-[#002f56]' : 'bg-red-100 text-red-600'
                            }`}>{row.moyenne}</span>
                          ) : (
                            <span className="text-[8px] text-slate-300 font-black">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Moyenne Générale */}
            <div className="bg-[#002f56] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f39200]" />
                <span className="text-white font-black text-xs uppercase tracking-widest">Moyenne Générale</span>
              </div>
              <span className={`text-2xl font-black ${(d?.moyenne_generale ?? 0) >= 10 ? 'text-[#f39200]' : 'text-red-400'}`}>
                {d?.moyenne_generale ?? '—'}<span className="text-xs text-white/40">/20</span>
              </span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};



// ModifierEnseignantModal

const ModifierEnseignantModal = ({ classe, matiereInitiale, onClose }) => {
  const [selectedMatiere, setSelectedMatiere] = useState(matiereInitiale ?? null);
  const [selectedEnseignantId, setSelectedEnseignantId] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Récupère la liste des enseignants capables d'enseigner une matière donnée
  const { data: enseignantsData, isFetching } = useGetEnseignantsParMatiereQuery(
    selectedMatiere?.id,
    { skip: !selectedMatiere?.id }
  );

  // Modifie le professeur responsable d'une matière dans une classe
  const [modifierEnseignant] = useModifierEnseignantMatiereMutation();

  const handleSubmit = async () => {
    if (!selectedMatiere || !selectedEnseignantId) {
      setStatus({ type: 'error', msg: 'Veuillez sélectionner une matière et un professeur' });
      return;
    }
    try {
      await modifierEnseignant({
        classeId: classe.id,
        matiere_id: selectedMatiere.id,
        enseignant_id: Number(selectedEnseignantId),
      }).unwrap();
      setStatus({ type: 'success', msg: 'L’enseignant a été modifié avec succès !' });
      setTimeout(onClose, 900);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Impossible de modifier l’enseignant. Veuillez réessayer.' });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-[3px] flex items-center justify-center z-[120] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#002f56] p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black italic uppercase tracking-tight">Modifier Enseignant</h3>
            <p className="text-[#f39200] text-[10px] font-bold uppercase mt-0.5">{classe.nom_classe}</p>
          </div>
          <Edit3 className="h-5 w-5 text-[#f39200] opacity-60" />
        </div>

        <div className="p-5 space-y-4">
          {status.msg && (
            <div className={`p-2 rounded-lg text-[10px] font-black uppercase tracking-wider text-center ${
              status.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>{status.msg}</div>
          )}

          <div>
            <label className="block text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Matière</label>
            <select
              value={selectedMatiere?.id ?? ''}
              onChange={(e) => {
                const m = classe.matieres?.find(x => x.id === Number(e.target.value));
                setSelectedMatiere(m ?? null);
                setSelectedEnseignantId('');
              }}
              className="w-full border-2 border-slate-100 rounded-xl px-4 py-2 focus:border-[#f39200] outline-none text-xs font-bold text-[#002f56] bg-slate-50"
            >
              <option value="">— Choisir une matière —</option>
              {classe.matieres?.map(m => (
                <option key={m.id} value={m.id}>{m.nom_matiere}</option>
              ))}
            </select>
          </div>

          {selectedMatiere && (
            <div className="animate-in fade-in duration-200">
              <label className="block text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">
                Professeur pour cette matière
              </label>
              {isFetching ? (
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                  <div className="w-4 h-4 border-2 border-[#f39200] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Chargement...</span>
                </div>
              ) : (
                <select
                  value={selectedEnseignantId}
                  onChange={(e) => setSelectedEnseignantId(e.target.value)}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2 focus:border-[#f39200] outline-none text-xs font-bold text-[#002f56] bg-slate-50"
                >
                  <option value="">— Choisir un professeur —</option>
                  {(enseignantsData?.enseignants ?? []).map(e => (
                    <option key={e.id} value={e.id}>{e.nom} {e.prenom}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedMatiere || !selectedEnseignantId}
              className="flex-1 bg-[#f39200] text-[#002f56] py-2 rounded-xl text-[10px] font-black uppercase shadow-md shadow-[#f39200]/20 disabled:opacity-40"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



// AjouterEtudiantModal

const AjouterEtudiantModal = ({ classe, onClose }) => {
  // Récupère la liste des étudiants qui n'appartiennent à aucune classe
  const { data } = useGetEtudiantsSansClasseQuery();

  // Affecte un étudiant sélectionné à la classe actuelle
  const [ajouterEtudiant] = useAjouterEtudiantClasseMutation();

  const [selectedId, setSelectedId] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async () => {
    if (!selectedId) return;
    try {
      await ajouterEtudiant({ classeId: classe.id, etudiant_id: Number(selectedId) }).unwrap();
      setStatus({ type: 'success', msg: 'L’étudiant a été ajouté avec succès !' });
      setTimeout(onClose, 800);
    } catch {
      setStatus({ type: 'error', msg: "Erreur lors de l'ajout de l'étudiant." });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-[3px] flex items-center justify-center z-[120] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#002f56] p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black italic uppercase">Ajouter Étudiant</h3>
            <p className="text-[#f39200] text-[10px] font-bold uppercase">{classe.nom_classe}</p>
          </div>
          <GraduationCap className="h-5 w-5 text-[#f39200] opacity-60" />
        </div>
        <div className="p-5 space-y-4">
          {status.msg && (
            <div className={`p-2 rounded-lg text-[10px] font-black uppercase text-center ${
              status.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>{status.msg}</div>
          )}
          <div>
            <label className="block text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">
              Étudiant sans classe
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full border-2 border-slate-100 rounded-xl px-4 py-2 focus:border-[#f39200] outline-none text-xs font-bold text-[#002f56] bg-slate-50"
            >
              <option value="">— Sélectionner —</option>
              {(data?.etudiants ?? []).map(e => (
                <option key={e.id} value={e.id}>{e.nom} {e.prenom} — {e.CNE}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase">Annuler</button>
            <button onClick={handleSubmit} disabled={!selectedId}
              className="flex-1 bg-[#f39200] text-[#002f56] py-2 rounded-xl text-[10px] font-black uppercase disabled:opacity-40">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



// GestionClasses (Main Component)

const GestionClasses = () => {
  // Récupère toutes les classes avec leurs statistiques pour l'admin
  const { data, isLoading, error } = useGetClassesAdminQuery();

  // Retire un étudiant de sa classe actuelle
  const [supprimerEtudiant] = useSupprimerEtudiantClasseMutation();

  // Retire un enseignant d'une matière spécifique dans une classe
  const [supprimerEnseignant] = useSupprimerEnseignantMatiereMutation();

  const [selectedClasse, setSelectedClasse] = useState(null);
  const [bulletinEtudiant, setBulletinEtudiant] = useState(null);
  const [modifierEnseignantModal, setModifierEnseignantModal] = useState(null);
  const [ajouterEtudiantModal, setAjouterEtudiantModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const classeActuelle = data?.classes?.find(c => c.id === selectedClasse?.id) ?? selectedClasse;

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#f39200] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="p-10 text-center text-red-500 font-black tracking-widest text-xs uppercase">
      Une erreur est survenue lors du chargement des données
    </div>
  );

  const handleSupprimerEtudiant = async (etudiantId) => {
    try {
      await supprimerEtudiant({ classeId: classeActuelle.id, etudiantId }).unwrap();
      setConfirmDelete(null);
    } catch {
      alert("Erreur lors de la suppression de l'étudiant.");
    }
  };

  const handleSupprimerEnseignant = async (matiereId) => {
    try {
      await supprimerEnseignant({ classeId: classeActuelle.id, matiereId }).unwrap();
      setConfirmDelete(null);
    } catch {
      alert("Erreur lors de la suppression de l'enseignant.");
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#002f56] uppercase italic tracking-tighter">Gestion des Classes</h1>
          <p className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.2em] mt-0.5">Administration · Vue Complète</p>
        </div>
        <div className="bg-[#002f56]/5 px-4 py-2 rounded-xl border border-[#002f56]/10 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#002f56]" />
          <span className="text-[10px] font-black text-[#002f56] uppercase">{data?.classes?.length ?? 0} Classes</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.classes?.map(classe => (
          <button
            key={classe.id}
            onClick={() => setSelectedClasse(classe)}
            className={`text-left p-4 rounded-2xl border-2 transition-all group ${
              selectedClasse?.id === classe.id
                ? 'bg-[#002f56] border-[#002f56] text-white shadow-lg shadow-[#002f56]/20'
                : 'bg-white border-slate-100 hover:border-[#002f56]/30 hover:shadow-md'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
              selectedClasse?.id === classe.id ? 'bg-[#f39200]' : 'bg-[#002f56]/5'
            }`}>
              <BookOpen className="w-4 h-4 text-[#002f56]" />
            </div>
            <div className={`font-black text-sm uppercase tracking-tight ${selectedClasse?.id === classe.id ? 'text-white' : 'text-[#002f56]'}`}>
              {classe.nom_classe}
            </div>
            <div className={`flex items-center gap-1 mt-1 text-[9px] font-bold uppercase ${
              selectedClasse?.id === classe.id ? 'text-[#f39200]' : 'text-slate-400'
            }`}>
              <Users className="w-3 h-3" />
              {classe.nb_eleves ?? 0} étudiants
            </div>
          </button>
        ))}
      </div>


      {classeActuelle && (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* TABLE ÉTUDIANTS */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <div className="h-4 w-1 bg-[#f39200] rounded-full" />
                <h3 className="text-[10px] font-black text-[#002f56] uppercase tracking-widest flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Étudiants
                  <span className="bg-[#f39200]/20 text-[#f39200] px-1.5 py-0.5 rounded text-[8px]">
                    {classeActuelle.etudiants?.length ?? 0}
                  </span>
                </h3>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#002442] text-white">
                      <th className="px-3 py-3 text-[8px] font-black uppercase tracking-widest text-left">Nom</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center">CNE</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center text-[#f39200]">Conduite</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {classeActuelle.etudiants?.map(etd => (
                      <tr key={etd.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-3 py-3">
                          <div className="font-black text-[#002f56] uppercase text-[10px] tracking-tight">
                            {etd.utilisateur?.nom} {etd.utilisateur?.prenom}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center text-[9px] font-bold text-slate-400">{etd.CNE}</td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-[9px] font-black text-slate-300 italic">voir dossier</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setBulletinEtudiant(etd.id)}
                              className="p-1.5 bg-[#002f56]/5 rounded-lg text-[#002f56] hover:bg-[#f39200] hover:text-white transition-all"
                            >
                              <FileText className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete({ type: 'etudiant', id: etd.id, label: `${etd.utilisateur?.nom} ${etd.utilisateur?.prenom}` })}
                              className="p-1.5 bg-red-50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABLE ENSEIGNANTS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-[#002f56] rounded-full" />
                  <h3 className="text-[10px] font-black text-[#002f56] uppercase tracking-widest flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Corps Enseignant
                  </h3>
                </div>
                <button
                  onClick={() => setModifierEnseignantModal({ classe: classeActuelle, matiere: null })}
                  className="flex items-center gap-1 text-[8px] font-black uppercase text-[#002f56] border border-[#002f56]/20 px-2 py-1 rounded-lg hover:bg-[#002f56] hover:text-white transition-all"
                >
                  <Edit3 className="w-2.5 h-2.5" /> Modifier
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#002442] text-white">
                      <th className="px-3 py-3 text-[8px] font-black uppercase tracking-widest text-left">Matière</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-left">Professeur</th>
                      <th className="px-3 py-3 text-[8px] font-black uppercase text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {classeActuelle.matieres?.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-3 py-3">
                          <div className="font-black text-[#002f56] text-[10px] uppercase tracking-tight">{m.nom_matiere}</div>
                          <div className="text-[8px] text-slate-300 font-bold">Coeff: {m.coefficient ?? 1}</div>
                        </td>
                        <td className="px-3 py-3">
                          {m.enseignant_classe ? (
                            <div className="text-[10px] font-bold text-slate-500 uppercase italic">
                              {m.enseignant_classe.nom} {m.enseignant_classe.prenom}
                            </div>
                          ) : (
                            <span className="text-[9px] text-slate-300 font-black italic">Non assigné</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setModifierEnseignantModal({ classe: classeActuelle, matiere: m })}
                              className="p-1.5 bg-blue-50 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete({ type: 'enseignant', matiereId: m.id, label: m.nom_matiere })}
                              className="p-1.5 bg-red-50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-sm flex items-center justify-center z-[130] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-black text-[#002f56] uppercase">Confirmer la suppression</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">{confirmDelete.label}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-bold">
              {confirmDelete.type === 'etudiant'
                ? "Cet étudiant sera retiré de la classe."
                : "L'enseignant sera retiré de cette matière."}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase border border-slate-100 rounded-xl">
                Annuler
              </button>
              <button
                onClick={() => confirmDelete.type === 'etudiant'
                  ? handleSupprimerEtudiant(confirmDelete.id)
                  : handleSupprimerEnseignant(confirmDelete.matiereId)
                }
                className="flex-1 py-2 text-[10px] font-black bg-red-500 text-white rounded-xl uppercase"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}


      {bulletinEtudiant && (
        <BulletinModal etudiantId={bulletinEtudiant} onClose={() => setBulletinEtudiant(null)} />
      )}

      {modifierEnseignantModal && (
        <ModifierEnseignantModal
          classe={modifierEnseignantModal.classe}
          matiereInitiale={modifierEnseignantModal.matiere}
          onClose={() => setModifierEnseignantModal(null)}
        />
      )}

      {ajouterEtudiantModal && classeActuelle && (
        <AjouterEtudiantModal
          classe={classeActuelle}
          onClose={() => setAjouterEtudiantModal(false)}
        />
      )}

    </div>
  );
};

export default GestionClasses;