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
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import { Container, Title, LoadingText, styles } from './styles';

type DoctorDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorDashboard'>;
};

const DoctorDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
  const { loading, appointments, handleUpdateStatus } = useDoctorDashboard();

  return (
    <Container>
      <Header />
      <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AppointmentCard
                appointment={item}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
            ListEmptyComponent={<EmptyState />}
            ListHeaderComponent={
              <>
                <Title>Minhas Consultas</Title>
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
    </Container>
  );
};

export default DoctorDashboardScreen;
