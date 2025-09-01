import React from 'react';
import { ListItem, Button } from 'react-native-elements';
import { User } from '../../../types/auth';
import { getRoleText } from '../utils/roleHelpers';
import {
  UserCardContainer,
  RoleBadge,
  RoleText,
  styles,
  ButtonContainer,
} from './styles';

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <UserCardContainer>
      <ListItem.Content>
        <ListItem.Title style={styles.userName}>
          {user.name}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.userEmail}>
          {user.email}
        </ListItem.Subtitle>
        <RoleBadge role={user.role}>
          <RoleText role={user.role}>
            {getRoleText(user.role)}
          </RoleText>
        </RoleBadge>
        <ButtonContainer>
          <Button
            title="Editar"
            onPress={() => {}} // Placeholder for edit functionality
            containerStyle={styles.actionButton}
            buttonStyle={styles.editButton}
          />
          <Button
            title="Excluir"
            onPress={() => onDelete(user.id)}
            containerStyle={styles.actionButton}
            buttonStyle={styles.deleteButton}
          />
        </ButtonContainer>
      </ListItem.Content>
    </UserCardContainer>
  );
};

export default UserCard;
