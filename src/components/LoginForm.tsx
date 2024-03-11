import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db as firestore } from './firebase'; // Asegúrate de importar firestore desde './firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Importa getAuth, signInWithPopup y GoogleAuthProvider desde 'firebase/auth'
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
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
        console.log("Inicio de sesión exitoso");
        navigate('/inicio');
      } else {
        throw new Error('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage('Se produjo un error al iniciar sesión.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth(); // Obtenemos el objeto auth
      const provider = new GoogleAuthProvider(); // Creamos un proveedor de Google
      await signInWithPopup(auth, provider); // Iniciamos sesión con el proveedor de Google
      console.log("Inicio de sesión exitoso con Google");
      navigate('/inicio');
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setErrorMessage('Se produjo un error al iniciar sesión con Google.');
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
      <button onClick={handleGoogleSignIn} className={styles.submitButton}>Inicia sesión con Google</button>
      <div className={styles.switchFormLinkContainer}>
        ¿No tienes una cuenta? <Link to="/" className={styles.switchFormLink}>Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;
