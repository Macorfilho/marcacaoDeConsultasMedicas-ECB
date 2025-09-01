import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

export const AppointmentList = styled(FlatList as new () => FlatList<any>)`
  flex: 1;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
`;
