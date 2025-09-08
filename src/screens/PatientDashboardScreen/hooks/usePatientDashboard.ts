import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../../../types/appointments';
import { useAuth } from '../../../contexts/AuthContext';

export const usePatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem(
        '@MedicalApp:appointments'
      );
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.patientId === user?.id
        );
        setAppointments(userAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  return {
    loading,
    appointments,
  };
};
