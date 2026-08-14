import { useState, useMemo } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {
  LayoutDashboard,
  Calendar,
  Users,
  GraduationCap,
  ClipboardList,
  LogOut,
  Menu,
  X,
  School,
  UserCheck
} from 'lucide-react';

// Layout : Composant principal qui structure l'interface (Sidebar + Contenu)
const Layout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // handleLogout : Gère la déconnexion de l'utilisateur et la redirection
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // menuItems : Calcule dynamiquement les liens de navigation selon le rôle de l'utilisateur
  // Description : Utilise useMemo pour ne recalculer la liste que si le rôle change
  const menuItems = useMemo(() => {
    const role = user?.role_id;

    if (role === 1) { // Rôle : Administrateur
      return [
        { path: '/admin/stats', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/admin/Etudiants', label: 'Gestion des Etudiants', icon: Users },
        { path: '/admin/classes', label: 'Ressources & Classes', icon: School },
        { path: '/admin/seances', label: 'Planning Scolaire', icon: Calendar },
        { path: '/admin/Enseignants', label: 'Enseignants', icon: UserCheck },
      ];
    } else if (role === 2) { // Rôle : Enseignant
      return [
        { path: '/enseignant/stats', label: 'Tableau de bord', icon: LayoutDashboard  },
        { path: '/enseignant/notes', label: 'Saisie des Notes', icon: GraduationCap },
        { path: '/enseignant/absences', label: 'Gestion des Absences', icon: ClipboardList },
        { path: '/enseignant/emploi', label: 'Planning Scolaire', icon: Calendar},
      ];
    } else if (role === 3) { // Rôle : Étudiant
      return [
        { path: '/etudiants/stats', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/etudiants/emploi', label: 'Mon Emploi du Temps', icon: Calendar },
        { path: '/etudiants/absences', label: 'Mes Absences', icon: ClipboardList },
        { path: '/etudiants/MesNotes', label: 'Mes Notes', icon: Users },
      ];
    }
    return [];
  }, [user?.role_id]);

  // getRoleLabel : Retourne le nom du rôle sous forme de texte lisible
  const getRoleLabel = () => {
    const roles = { 1: 'Administrateur', 2: 'Enseignant', 3: 'Étudiant' };
    return roles[user?.role_id] || 'Utilisateur';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">

      {/* --- Section : Sidebar (Barre latérale) --- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out bg-slate-950 text-slate-200 border-r border-slate-900 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        
        {/* Logo et Identité de l'école */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white p-1 overflow-hidden">
              <img src="/logo.png" className="h-full w-full object-contain" alt="Logo" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white">Edu Manage</span>
                <span className="text-[8px] font-medium tracking-wider uppercase text-sky-400">
                  Plateforme Scolaire
                </span>
              </div>
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-900">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation : Liste des liens du menu */}
        <nav className="p-3 mt-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 group no-underline text-xs font-medium ${
                  isActive 
                    ? 'bg-sky-600 text-white font-semibold shadow-sm shadow-sky-600/10' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-150 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar : Infos utilisateur et bouton Déconnexion */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-900 bg-slate-950">
          <div className={`flex items-center gap-3 p-1.5 rounded-xl ${!sidebarOpen ? 'justify-center' : ''}`}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0 shadow-sm uppercase bg-sky-500/10 text-sky-400 text-xs">
              {user?.nom?.[0] || 'U'}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-200 text-xs truncate m-0">
                  {user?.nom || 'Utilisateur'}
                </p>
                <p className="text-[10px] font-medium text-slate-500 m-0 mt-0.5">{getRoleLabel()}</p>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-red-400 rounded-xl text-[11px] font-medium border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Déconnexion
            </button>
          )}
        </div>

      </aside>

      {/* --- Section : Contenu Principal (Main Content) --- */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        
        {/* Header : Barre supérieure avec titre du rôle et contrôles du menu */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm/5">
          <div className="flex items-center gap-3">
            {/* Bouton pour menu mobile */}
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-50">
              <Menu className="h-5 w-5" />
            </button>
            {/* Bouton pour réduire/agrandir la sidebar sur PC */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:bg-slate-50">
              <Menu className="h-4 w-4" />
            </button>
            <h2 className="hidden md:flex items-center gap-2 text-slate-400 font-normal text-xs m-0">
              <span>SGE</span> 
              <span className="text-slate-300">/</span> 
              <span className="text-slate-800 font-semibold">{getRoleLabel()}</span>
            </h2>
          </div>
        </header>

        {/* Main : Espace où s'affichent les pages enfants via Outlet */}
        <main className="p-4 sm:p-6 lg:p-8 mx-auto" style={{ maxWidth: '1600px', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;