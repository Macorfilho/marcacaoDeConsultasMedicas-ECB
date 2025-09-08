import React from 'react';
import { ListItem, Button } from 'react-native-elements';
import { ViewStyle } from 'react-native';
import { getStatusText } from '../../utils/statusHelpers';
import {
  CardContainer,
  PatientName,
  DateTime,
  Specialty,
  StatusBadge,
  StatusText,
  ButtonContainer,
  styles,
} from './styles';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface AppointmentCardProps {
  appointment: Appointment;
  onUpdateStatus: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onUpdateStatus }) => {
  return (
    <CardContainer>
      <ListItem.Content>
        <PatientName>
          Paciente: {appointment.patientName || 'Nome não disponível'}
        </PatientName>
        <DateTime>
          {appointment.date} às {appointment.time}
        </DateTime>
        <Specialty>
          {appointment.specialty}
        </Specialty>
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
              containerStyle={styles.actionButton as ViewStyle}
              buttonStyle={styles.confirmButton}
            />
            <Button
              title="Cancelar"
              onPress={() => onUpdateStatus(appointment.id, 'cancelled')}
              containerStyle={styles.actionButton as ViewStyle}
              buttonStyle={styles.cancelButton}
            />
          </ButtonContainer>
        )}
      </ListItem.Content>
    </CardContainer>
  );
};

export default AppointmentCard;
