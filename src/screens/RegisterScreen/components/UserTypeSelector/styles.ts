import styled from "styled-components/native";
import theme from "../../../../styles/theme";

export const SelectorContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Option = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 12px 20px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.border};
  background-color: ${(props) =>
    props.selected ? theme.colors.primary + "20" : "transparent"};
`;

export const OptionText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.text};
`;