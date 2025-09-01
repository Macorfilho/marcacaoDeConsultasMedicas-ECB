import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { adminApiService, AdminUser, ChangePasswordData } from '../../../../services/adminApi';

export const useUserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingPasswordUserId, setChangingPasswordUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersData = await adminApiService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleChangePassword = async (userId: string) => {
    if (!newPassword || newPassword.trim().length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const changeData: ChangePasswordData = {
        userId,
        newPassword: newPassword.trim(),
      };

      await adminApiService.changeUserPassword(changeData);
      
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setChangingPasswordUserId(null);
      setNewPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar a senha');
    }
  };

  const handleCancelChangePassword = () => {
    setChangingPasswordUserId(null);
    setNewPassword('');
  };

  return {
    users,
    loading,
    newPassword,
    setNewPassword,
    changingPasswordUserId,
    setChangingPasswordUserId,
    handleChangePassword,
    handleCancelChangePassword,
  };
};