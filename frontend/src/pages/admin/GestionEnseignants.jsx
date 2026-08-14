import React, { useState } from 'react';
import {
  useGetEnseignantsAdminQuery,
  useGetAllMatieresQuery,
  useAjouterEnseignantAdminMutation,
  useModifierEnseignantAdminMutation,
  useSupprimerEnseignantAdminMutation,
  useModifierMatiereEnseignantMutation,
} from '../../features/api/apiSlice';

import {
  Search, UserPlus, Pencil, Trash2, X,
  BookOpen, ChevronDown, Check
} from 'lucide-react';


// ==========================================
// MatieresSelect
// ==========================================
const MatieresSelect = ({ matieres, selected, onChange }) => {
  const [open, setOpen] = useState(false);

  // Gère l'ajout ou le retrait d'une matière dans la liste de sélection
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter(x => x !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="relative">
      <button 
        type="button" 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2 border rounded-lg text-sm"
      >
        {selected.length
          ? `${selected.length} matière(s) sélectionnée(s)`
          : 'Choisir des matières...'}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {matieres?.map(m => (
            <button 
              key={m.id} 
              type="button"
              onClick={() => toggle(m.id)}
              className="w-full flex items-center justify-between p-2 hover:bg-slate-50 text-sm text-left"
            >
              {m.nom_matiere}
              {selected.includes(m.id) && <Check className="w-3 h-3 text-emerald-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


// ==========================================
// ModifierMatieresModal
// ==========================================
const ModifierMatieresModal = ({ enseignant, matieres, onClose }) => {
  const [selectedIds, setSelectedIds] = useState(
    enseignant.matieres?.map(m => m.id) ?? []
  );

  // Met à jour la liste des matières assignées à un enseignant spécifique
  const [modifierMatieres] = useModifierMatiereEnseignantMutation();

  const handleSubmit = async () => {
    if (!selectedIds.length) return;
    try {
      await modifierMatieres({
        id: enseignant.id,
        matiere_ids: selectedIds,
      }).unwrap();
      onClose();
    } catch {
      alert("Erreur lors de la mise à jour des matières.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4">
        <h3 className="font-black text-[#002f56] uppercase text-xs">Modifier les matières</h3>
        
        <MatieresSelect
          matieres={matieres}
          selected={selectedIds}
          onChange={setSelectedIds}
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 p-2 text-xs font-bold uppercase text-slate-400">Annuler</button>
          <button 
            onClick={handleSubmit}
            className="flex-1 bg-[#f39200] text-[#002f56] p-2 rounded-xl text-xs font-black uppercase"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// GestionEnseignants (Main Component)
// ==========================================
const GestionEnseignants = () => {
  // Récupère la liste complète de tous les enseignants enregistrés
  const { data, isLoading } = useGetEnseignantsAdminQuery();

  // Récupère toutes les matières disponibles dans l'établissement
  const { data: matieresData } = useGetAllMatieresQuery();

  // Ajoute un nouvel enseignant dans la base de données
  const [ajouterEnseignant] = useAjouterEnseignantAdminMutation();

  // Modifie les informations personnelles d'un enseignant existant
  const [modifierEnseignant] = useModifierEnseignantAdminMutation();

  // Supprime définitivement un enseignant du système
  const [supprimerEnseignant] = useSupprimerEnseignantAdminMutation();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modifierMatieresModal, setModifierMatieresModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', specialite: '', matiere_id: ''
  });

  const matieres = matieresData?.matieres ?? [];
  const enseignants = data?.enseignants ?? [];

  const openAddModal = () => {
    setIsEditing(false);
    setFormError('');
    setFormData({ nom: '', prenom: '', email: '', specialite: '', matiere_id: '' });
    setShowModal(true);
  };

  const openEditModal = (ens) => {
    setIsEditing(true);
    setFormError('');
    setCurrentId(ens.id);
    setFormData({
      nom: ens.nom,
      prenom: ens.prenom,
      email: ens.email,
      specialite: ens.specialite ?? '',
      matiere_id: '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      if (isEditing) {
        await modifierEnseignant({ id: currentId, ...formData }).unwrap();
      } else {
        await ajouterEnseignant(formData).unwrap();
      }
      setShowModal(false);
    } catch (err) {
      setFormError('Une erreur est survenue lors de l’enregistrement. Veuillez réessayer.');
    }
  };

  const handleDelete = async () => {
    try {
      await supprimerEnseignant(confirmDelete.id).unwrap();
      setConfirmDelete(null);
    } catch {
      alert("Impossible de supprimer cet enseignant.");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center p-20">
      <div className="w-8 h-8 border-4 border-[#f39200] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const filtered = enseignants.filter(e =>
    e.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un enseignant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm outline-none focus:border-[#f39200]"
          />
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#002f56] text-white px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Ajouter Enseignant
        </button>
      </div>


      <div className="grid gap-3">
        {filtered.map(ens => (
          <div key={ens.id} className="bg-white p-4 rounded-2xl border flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <div className="font-black text-[#002f56] uppercase text-sm">{ens.nom} {ens.prenom}</div>
              <div className="text-xs text-slate-400">{ens.email}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setModifierMatieresModal(ens)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <BookOpen className="w-4 h-4" />
              </button>
              <button onClick={() => openEditModal(ens)} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-[#002f56] hover:text-white transition-all">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => setConfirmDelete({ id: ens.id, label: `${ens.nom} ${ens.prenom}` })} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[140] p-4">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-2xl space-y-4">
            <h2 className="text-sm font-black text-[#002f56] uppercase">{isEditing ? 'Modifier l’enseignant' : 'Nouvel enseignant'}</h2>
            
            {formError && <div className="p-2 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-lg">{formError}</div>}

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Nom"
                className="w-full p-3 border rounded-xl text-xs outline-none"
                value={formData.nom}
                onChange={e => setFormData({ ...formData, nom: e.target.value })}
                required
              />
              <input
                placeholder="Prénom"
                className="w-full p-3 border rounded-xl text-xs outline-none"
                value={formData.prenom}
                onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                required
              />
            </div>
            
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl text-xs outline-none"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <input
              placeholder="Spécialité"
              className="w-full p-3 border rounded-xl text-xs outline-none"
              value={formData.specialite}
              onChange={e => setFormData({ ...formData, specialite: e.target.value })}
            />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-xs font-black uppercase text-slate-400">Annuler</button>
              <button type="submit" className="flex-1 bg-[#f39200] text-[#002f56] py-3 rounded-xl text-xs font-black uppercase">Enregistrer</button>
            </div>
          </form>
        </div>
      )}


      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-xs text-center space-y-4">
            <p className="text-xs font-bold text-slate-500">Êtes-vous sûr de vouloir supprimer cet enseignant ?</p>
            <p className="font-black text-[#002f56] uppercase text-sm">{confirmDelete.label}</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2 text-xs font-bold uppercase text-slate-400">Annuler</button>
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg text-xs font-black uppercase">Supprimer</button>
            </div>
          </div>
        </div>
      )}


      {modifierMatieresModal && (
        <ModifierMatieresModal
          enseignant={modifierMatieresModal}
          matieres={matieres}
          onClose={() => setModifierMatieresModal(null)}
        />
      )}

    </div>
  );
};

export default GestionEnseignants;
