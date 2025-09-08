import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { getStatusColor } from '../../utils/statusHelpers';

interface StyledProps {
  status: string;
}

export const CardContainer = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const PatientName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const DateTime = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const Specialty = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

export const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const styles = {
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
};
