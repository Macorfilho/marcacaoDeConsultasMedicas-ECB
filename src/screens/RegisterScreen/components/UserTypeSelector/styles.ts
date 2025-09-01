import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const UserTypeContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  gap: 10px;
`;

export const UserTypeButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  align-items: center;
  background-color: ${(props) => (props.selected ? theme.colors.primary : theme.colors.white)};
  border: 2px solid ${(props) => (props.selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
`;

export const UserTypeText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.selected ? 'white' : theme.colors.text)};
`;
