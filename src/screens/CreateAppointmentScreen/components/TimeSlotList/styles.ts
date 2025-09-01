import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import theme from '../../../../styles/theme';

interface StyledProps {
  isSelected: boolean;
}

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const TimeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
`;

export const TimeCard = styled(TouchableOpacity)<StyledProps>`
  width: 23%;
  padding: 8px;
  border-radius: 6px;
  background-color: ${(props) => (props.isSelected ? theme.colors.primary + '20' : theme.colors.background)};
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? theme.colors.primary : theme.colors.border)};
  align-items: center;
  justify-content: center;
`;

export const TimeText = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.isSelected ? theme.colors.primary : theme.colors.text)};
`;
