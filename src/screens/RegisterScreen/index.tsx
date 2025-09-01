import React from 'react';
import { Input, Button } from 'react-native-elements';
import { useRegister } from './hooks/useRegister';
import UserTypeSelector from './components/UserTypeSelector';
import {
  Container,
  Title,
  ErrorText,
  SectionTitle,
  styles,
} from './styles';

const RegisterScreen: React.FC = () => {
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
    navigateToLogin,
  } = useRegister();

  return (
    <Container>
      <Title>Cadastro de Paciente</Title>
      
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

      {error ? <ErrorText>{error}</ErrorText> : null}

      <SectionTitle>Tipo de Usuário</SectionTitle>
      <UserTypeSelector userType={userType} setUserType={setUserType} />

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Voltar para Login"
        onPress={navigateToLogin}
        containerStyle={styles.backButton}
        buttonStyle={styles.backButtonStyle}
      />
    </Container>
  );
};

export default RegisterScreen;
