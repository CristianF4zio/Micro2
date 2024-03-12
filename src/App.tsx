import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubsList from './components/ClubsList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ClubsDetails from './components/ClubsDetails';
import { UserProvider } from './components/UserContext';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/inicio" element={<ClubsList />} />
          <Route path="/clubes/:clubId" element={<ClubsDetails />} />
          <Route path="/" element={<ClubsList />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
