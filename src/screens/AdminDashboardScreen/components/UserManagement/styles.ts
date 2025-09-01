import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${theme.colors.secondary};
  margin-bottom: 16px;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.secondary};
  text-align: center;
  margin-top: 40px;
`;