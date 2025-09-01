import React from 'react';
import { ListItem, Text } from 'react-native-elements';
import { Appointment } from '../../../types/appointments';
import { getStatusText } from '../utils/statusHelpers';
import {
  AppointmentCardContainer,
  StatusBadge,
  StatusText,
  styles,
} from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <AppointmentCardContainer>
      <ListItem.Content>
        <ListItem.Title style={styles.doctorName}>
          {appointment.doctorName}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.specialty}>
          {appointment.specialty}
        </ListItem.Subtitle>
        <Text style={styles.dateTime}>
          {appointment.date} às {appointment.time}
        </Text>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
      </ListItem.Content>
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;
