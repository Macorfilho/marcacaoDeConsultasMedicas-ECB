import { User } from "../../../types/auth";
import { Doctor } from "../../../types/appointments";

export const convertUsersToDoctors = (users: User[]): Doctor[] => {
    return users
      .filter(user => user.role === 'doctor')
      .map((user, index) => ({
        id: user.id,
        name: user.name,
        specialty: user.specialty || 'Especialidade não informada',
        // Adiciona uma imagem padrão caso não exista
        image: user.image || `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
      }));
  };
  