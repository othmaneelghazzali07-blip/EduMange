import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './pages/layout';
import Login from './pages/login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import GestionEtudiants from './pages/admin/GestionEtudiants';
import GestionClasses from './pages/admin/GestionClasses';
import GestionSeances from './pages/admin/GestionSeances';
import GestionEnseignants from './pages/admin/GestionEnseignants';
import GestionNotes from './pages/enseignant/GestionNotes';
import GestionAbsences from './pages/enseignant/GestionAbsences';
import EmploiDuTemps from './pages/enseignant/EmploiDuTemps';
import DashboardEnseignant from './pages/enseignant/DashboardEnseignant';
import DashboardEtudiant from './pages/etudiant/DashboardEtudiant';
import EmploiEtudiant from './pages/etudiant/EmploiEtudiant';
import AbsencesEtudiant from './pages/etudiant/AbsencesEtudiant';
import MesNotes from './pages/etudiant/MesNotes';

const RedirectionAccueil = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  switch (user?.role_id) {
    case 1: return <Navigate to="/admin/stats" replace />;
    case 2: return <Navigate to="/enseignant/emploi" replace />;
    case 3: return <Navigate to="/etudiants/dashboard" replace />;
    default: return <Navigate to="/login" replace />;
  }
};

const RouteProtegee = ({ element, roleAutorise }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roleAutorise && user?.role_id !== roleAutorise) return <Navigate to="/" replace />;
  return element;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <RedirectionAccueil />}
        />

        {/* Layout partagé */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<RedirectionAccueil />} />

          {/* ===== ADMIN ===== */}
          <Route path="admin/stats"         element={<RouteProtegee element={<DashboardAdmin/>}        roleAutorise={1} />} />
          <Route path="admin/Etudiants"  element={<RouteProtegee element={<GestionEtudiants/>}  roleAutorise={1} />} />
          <Route path="admin/classes"    element={<RouteProtegee element={<GestionClasses/>}    roleAutorise={1} />} />
          <Route path="admin/seances"       element={<RouteProtegee element={<GestionSeances/>}       roleAutorise={1} />} />
          <Route path="admin/Enseignants"  element={<RouteProtegee element={<GestionEnseignants/>}  roleAutorise={1} />} />

          {/* ===== ENSEIGNANT ===== */}
          <Route path="enseignant/stats"   element={<RouteProtegee element={<DashboardEnseignant/>}    roleAutorise={2} />} />
          <Route path="enseignant/notes"    element={<RouteProtegee element={<GestionNotes/>}     roleAutorise={2} />} />
          <Route path="enseignant/absences" element={<RouteProtegee element={<GestionAbsences/>}  roleAutorise={2} />} />
          <Route path="enseignant/emploi"  element={<RouteProtegee element={<EmploiDuTemps/>}         roleAutorise={2} />} />

          {/* ===== ETUDIANT ===== */}
          <Route path="etudiants/dashboard"     element={<RouteProtegee element={<DashboardEtudiant/>}       roleAutorise={3} />} />
          <Route path="etudiants/emploi"   element={<RouteProtegee element={<EmploiEtudiant/>}      roleAutorise={3} />} />
          <Route path="etudiants/absences"  element={<RouteProtegee element={<AbsencesEtudiant/>}    roleAutorise={3} />} />
          <Route path="etudiants/MesNotes"   element={<RouteProtegee element={<MesNotes/>}           roleAutorise={3} />} />

        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;