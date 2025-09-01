import React from 'react';
import { UserTypeContainer, UserTypeButton, UserTypeText } from './styles';

interface UserTypeSelectorProps {
  userType: 'PACIENTE' | 'ADMIN';
  setUserType: (type: 'PACIENTE' | 'ADMIN') => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, setUserType }) => {
  return (
    <UserTypeContainer>
      <UserTypeButton 
        selected={userType === 'PACIENTE'}
        onPress={() => setUserType('PACIENTE')}
      >
        <UserTypeText selected={userType === 'PACIENTE'}>
          Paciente
        </UserTypeText>
      </UserTypeButton>
      
      <UserTypeButton 
        selected={userType === 'ADMIN'}
        onPress={() => setUserType('ADMIN')}
      >
        <UserTypeText selected={userType === 'ADMIN'}>
          Administrador
        </UserTypeText>
      </UserTypeButton>
    </UserTypeContainer>
  );
};

export default UserTypeSelector;
