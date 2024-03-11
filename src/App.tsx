import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubsList from './components/ClubsList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ClubsDetails from './components/ClubsDetails'; // Importa el componente
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inicio" element={<ClubsList />} />
        <Route path="/clubes/:clubId" element={<ClubsDetails />} /> {/* Nueva ruta para los detalles del club */}
      </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;