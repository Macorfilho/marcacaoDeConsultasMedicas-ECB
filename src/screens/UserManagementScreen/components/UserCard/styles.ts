import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import { ViewStyle, TextStyle } from 'react-native';
import theme from '../../../../styles/theme';
import { getRoleColor } from '../../utils/roleHelpers';

interface StyledProps {
  role: string;
}

export const styles = {
    actionButton: {
        marginTop: 8,
        width: '48%',
      } as ViewStyle,
      editButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 8,
      },
      deleteButton: {
        backgroundColor: theme.colors.error,
        paddingVertical: 8,
      },
      userName: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
      } as TextStyle,
      userEmail: {
        fontSize: 14,
        color: theme.colors.text,
        marginTop: 4,
      } as TextStyle,
};

export const UserCardContainer = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const RoleBadge = styled.View<StyledProps>`
  background-color: ${(props) => getRoleColor(props.role) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const RoleText = styled.Text<StyledProps>`
  color: ${(props) => getRoleColor(props.role)};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
