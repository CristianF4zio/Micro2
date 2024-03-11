import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubsList from './components/ClubsList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ClubsDetails from './components/ClubsDetails'; // Importa el componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inicio" element={<ClubsList />} />
        <Route path="/clubes/:clubId" element={<ClubsDetails />} /> {/* Nueva ruta para los detalles del club */}
      </Routes>
    </Router>
  );
}

export default App;
