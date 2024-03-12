import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './UserIcon.css'; // Asegúrate de tener estilos CSS para el icono

interface User {
  firstName: string;
}

interface UserIconProps {
  user: User | null;
}

const UserIcon: React.FC<UserIconProps> = ({ user }) => {
  if (!user) {
    return null; // Si no hay usuario, no muestra nada
  }

  // Obtén la inicial del nombre del usuario
  const userInitial = user.firstName.charAt(0).toUpperCase();

  return (
    <Link to="/profile"> {/* Envuelve el UserIcon con Link y establece la ruta a /profile */}
      <div className="userIconContainer">
        <div className="userIconCircle">{userInitial}</div> {/* Círculo con la inicial del nombre del usuario */}
      </div>
    </Link>
  );
};

export default UserIcon;
