import theme from '../../styles/theme';

export const getRoleText = (role: string) => {
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

export const getRoleColor = (role: string) => {
    switch (role) {
        case 'admin':
          return theme.colors.primary;
        case 'doctor':
          return theme.colors.success;
        default:
          return theme.colors.secondary;
      }
}
