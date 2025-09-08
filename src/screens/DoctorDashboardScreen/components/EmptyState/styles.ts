import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;
