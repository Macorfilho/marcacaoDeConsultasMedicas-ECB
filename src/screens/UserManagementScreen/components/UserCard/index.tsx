import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import {
  UserCardContainer,
  RoleBadge,
  RoleText,
  ButtonContainer,
  styles,
} from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

interface UserCardProps {
  user: User;
  onDelete: (userId: string) => void;
}

const getRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'doctor':
      return 'Médico';
    case 'patient':
      return 'Paciente';
    default:
      return role;
  }
};

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <UserCardContainer>
      <ListItem.Content>
        <ListItem.Title style={styles.userName as TextStyle}>
          {user.name}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.userEmail as TextStyle}>
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
            onPress={() => {}}
            containerStyle={styles.actionButton as ViewStyle}
            buttonStyle={styles.editButton}
          />
          <Button
            title="Excluir"
            onPress={() => onDelete(user.id)}
            containerStyle={styles.actionButton as ViewStyle}
            buttonStyle={styles.deleteButton}
          />
        </ButtonContainer>
      </ListItem.Content>
    </UserCardContainer>
  );
};

export default UserCard;
