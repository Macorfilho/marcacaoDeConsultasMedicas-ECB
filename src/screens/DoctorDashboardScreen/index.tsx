import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../../../components/Header';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import AppointmentCard from './components/AppointmentCard';
import {
  Container,
  Title,
  LoadingText,
  EmptyText,
  styles,
} from './styles';

const DoctorDashboardScreen: React.FC = () => {
  const {
    signOut,
    appointments,
    loading,
    handleUpdateStatus,
    navigateToProfile,
  } = useDoctorDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>

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
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={handleUpdateStatus}
            />
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

export default DoctorDashboardScreen;
