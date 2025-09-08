import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiService } from "../services/authApi";
import { apiClient } from "../services/api";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthContextData,
} from "../types/auth";

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: "@MedicalApp:user",
  TOKEN: "@MedicalApp:token",
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      // Carrega o token salvo
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);

      if (storedToken && storedUser) {
        // Configura o token no cliente da API
        apiClient.setToken(storedToken);

        // Tenta validar o token buscando os dados do usuário
        try {
          const currentUser = await authApiService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Token inválido, limpando dados:", error);
          // Se o token for inválido, limpa os dados armazenados
          await AsyncStorage.removeItem(STORAGE_KEYS.USER);
          await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
          apiClient.setToken(null);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      // Se houver erro, limpa os dados armazenados
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      apiClient.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await authApiService.signIn(credentials);
      setUser(response.user);

      // Configura o token no cliente da API
      apiClient.setToken(response.token);

      // Salva os dados no AsyncStorage para persistência
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApiService.register(data);
      setUser(response.user);

      // Configura o token no cliente da API
      apiClient.setToken(response.token);

      // Salva os dados no AsyncStorage para persistência
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Remove o token do cliente da API
      apiClient.setToken(null);

      // Limpa o estado do usuário
      setUser(null);

      // Remove os dados do AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, limpa os dados locais
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      apiClient.setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
