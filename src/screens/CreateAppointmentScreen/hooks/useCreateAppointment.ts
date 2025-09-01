import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';
import { authApiService } from '../../services/authApi';
import { User } from '../../types/auth';
import { Doctor, Appointment } from '../../types/appointments';
import { RootStackParamList } from '../../types/navigation';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;

import { convertUsersToDoctors } from '../utils/doctorHelpers';

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProps>();
  
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const doctorsData = await authApiService.getAllDoctors();
        setDoctors(convertUsersToDoctors(doctorsData));
      } catch (err) {
        setError('Erro ao carregar médicos. Tente novamente.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    loadDoctors();
  }, []);

  const handleCreateAppointment = async () => {
    if (!date || !selectedTime || !selectedDoctor) {
      setError('Por favor, preencha a data e selecione um médico e horário');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      appointments.push(newAppointment);
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      setError('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    doctors,
    loading,
    loadingDoctors,
    error,
    handleCreateAppointment,
    navigation,
  };
};
