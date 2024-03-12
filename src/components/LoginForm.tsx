import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db as firestore } from './firebase.js';
import { useUser } from './UserContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styles from './LoginForm.module.css';
import User from './User';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      if (!formData.username || !formData.password) {
        throw new Error('Por favor, complete todos los campos.');
      }

      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('username', '==', formData.username), where('password', '==', formData.password));

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const loggedInUser: User = {
          id: userDoc.id,
          username: userDoc.username,
          firstName: userDoc.firstName,
          favoriteGame: userDoc.favoriteGame,
          email: userDoc.email,
          lastName: userDoc.lastName
        };
        setUser(loggedInUser);

        console.log("Inicio de sesión exitoso");
        navigate('/inicio');
      } else {
        throw new Error('Credenciales incorrectas.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.error("Se produjo un error desconocido");
        setErrorMessage('Se produjo un error desconocido');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // El usuario ha iniciado sesión correctamente con Google.
      // Puedes redirigirlo a la página de inicio o realizar otras acciones necesarias.
      navigate('/inicio');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      // Maneja el error según sea necesario.
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Iniciar Sesión</h2>
      {formSubmitted && errorMessage && <p className={`formMessage ${styles.formMessage}`}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={styles.formInput} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="password" className={styles.label}>Contraseña</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={styles.formInput} />
        </div>
        <button type="submit" className={styles.submitButton}>Iniciar Sesión</button>
      </form>
      <button type="button" onClick={handleGoogleLogin} className={styles.googleButton}>
        Iniciar Sesión con Google
      </button>
      <div className={styles.switchFormLinkContainer}>
        ¿No tienes una cuenta? <Link to="/" className={styles.switchFormLink}>Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;
