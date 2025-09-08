import React from 'react';
import { ScrollView, ViewStyle, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';
import { usePatientDashboard } from './hooks/usePatientDashboard';
import { Container, Title, LoadingText, styles } from './styles';

type PatientDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientDashboard'>;
};

const PatientDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<PatientDashboardScreenProps['navigation']>();
  const { loading, appointments } = usePatientDashboard();

  return (
    <Container>
      <Header />
      {loading ? (
        <LoadingText>Carregando consultas...</LoadingText>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AppointmentCard appointment={item} />}
          ListEmptyComponent={<EmptyState />}
          ListHeaderComponent={
            <>
              <Title>Minhas Consultas</Title>
              <Button
                title="Agendar Nova Consulta"
                onPress={() => navigation.navigate('CreateAppointment')}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.buttonStyle}
              />
              <Button
                title="Meu Perfil"
                onPress={() => navigation.navigate('Profile')}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.buttonStyle}
              />
            </>
          }
          ListFooterComponent={
            <Button
              title="Sair"
              onPress={signOut}
              containerStyle={styles.button as ViewStyle}
              buttonStyle={styles.logoutButton}
            />
          }
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </Container>
  );
};

export default PatientDashboardScreen;
