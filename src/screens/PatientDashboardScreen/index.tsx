import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../../../components/Header';
import { usePatientDashboard } from './hooks/usePatientDashboard';
import AppointmentCard from './components/AppointmentCard';
import {
  Container,
  Title,
  LoadingText,
  EmptyText,
  styles,
} from './styles';

const PatientDashboardScreen: React.FC = () => {
  const {
    signOut,
    appointments,
    loading,
    navigateToCreateAppointment,
    navigateToProfile,
  } = usePatientDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>

        <Button
          title="Agendar Nova Consulta"
          onPress={navigateToCreateAppointment}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={navigateToProfile}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default PatientDashboardScreen;
