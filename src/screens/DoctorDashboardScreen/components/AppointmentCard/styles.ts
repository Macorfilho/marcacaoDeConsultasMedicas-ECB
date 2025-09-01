import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import { TextStyle } from 'react-native';
import theme from '../../../../styles/theme';
import { getStatusColor } from '../../utils/statusHelpers';

interface StyledProps {
  status: string;
}

export const styles = {
  dateTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  } as TextStyle,
};

export const AppointmentCardContainer = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<StyledProps>`
  color: ${(props) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;
