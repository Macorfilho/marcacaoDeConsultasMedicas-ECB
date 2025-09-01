import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';
import { ListItem } from 'react-native-elements';
import theme from '../../styles/theme';

interface StyledProps {
  status: string;
}

export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  } as ViewStyle,
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  } as TextStyle,
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  } as TextStyle,
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  } as TextStyle,
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;
