import React from 'react';
import { ViewStyle } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useRegisterScreen } from './hooks/useRegisterScreen';
import UserTypeSelector from './components/UserTypeSelector';
import {
  Container,
  Title,
  ErrorText,
  SectionTitle,
  styles,
} from './styles';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    loading,
    error,
    handleRegister,
  } = useRegisterScreen();

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>

      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      <SectionTitle>Tipo de Usuário</SectionTitle>
      <UserTypeSelector userType={userType} setUserType={setUserType} />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login' as never)}
        containerStyle={styles.backButton as ViewStyle}
        buttonStyle={styles.backButtonStyle}
        titleStyle={styles.backButtonTitleStyle}
      />
    </Container>
  );
};

export default RegisterScreen;