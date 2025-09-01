import React from 'react';
import { Button } from 'react-native-elements';
import Header from '../../../components/Header';
import theme from '../../../styles/theme';
import { useProfile } from './hooks/useProfile';
import {
  Container,
  Content,
  ProfileInfo,
  Avatar,
  Name,
  Email,
} from './styles';

const ProfileScreen: React.FC = () => {
  const { user, goBack } = useProfile();

  return (
    <Container>
      <Header />
      <Content>
        <Button
          title="Voltar"
          icon={{
            name: 'arrow-left',
            type: 'font-awesome',
            size: 20,
            color: 'white'
          }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: 20
          }}
          onPress={goBack}
        />

        <ProfileInfo>
          <Avatar source={{ uri: user?.image || 'https://via.placeholder.com/150' }} />
          <Name>{user?.name || 'Nome não encontrado'}</Name>
          <Email>{user?.email || 'Email não encontrado'}</Email>
        </ProfileInfo>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
