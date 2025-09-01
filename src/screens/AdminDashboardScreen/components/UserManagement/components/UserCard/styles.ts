import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';
import theme from '../../../../../../styles/theme';

interface StyledProps {
  role: string;
}

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return theme.colors.error;
    case 'doctor':
      return theme.colors.primary;
    case 'patient':
      return theme.colors.success;
    default:
      return theme.colors.secondary;
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'doctor':
      return 'Médico';
    case 'patient':
      return 'Paciente';
    default:
      return role;
  }
};

export const UserContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const UserInfo = styled.View`
  margin-bottom: 16px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 6px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${theme.colors.secondary};
  margin-bottom: 8px;
`;

export const UserRole = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props: StyledProps) => getRoleColor(props.role)};
  text-transform: uppercase;
  background-color: ${(props: StyledProps) => getRoleColor(props.role) + '20'};
  padding: 4px 8px;
  border-radius: 12px;
  align-self: flex-start;
`;

export const PasswordContainer = styled.View`
  margin-top: 16px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

export const styles = {
  passwordInput: {
    marginBottom: 12,
  } as ViewStyle,
  saveButton: {
    backgroundColor: theme.colors.success,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  } as ViewStyle,
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  } as ViewStyle,
  changePasswordButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  } as ViewStyle,
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  } as TextStyle,
};