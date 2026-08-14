import React, { useState } from 'react';
import { 
    useGetEtudiantsQuery, 
    useAddEtudiantMutation, 
    useDeleteEtudiantMutation, 
    useUpdateEtudiantMutation,
    useGetClassesAdminQuery
} from '../../features/api/apiSlice';
import { 
    Search, UserPlus, Pencil, Trash2, X, GraduationCap
} from 'lucide-react';


// ==========================================
// Composant : GestionEtudiants
// ==========================================
const GestionEtudiants = () => {
    // Récupère la liste de tous les étudiants enregistrés
    const { data, isLoading } = useGetEtudiantsQuery();

    // Récupère la liste des classes disponibles pour l'affectation
    const { data: classesData } = useGetClassesAdminQuery();

    // Mutations pour les opérations CRUD
    const [addEtudiant] = useAddEtudiantMutation();
    const [deleteEtudiant] = useDeleteEtudiantMutation();
    const [updateEtudiant] = useUpdateEtudiantMutation();

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [formData, setFormData] = useState({ 
        nom: '', prenom: '', email: '', CNE: '', date_naissance: '', classe_id: '' 
    });

    const classes = classesData?.classes || classesData || [];

    const filteredEtudiants = data?.ListEtudiants?.filter(etd => 
        etd.utilisateur?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        etd.utilisateur?.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        etd.CNE.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ nom: '', prenom: '', email: '', CNE: '', date_naissance: '', classe_id: '' });
        setShowModal(true);
    };

    const startEdit = (etd) => {
        setIsEditing(true);
        setCurrentId(etd.id);
        setFormData({
            nom: etd.utilisateur?.nom || '',
            prenom: etd.utilisateur?.prenom || '',
            email: etd.utilisateur?.email || '',
            CNE: etd.CNE || '',
            date_naissance: etd.date_naissance || '',
            classe_id: etd.classe_id || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateEtudiant({ id: currentId, ...formData }).unwrap();
            } else {
                await addEtudiant(formData).unwrap();
            }
            setShowModal(false);
        } catch (error) {
            alert("Une erreur est survenue lors de l'enregistrement de l'étudiant. Veuillez réessayer.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
            try {
                await deleteEtudiant(id).unwrap();
            } catch (error) {
                alert("Erreur lors de la suppression de l'étudiant. Il est possible qu'il soit lié à d'autres données.");
            }
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#f39200] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-[#002f56] uppercase tracking-tight">Gestion des Étudiants</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Administration de la base scolaire
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher par nom ou CNE..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border-none pl-11 pr-4 py-3.5 rounded-2xl text-[11px] font-bold shadow-sm focus:ring-2 focus:ring-[#f39200]/20 outline-none"
                        />
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="bg-[#002f56] text-white p-3.5 rounded-2xl hover:bg-[#f39200] transition-all shadow-xl shadow-slate-200 group"
                    >
                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>


            {/* Table des Étudiants */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Étudiant</th>
                                <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">CNE</th>
                                <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Classe</th>
                                <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredEtudiants?.map((etd) => (
                                <tr key={etd.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#002f56]/5 text-[#002f56] rounded-xl flex items-center justify-center font-black text-xs">
                                                {etd.utilisateur?.nom?.[0]}
                                            </div>
                                            <div>
                                                <div className="text-[11px] font-black text-[#002f56] uppercase tracking-tight">
                                                    {etd.utilisateur?.nom} {etd.utilisateur?.prenom}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 lowercase">
                                                    {etd.utilisateur?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                                            {etd.CNE}
                                        </span>
                                    </td>
                                    <td className="p-5 text-[10px] font-black text-[#f39200] uppercase italic">
                                        {etd.classe?.nom_classe || 'Non affecté'}
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => startEdit(etd)}
                                                className="p-2 text-slate-400 hover:text-[#002f56] hover:bg-slate-100 rounded-lg transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(etd.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Modal de Saisie (Add/Edit) */}
            {showModal && (
                <div className="fixed inset-0 bg-[#002442]/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-white p-8 animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#002f56]">
                                    {isEditing ? 'Modifier Étudiant' : 'Nouvel Étudiant'}
                                </h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                                    Veuillez remplir tous les champs obligatoires
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="bg-slate-50 p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Nom</label>
                                    <input 
                                        type="text" value={formData.nom} 
                                        onChange={e => setFormData({...formData, nom: e.target.value})} 
                                        className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-[#f39200]/20" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Prénom</label>
                                    <input 
                                        type="text" value={formData.prenom} 
                                        onChange={e => setFormData({...formData, prenom: e.target.value})} 
                                        className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-[#f39200]/20" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Adresse Email</label>
                                <input 
                                    type="email" value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-[#f39200]/20" 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">CNE</label>
                                    <input 
                                        type="text" value={formData.CNE} 
                                        onChange={e => setFormData({...formData, CNE: e.target.value})} 
                                        className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-[#f39200]/20" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Date de Naissance</label>
                                    <input 
                                        type="date" value={formData.date_naissance} 
                                        onChange={e => setFormData({...formData, date_naissance: e.target.value})} 
                                        className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-[#f39200]/20" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Classe d'affectation</label>
                                <select 
                                    value={formData.classe_id} 
                                    onChange={e => setFormData({...formData, classe_id: e.target.value})} 
                                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-[11px] font-black outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#f39200]/20" 
                                    required
                                >
                                    <option value="">Choisir une classe...</option>
                                    {classes.map(classe => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.nom_classe}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-[#f39200] text-white py-5 mt-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 hover:bg-[#002f56] transition-all"
                            >
                                {isEditing ? 'Enregistrer les modifications' : "Ajouter l'étudiant"}
                            </button>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default GestionEtudiants;