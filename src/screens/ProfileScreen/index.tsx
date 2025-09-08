import React from "react";
import { Button } from "react-native-elements";
import { ViewStyle } from "react-native";

import Header from "../../components/Header";
import ProfileCard from "./components/ProfileCard";
import { useProfileScreen } from "./hooks/useProfileScreen";
import { Container, ScrollView, Title, styles } from "./styles";

const ProfileScreen: React.FC = () => {
  const { user, handleSignOut, handleGoBack } = useProfileScreen();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard user={user} />

        <Button
          title="Voltar"
          onPress={handleGoBack}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Sair"
          onPress={handleSignOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
