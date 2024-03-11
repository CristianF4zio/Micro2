// ProfilePage.tsx
import React from 'react';
import { useUser } from './UserContext'; // Importa el contexto de usuario

const ProfilePage: React.FC = () => {
  const { user } = useUser(); // Obtiene el usuario del contexto

  if (!user) {
    return <div>Cargando perfil...</div>; // Maneja el caso cuando no hay usuario
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <p>Nombre de Usuario: {user.username}</p>
        <p>Correo Electrónico: {user.email}</p>
        <p>Videojuego Favorito: {user.favoriteGame}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
