import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../../services/authApi';
import { Appointment } from '../../types/appointments';
import { User } from '../../types/auth';
import { RootStackParamList } from '../../types/navigation';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHome = () => {
  const navigation = useNavigation<NavigationProps>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getDoctorInfo = (doctorId: string): User | undefined => {
    return doctors.find(doctor => doctor.id === doctorId);
  };

  const navigateToCreateAppointment = () => {
    navigation.navigate('CreateAppointment');
  };

  return {
    appointments,
    refreshing,
    onRefresh,
    getDoctorInfo,
    navigateToCreateAppointment,
  };
};
