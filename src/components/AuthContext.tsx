import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { auth } from './firebase'; // Asegúrate de que este es el camino correcto para tu archivo firebase config
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

// Define un tipo para las props esperadas por AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Esto permite cualquier elemento React válido, incluyendo `null`, `undefined`, etc.
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe; // Desuscribe al observador cuando el componente se desmonta
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
