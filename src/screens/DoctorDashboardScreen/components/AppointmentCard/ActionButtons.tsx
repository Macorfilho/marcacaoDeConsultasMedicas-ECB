import React from 'react';
import { Button } from 'react-native-elements';
import { ButtonContainer, styles } from '../../styles';

interface ActionButtonsProps {
  appointmentId: string;
  onUpdateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ appointmentId, onUpdateStatus }) => {
  return (
    <ButtonContainer>
      <Button
        title="Confirmar"
        onPress={() => onUpdateStatus(appointmentId, 'confirmed')}
        containerStyle={styles.actionButton}
        buttonStyle={styles.confirmButton}
      />
      <Button
        title="Cancelar"
        onPress={() => onUpdateStatus(appointmentId, 'cancelled')}
        containerStyle={styles.actionButton}
        buttonStyle={styles.cancelButton}
      />
    </ButtonContainer>
  );
};

export default ActionButtons;
