import React from 'react';
import { ListItem } from 'react-native-elements';
import { Appointment } from '../../../types/appointments';
import { getStatusText } from '../utils/statusHelpers';
import ActionButtons from './ActionButtons';
import {
  AppointmentCardContainer,
  StatusBadge,
  StatusText,
  styles,
} from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  onUpdateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onUpdateStatus }) => {
  return (
    <AppointmentCardContainer>
      <ListItem.Content>
        <ListItem.Title style={styles.dateTime}>
          {appointment.date} às {appointment.time}
        </ListItem.Title>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
        {appointment.status === 'pending' && (
          <ActionButtons
            appointmentId={appointment.id}
            onUpdateStatus={onUpdateStatus}
          />
        )}
      </ListItem.Content>
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;
