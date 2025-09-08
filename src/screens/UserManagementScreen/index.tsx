import React from 'react';
import { ScrollView, ViewStyle, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types/navigation';
import Header from '../../../components/Header';
import UserCard from './components/UserCard';
import { useUserManagement } from './hooks/useUserManagement';
import {
  Container,
  Title,
  LoadingText,
  EmptyText,
  styles,
} from './styles';

type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

const UserManagementScreen: React.FC = () => {
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  const { users, loading, handleDeleteUser } = useUserManagement();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Gerenciar Usuários</Title>

        <Button
          title="Adicionar Novo Usuário"
          onPress={() => {}}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando usuários...</LoadingText>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserCard user={item} onDelete={handleDeleteUser} />
            )}
            ListEmptyComponent={<EmptyText>Nenhum usuário cadastrado</EmptyText>}
          />
        )}

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.backButton}
        />
      </ScrollView>
    </Container>
  );
};

export default UserManagementScreen;
