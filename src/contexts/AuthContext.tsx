import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../services/authApi';
import { apiClient } from '../services/api';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';

// Chaves para o AsyncStorage
const STORAGE_KEYS = {
  TOKEN: '@MedicalApp:token',
  USER: '@MedicalApp:user',
};

// Interface do contexto
interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

// Criação do contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para usar o contexto
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Props do provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider do contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário armazenado
  const loadStoredUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      
      if (storedToken && storedUser) {
        apiClient.setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await authApiService.signIn(credentials);
      setUser(response.user);
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      apiClient.setToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  // Registro
  const signUp = async (credentials: RegisterCredentials) => {
    try {
      const response = await authApiService.register(credentials);
      setUser(response.user);
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      apiClient.setToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      apiClient.clearToken();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Atualiza dados do usuário
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
  };

  // Carrega usuário ao montar o componente
  useEffect(() => {
    loadStoredUser();
  }, []);

  const value: AuthContextData = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};