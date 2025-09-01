import React from 'react';
import { ViewStyle } from 'react-native';
import { useUserManagement } from './hooks/useUserManagement';
import UserCard from './components/UserCard';
import {
  Container,
  SectionTitle,
  SubTitle,
  LoadingText,
} from './styles';

interface UserManagementProps {
  style?: ViewStyle;
}

const UserManagement: React.FC<UserManagementProps> = ({ style }) => {
  const {
    users,
    loading,
    newPassword,
    setNewPassword,
    changingPasswordUserId,
    setChangingPasswordUserId,
    handleChangePassword,
    handleCancelChangePassword,
  } = useUserManagement();

  if (loading) {
    return (
      <Container style={style}>
        <SectionTitle>Gerenciar Usuários</SectionTitle>
        <LoadingText>Carregando usuários...</LoadingText>
      </Container>
    );
  }

  return (
    <Container style={style}>
      <SectionTitle>Gerenciar Usuários</SectionTitle>
      <SubTitle>Total: {users.length} usuários</SubTitle>
      
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isChangingPassword={changingPasswordUserId === user.id}
          newPasswordValue={newPassword}
          onNewPasswordChange={setNewPassword}
          onStartChangePassword={() => setChangingPasswordUserId(user.id)}
          onSaveChanges={() => handleChangePassword(user.id)}
          onCancelChanges={handleCancelChangePassword}
        />
      ))}
    </Container>
  );
};

export default UserManagement;