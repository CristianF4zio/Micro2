import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import styles from './RegisterForm.module.css';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    favoriteGame: ''
  });
  const [redirect, setRedirect] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true); // Indica que el formulario ha sido enviado
  
    try {
      if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.favoriteGame) {
        throw new Error('Por favor, complete todos los campos.');
      }
  
      const usersCollectionRef = collection(db, 'users');
      await addDoc(usersCollectionRef, formData); // Guardar los datos del usuario en Firestore
      console.log("Usuario registrado correctamente");
      setRedirect(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al registrar usuario:", error.message);
      } else {
        console.error("Se produjo un error desconocido");
      }
    }
  };  

  if (redirect) {
    return <Navigate to="/login" />;
  }

  // Lista de 20 juegos
  const gamesList = [
    'Minecraft',
    'Fortnite',
    'League of Legends',
    'Call of Duty',
    'FIFA',
    'Among Us',
    'GTA V',
    'Apex Legends',
    'Overwatch',
    'Rocket League',
    'Valorant',
    'The Witcher 3',
    'Assassin\'s Creed',
    'Destiny 2',
    'Rainbow Six Siege',
    'World of Warcraft',
    'Cyberpunk 2077',
    'Animal Crossing',
    'Super Smash Bros',
    'Red Dead Redemption 2'
  ];

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Registrar Usuario</h2>
      {(formSubmitted && (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.favoriteGame)) && <p className={`formMessage ${styles.formMessage}`}>Por favor, llene todos los campos.</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="firstName" className={styles.label}>Nombre</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="lastName" className={styles.label}>Apellido</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="username" className={styles.label}>Nombre de Usuario</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="password" className={styles.label}>Contraseña</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="favoriteGame" className={styles.label}>Videojuego Preferido</label>
          <select name="favoriteGame" id="favoriteGame" value={formData.favoriteGame} onChange={handleChange} className={styles.formInput}>
            <option value="">Seleccione un juego</option>
            {gamesList.map((game, index) => (
              <option key={index} value={game}>{game}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Registrar</button>
      </form>
      <p className={styles.switchFormText}>¿Ya tienes una cuenta? <Link to="/login" className={styles.switchFormLink}>Inicia sesión</Link></p>
    </div>
  );
};

export default RegisterForm;
