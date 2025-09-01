import React from 'react';
import { Appointment } from '../../../types/appointments';
import { User } from '../../../types/auth';
import {
  AppointmentCardContainer,
  DoctorImage,
  InfoContainer,
  DoctorName,
  DoctorSpecialty,
} from './styles';

interface AppointmentCardProps {
  item: Appointment;
  doctor?: User;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ item, doctor }) => {
  return (
    <AppointmentCardContainer>
      <DoctorImage source={{ uri: doctor?.image || 'https://via.placeholder.com/100' }} />
      <InfoContainer>
        <DoctorName>{doctor?.name || 'Médico não encontrado'}</DoctorName>
        <DoctorSpecialty>
          {doctor?.specialty || 'Especialidade não encontrada'}
        </DoctorSpecialty>
      </InfoContainer>
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;
