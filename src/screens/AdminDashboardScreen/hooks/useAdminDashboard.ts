import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment, User } from '../../../types/appointments';

export const useAdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'users'>('appointments');

  const loadData = async () => {
    setLoading(true);
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }

      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
        );
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        loadData();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return {
    appointments,
    users,
    loading,
    activeTab,
    setActiveTab,
    handleUpdateStatus,
    loadData,
  };
};
