import React from "react";
import styled from "styled-components/native";
import { Avatar, Icon } from "react-native-elements";
import { useAuth } from "../contexts/AuthContext";
import theme from "../styles/theme";
import { Alert, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  if (!user) return null;

  const handleSignOut = () => {
    Alert.alert(
      "Confirmar Logout",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <Container paddingTop={insets.top}>
      <UserInfo>
        <Avatar
          size="medium"
          rounded
          source={{ uri: user.image }}
          containerStyle={styles.avatar}
        />
        <TextContainer>
          <WelcomeText>Bem-vindo(a),</WelcomeText>
          <UserName>{user.name}</UserName>
        </TextContainer>
      </UserInfo>
      <LogoutButton onPress={handleSignOut}>
        <Icon
          name="logout"
          type="material-community"
          color={theme.colors.error}
          size={24}
        />
      </LogoutButton>
    </Container>
  );
};

const styles = {
  avatar: {
    backgroundColor: theme.colors.primary,
  },
};

const Container = styled.View<{ paddingTop: number }>`
  background-color: ${theme.colors.background};
  padding: 16px;
  padding-top: ${({ paddingTop }) => paddingTop + 16}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const TextContainer = styled.View`
  margin-left: 12px;
`;

const WelcomeText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const LogoutButton = styled(TouchableOpacity)`
  padding: 8px;
  border-radius: 20px;
  background-color: ${theme.colors.error}20;
`;

export default Header;
