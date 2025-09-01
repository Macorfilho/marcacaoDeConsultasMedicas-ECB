import React from 'react';
import { Button, Input } from 'react-native-elements';
import { AdminUser } from '../../../../../services/adminApi';
import {
  UserContainer,
  UserInfo,
  UserName,
  UserEmail,
  UserRole,
  PasswordContainer,
  ButtonContainer,
  styles,
  getRoleText,
} from './styles';

interface UserCardProps {
  user: AdminUser;
  isChangingPassword: boolean;
  newPasswordValue: string;
  onNewPasswordChange: (password: string) => void;
  onStartChangePassword: () => void;
  onSaveChanges: () => void;
  onCancelChanges: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isChangingPassword,
  newPasswordValue,
  onNewPasswordChange,
  onStartChangePassword,
  onSaveChanges,
  onCancelChanges,
}) => {
  return (
    <UserContainer>
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <UserRole role={user.role}>
          {getRoleText(user.role)}
          {user.specialty && ` - ${user.specialty}`}
        </UserRole>
      </UserInfo>
      
      {isChangingPassword ? (
        <PasswordContainer>
          <Input
            placeholder="Nova senha (mín. 6 caracteres)"
            value={newPasswordValue}
            onChangeText={onNewPasswordChange}
            secureTextEntry
            containerStyle={styles.passwordInput}
          />
          <ButtonContainer>
            <Button
              title="Salvar"
              onPress={onSaveChanges}
              buttonStyle={styles.saveButton}
              titleStyle={styles.buttonText}
            />
            <Button
              title="Cancelar"
              onPress={onCancelChanges}
              buttonStyle={styles.cancelButton}
              titleStyle={styles.buttonText}
            />
          </ButtonContainer>
        </PasswordContainer>
      ) : (
        <Button
          title="Alterar Senha"
          onPress={onStartChangePassword}
          buttonStyle={styles.changePasswordButton}
          titleStyle={styles.buttonText}
        />
      )}
    </UserContainer>
  );
};

export default UserCard;