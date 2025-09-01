import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../../contexts/AuthContext';
import Header from '../../../components/Header';
import UserManagement from '../../../components/UserManagement';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import TabNavigation from './components/TabNavigation';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';
import {
  Container,
  Title,
  SectionTitle,
  LoadingText,
  styles,
} from './styles';

const AdminDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const {
    appointments,
    loading,
    activeTab,
    setActiveTab,
    handleUpdateStatus,
  } = useAdminDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Painel Administrativo</Title>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'appointments' ? (
          <>
            <SectionTitle>Últimas Consultas</SectionTitle>
            {loading ? (
              <LoadingText>Carregando dados...</LoadingText>
            ) : appointments.length === 0 ? (
              <EmptyState message="Nenhuma consulta agendada" />
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            )}
          </>
        ) : (
          <UserManagement />
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

export default AdminDashboardScreen;