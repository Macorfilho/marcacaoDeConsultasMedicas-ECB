import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export const useUserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        const filteredUsers = allUsers.filter(u => u.id !== user?.id);
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        const updatedUsers = allUsers.filter(u => u.id !== userId);
        await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
        loadUsers();
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

  return {
    users,
    loading,
    handleDeleteUser,
  };
};
