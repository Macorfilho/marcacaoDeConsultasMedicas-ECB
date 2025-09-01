import React from 'react';
import { ListItem, Button } from 'react-native-elements';
import { Text } from 'react-native';
import { Appointment } from '../../../../types/appointments';
import { getStatusText } from '../../utils/statusHelpers';
import {
  AppointmentCardContainer,
  StatusBadge,
  StatusText,
  ButtonContainer,
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
        {appointment.status === 'pending' && (
          <ButtonContainer>
            <Button
              title="Confirmar"
              onPress={() => onUpdateStatus(appointment.id, 'confirmed')}
              containerStyle={styles.actionButton}
              buttonStyle={styles.confirmButton}
            />
            <Button
              title="Cancelar"
              onPress={() => onUpdateStatus(appointment.id, 'cancelled')}
              containerStyle={styles.actionButton}
              buttonStyle={styles.cancelButton}
            />
          </ButtonContainer>
        )}
      </ListItem.Content>
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;
