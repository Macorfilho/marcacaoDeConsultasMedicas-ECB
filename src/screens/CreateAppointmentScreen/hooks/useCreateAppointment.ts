import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';
import { authApiService } from '../../../services/authApi';
import { User } from '../../../types/auth';
import { Appointment } from '../../../types/appointments';
import { Doctor } from '../../../types/doctors';
import { RootStackParamList } from '../../../types/navigation';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CreateAppointment'
  >;
};

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<CreateAppointmentScreenProps['navigation']>();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError('');
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setError('Erro ao carregar médicos. Tente novamente mais tarde.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const convertUsersToDoctors = (users: User[]): Doctor[] => {
    return users
      .filter((user) => user.role === 'doctor')
      .map((user) => ({
        id: user.id.toString(),
        name: user.name,
        specialty:
          user.role === 'doctor' && 'specialty' in user && user.specialty
            ? user.specialty
            : 'Especialidade não informada',
        image: user.image || 'https://via.placeholder.com/150',
      }));
  };

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      const storedAppointments = await AsyncStorage.getItem(
        '@MedicalApp:appointments'
      );
      const appointments: Appointment[] = storedAppointments
        ? JSON.parse(storedAppointments)
        : [];

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      appointments.push(newAppointment);

      await AsyncStorage.setItem(
        '@MedicalApp:appointments',
        JSON.stringify(appointments)
      );

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
    loading,
    error,
    doctors,
    loadingDoctors,
    convertUsersToDoctors,
    handleCreateAppointment,
  };
};
