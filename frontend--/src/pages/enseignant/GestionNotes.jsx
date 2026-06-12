import React, { useState } from 'react';
import {
  useGetClassesQuery,
  useGetListeNotesQuery,
  useAjouterNoteMutation,
  useModifierNoteMutation,
  useSupprimerNoteMutation
} from '../../features/api/apiSlice';
import { Trash2, Edit3, Plus, BookOpen, Calculator, X } from 'lucide-react';

const NotesModal = ({ modal, matiereId, onClose }) => {
  const [ajouterNote]  = useAjouterNoteMutation();
  const [modifierNote] = useModifierNoteMutation();
  const [status, setStatus] = useState({ type: '', msg: '' });

  const [form, setForm] = useState({
    note:        modal.note?.note !== undefined ? Number(modal.note.note) : '',
    type_examen: modal.note?.type_examen ?? modal.defaultType ?? 'examen1',
  });

  const handleSubmit = async () => {
    if (form.note === '' || Number(form.note) < 0 || Number(form.note) > 20) {
      setStatus({ type: 'error', msg: 'Note invalide (0–20)' });
      return;
    }
    setStatus({ type: '', msg: '' });
    try {
      if (modal.mode === 'edit') {
        await modifierNote({ id: modal.note.id, note: Number(form.note) }).unwrap();
      } else {
        await ajouterNote({
          etudiant_id: modal.etudiant.id,
          matiere_id:  Number(matiereId),
          note:        Number(form.note),
          type_examen: form.type_examen,
        }).unwrap();
      }
      setStatus({ type: 'success', msg: 'Enregistré !' });
      setTimeout(onClose, 700);
    } catch (err) {
      setStatus({ type: 'error', msg: err?.data?.error || 'Erreur lors de la saisie' });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#002f56] p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none">
              {modal.mode === 'edit' ? 'Modifier Note' : 'Nouvelle Note'}
            </h3>
            <p className="text-[#f39200] text-[10px] font-bold uppercase mt-1">
              {modal.etudiant.nom} {modal.etudiant.prenom}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {status.msg && (
            <div className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-center border ${
              status.type === 'success'
                ? 'bg-green-50 border-green-100 text-green-700'
                : 'bg-red-50 border-red-100 text-red-700'
            }`}>
              {status.msg}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Valeur de la note (0–20)
              </label>
              <input
                type="number" step="0.25" min="0" max="20" autoFocus
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-[#f39200] outline-none transition-all text-2xl font-black text-[#002f56] placeholder:text-slate-200"
                placeholder="00.00"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Type d'Évaluation
              </label>
              <select
                value={form.type_examen}
                onChange={(e) => setForm({ ...form, type_examen: e.target.value })}
                disabled={modal.mode === 'edit'}
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-[#f39200] outline-none bg-slate-50 text-xs font-bold text-[#002f56] appearance-none disabled:opacity-50"
              >
                <option value="examen1">Contrôle N°1</option>
                <option value="examen2">Contrôle N°2</option>
                <option value="examen3">Contrôle N°3</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
              Annuler
            </button>
            <button onClick={handleSubmit} className="flex-[2] bg-[#f39200] text-[#002f56] py-3 rounded-2xl text-[11px] font-black uppercase shadow-lg shadow-[#f39200]/20 hover:scale-[1.02] active:scale-95 transition-all">
              Confirmer la note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EtudiantsList = ({ classeId, matiereId }) => {
  const { data: etudiants, isLoading } = useGetListeNotesQuery(classeId);
  const [supprimerNote] = useSupprimerNoteMutation();
  const [modal, setModal]       = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  // ✅ يهندل array أو object (keyBy) اللي يرجعو من الـ backend
  const toArray = (notes) => {
    if (!notes) return [];
    return Array.isArray(notes) ? notes : Object.values(notes);
  };

  // ✅ يجيب النقطة بـ type_examen و matiere_id
  const getNoteByType = (notes, type) => {
    const arr = toArray(notes);
    return arr.find(
      (n) => n.type_examen === type && Number(n.matiere_id) === Number(matiereId)
    ) ?? null;
  };

  // ✅ يحسب المعدل إلى كانت 3 نقاط
  const calculateMoyenne = (notes) => {
    const arr = toArray(notes).filter(n => Number(n.matiere_id) === Number(matiereId));
    if (arr.length < 3) return null;
    const sum = arr.reduce((acc, n) => acc + Number(n.note), 0);
    return (sum / 3).toFixed(2);
  };

  const openModal = (eleve, type) => {
    const existingNote = getNoteByType(eleve.notes, type);
    setModal({
      etudiant:    eleve,
      mode:        existingNote ? 'edit' : 'add',
      note:        existingNote ?? null,
      defaultType: type,
    });
  };

  const handleDelete = async (noteId) => {
    try {
      await supprimerNote(noteId).unwrap();
      setConfirmDel(null);
    } catch {
      setConfirmDel(null);
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#f39200] rounded-full animate-spin mx-auto mb-4" />
      <p className="font-black text-[#002f56] text-[10px] tracking-widest uppercase">Chargement...</p>
    </div>
  );

  if (!etudiants?.length) return (
    <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
      <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Aucun étudiant dans cette classe</p>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#002442] text-white">
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-left">Étudiant</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-center">CNE</th>
                {['C1', 'C2', 'C3'].map(c => (
                  <th key={c} className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-center text-[#f39200]">{c}</th>
                ))}
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-center bg-[#f39200] text-[#002f56]">Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {etudiants.map((eleve) => {
                const moyenne = calculateMoyenne(eleve.notes);
                return (
                  <tr key={eleve.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-4">
                      <div className="font-black text-[#002f56] uppercase text-[11px] tracking-tight">
                        {eleve.nom} {eleve.prenom}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-400">{eleve.CNE}</td>

                    {['examen1', 'examen2', 'examen3'].map(type => {
                      const noteObj = getNoteByType(eleve.notes, type);
                      return (
                        <td key={type} className="px-6 py-4 text-center">
                          {noteObj ? (
                            <div className="inline-flex flex-col items-center">
                              <span className={`text-sm font-black ${Number(noteObj.note) >= 10 ? 'text-[#002f56]' : 'text-red-500'}`}>
                                {Number(noteObj.note).toFixed(2)}
                              </span>
                              <div className="flex gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(eleve, type)} className="text-blue-400 hover:scale-125 transition-transform">
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button onClick={() => setConfirmDel(noteObj.id)} className="text-red-400 hover:scale-125 transition-transform">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => openModal(eleve, type)}
                              className="w-8 h-8 rounded-xl border-2 border-dashed border-slate-100 text-slate-200 hover:border-[#f39200] hover:text-[#f39200] hover:bg-orange-50 flex items-center justify-center mx-auto transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      );
                    })}

                    <td className="px-6 py-4 text-center bg-[#f39200]/5">
                      {moyenne ? (
                        <span className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-sm ${
                          Number(moyenne) >= 10 ? 'bg-[#f39200] text-[#002f56]' : 'bg-red-500 text-white'
                        }`}>
                          {moyenne}
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-300 uppercase font-black italic">Incomplet</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && <NotesModal modal={modal} matiereId={matiereId} onClose={() => setModal(null)} />}

      {confirmDel && (
        <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <p className="text-xs font-black text-[#002f56] uppercase text-center">Supprimer cette note ?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDel(null)} className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase border border-slate-100 rounded-xl">
                Annuler
              </button>
              <button onClick={() => handleDelete(confirmDel)} className="flex-1 py-2 text-[10px] font-black bg-red-500 text-white rounded-xl uppercase">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const GestionNotes = () => {
  const { data: classes, isLoading } = useGetClassesQuery();
  const [selectedClasse,  setSelectedClasse]  = useState(null);
  const [selectedMatiere, setSelectedMatiere] = useState(null);

  if (isLoading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#f39200] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-2 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-black text-[#002f56] uppercase italic tracking-tighter">Gestion des Notes</h1>
          <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#f39200]" />
            Saisie des évaluations académiques
          </p>
        </div>
        {selectedMatiere && (
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm animate-in slide-in-from-right-4">
            <div className="p-2 bg-orange-50 rounded-lg"><BookOpen className="w-5 h-5 text-[#f39200]" /></div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Matière Active</p>
              <p className="text-[#002f56] font-black uppercase text-sm tracking-tight">{selectedMatiere.nom_matiere}</p>
            </div>
            <div className="text-center ml-4 border-l border-slate-100 pl-4">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Coefficient</p>
              <p className="text-[#f39200] font-black text-base leading-none mt-1">{selectedMatiere.coefficient || 1}</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <section>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">1. Choisir une classe</label>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {classes?.map(c => (
              <button key={c.id} onClick={() => { setSelectedClasse(c); setSelectedMatiere(null); }}
                className={`px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap border-2 shadow-sm ${
                  selectedClasse?.id === c.id
                    ? 'bg-[#002f56] border-[#002f56] text-white ring-4 ring-[#002f56]/10'
                    : 'bg-white border-white text-slate-400 hover:border-slate-200 hover:text-[#002f56]'
                }`}>
                {c.nom_classe}
              </button>
            ))}
          </div>
        </section>

        {selectedClasse && (
          <section className="animate-in slide-in-from-left-4 duration-300">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">2. Sélectionner la matière</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {selectedClasse.matieres?.map(m => (
                <button key={m.id} onClick={() => setSelectedMatiere(m)}
                  className={`px-5 py-3 rounded-2xl font-black text-[10px] uppercase transition-all border-2 flex items-center gap-3 whitespace-nowrap ${
                    selectedMatiere?.id === m.id
                      ? 'bg-[#f39200] border-[#f39200] text-[#002f56] shadow-lg shadow-orange-200'
                      : 'bg-white border-slate-100 text-slate-400 hover:border-[#f39200]/40'
                  }`}>
                  <Calculator className={`w-4 h-4 ${selectedMatiere?.id === m.id ? 'opacity-100' : 'opacity-30'}`} />
                  {m.nom_matiere}
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedClasse && selectedMatiere ? (
          <div className="pt-2">
            <EtudiantsList classeId={selectedClasse.id} matiereId={selectedMatiere.id} />
          </div>
        ) : (
          selectedClasse && (
            <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
              <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">
                Veuillez sélectionner une matière pour afficher la liste
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GestionNotes;