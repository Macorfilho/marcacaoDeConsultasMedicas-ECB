import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../../../components/Header';
import { useUserManagement } from './hooks/useUserManagement';
import UserCard from './components/UserCard';
import {
  Container,
  Title,
  LoadingText,
  EmptyText,
  styles,
} from './styles';

const UserManagementScreen: React.FC = () => {
  const {
    users,
    loading,
    handleDeleteUser,
    goBack,
  } = useUserManagement();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Gerenciar Usuários</Title>

        <Button
          title="Adicionar Novo Usuário"
          onPress={() => {}} // Placeholder
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando usuários...</LoadingText>
        ) : users.length === 0 ? (
          <EmptyText>Nenhum usuário cadastrado</EmptyText>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDeleteUser}
            />
          ))
        )}

        <Button
          title="Voltar"
          onPress={goBack}
          containerStyle={styles.button}
          buttonStyle={styles.backButton}
        />
      </ScrollView>
    </Container>
  );
};

export default UserManagementScreen;
