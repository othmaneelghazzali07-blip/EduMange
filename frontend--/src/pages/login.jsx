import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/api/apiSlice';
import { setCredentials } from '../features/auth/authSlice';
import { Mail, Lock, AlertCircle } from 'lucide-react';

// Login : Composant gérant l'authentification des utilisateurs
const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  // useLoginMutation : Mutation pour l'authentification
  // Description : Envoie les identifiants au serveur Laravel pour vérifier l'utilisateur et générer un token JWT
  const [login, { isLoading }] = useLoginMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handleSubmit : Gère l'envoi du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      // Exécution de la requête de connexion
      const userData = await login({ 
        email: email, 
        mot_de_passe: motDePasse 
      }).unwrap();

      // Mise à jour de l'état global (Redux) avec les infos utilisateur et le token
      dispatch(setCredentials({ 
        user: userData.user, 
        token: userData.token 
      }));

      // Redirection vers la page d'accueil après succès
      navigate('/');
    } catch (err) {
      // Gestion des erreurs selon le code de statut retourné par l'API
      if (err.status === 401 || err.status === 422) {
        setErreur('Email ou mot de passe incorrect');
      } else {
        setErreur('Erreur de connexion au serveur');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">

      {/* --- Section : Logo et En-tête --- */}
<div className="text-center mb-">
  {/* الحاوية الخارجية (الزرقاء) كتبقى بنفس حجمها الأصلي w-20 h-20 */}
  <div className="inline-flex items-center justify-center w-30 h-30 bg-[#1a3a6b] rounded-2xl shadow-lg mb-4 border-b-4 border-[#1a3a6b]">
    
    {/* الحاوية البيضاء: نقصنا الـ Padding من p-3 إلى p-1 باش نخليو مساحة للشعار يكبر */}
    <div className="bg-white p-1 rounded-2xl shadow-lg w-full h-full flex items-center justify-center">
      
      {/* الشعار: كبرناه من h-12 w-12 إلى h-16 w-16 باش يعمر المربع ويبان كبير وواضح دائماً */}
      <img 
        src="/logo.png" 
        className="h-40 w-40 object-contain" 
        alt="Logo" 
      />
      
    </div>
  </div>
</div>

        {/* --- Section : Formulaire de Connexion --- */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#002f56]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Affichage des messages d'erreur si présents */}
            {erreur && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                <AlertCircle className="w-4 h-4" />
                <span>{erreur}</span>
              </div>
            )}

            {/* Champ de saisie : Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39200] focus:border-[#f39200] transition-colors"
                  placeholder="exemple@epg.ma"
                  required
                />
              </div>
            </div>

            {/* Champ de saisie : Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39200] focus:border-[#f39200] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Bouton de soumission avec état de chargement */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#002f56] hover:bg-[#001d36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002f56] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Vérification en cours...' : 'Se connecter'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;