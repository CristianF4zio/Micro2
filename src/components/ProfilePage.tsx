import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext'; // Asegúrate de que esta importación sea correcta.
import { db } from './firebase'; // Verifica la ruta de importación.
import { doc, getDoc, updateDoc, collection, query, where, getDocs  } from 'firebase/firestore';

import './ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    favoriteGame: user ? user.favoriteGame : '',
  });

  // Efecto para cargar los datos del usuario desde Firestore al iniciar o cuando cambie el ID del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setEditableUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            favoriteGame: userData.favoriteGame || '',
          });
        } else {
          console.log("No se encontró el documento del usuario.");
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableUser(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log("Updated state:", { ...editableUser, [name]: value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    console.log("Saving:", editableUser);
    if (user?.username) {
      try {
        // Construye una consulta para buscar el documento del usuario por username.
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("username", "==", user.username));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Asume que username es único y solo obtiene el primer documento.
          const userDoc = querySnapshot.docs[0];
          await updateDoc(doc(db, 'users', userDoc.id), editableUser);
          console.log("Datos del usuario actualizados con éxito en Firestore.");
          setUser({ ...user, ...editableUser }); // Actualiza el estado global del usuario
          setIsEditing(false); // Cierra el modo de edición
        } else {
          console.log("No se encontró el documento del usuario por username.");
        }
      } catch (error) {
        console.error("Error al actualizar el usuario en Firestore:", error);
      }
    } else {
      console.log("Username del usuario no disponible.");
    }
  };
  

  return (
    <div className="profileContainer">
      <div className="infoSection neonText">
        <h2>Perfil del Usuario</h2>
      </div>
      {isEditing ? (
        <>
          <input name="firstName" value={editableUser.firstName} onChange={handleInputChange} placeholder="Nombre" />
          <input name="lastName" value={editableUser.lastName} onChange={handleInputChange} placeholder="Apellido" />
          <input name="favoriteGame" value={editableUser.favoriteGame} onChange={handleInputChange} placeholder="Juego Favorito" />
          <div className="buttonContainer">
            <button onClick={handleSave}>Guardar</button>
          </div>
        </>
      ) : (
        <>
          <p>Nombre: {editableUser.firstName}</p>
          <p>Apellido: {editableUser.lastName}</p>
          <p>Juego Favorito: {editableUser.favoriteGame}</p>
          <div className="buttonContainer">
            <button onClick={handleEdit}>Editar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
