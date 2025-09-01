import React from 'react';
import { RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../../components/Header';
import theme from '../../../styles/theme';
import { useHome } from './hooks/useHome';
import AppointmentCard from './components/AppointmentCard';
import {
  Container,
  Content,
  AppointmentList,
  EmptyText,
} from './styles';

const HomeScreen: React.FC = () => {
  const {
    appointments,
    refreshing,
    onRefresh,
    getDoctorInfo,
    navigateToCreateAppointment,
  } = useHome();

  return (
    <Container>
      <Header />
      <Content>
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme.spacing.medium
          }}
          onPress={navigateToCreateAppointment}
        />

        <AppointmentList
          data={appointments}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: { item: any }) => (
            <AppointmentCard item={item} doctor={getDoctorInfo(item.doctorId)} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          }
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;
