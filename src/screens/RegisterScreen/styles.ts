import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 24px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 12px;
  margin-left: 10px;
`;

export const styles = {
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonStyle: {
    backgroundColor: "transparent",
  },
  backButtonTitleStyle: {
    color: theme.colors.primary,
  },
};