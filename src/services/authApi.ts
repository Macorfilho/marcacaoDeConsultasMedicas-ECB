import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { apiClient, API_ENDPOINTS } from './api';

// Interface para usuário da API
interface ApiUser {
  id: string;
  nome: string;
  email: string;
  tipo: 'ADMIN' | 'MEDICO' | 'PACIENTE';
  imagem?: string;
  especialidade?: string;
}

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
  REGISTERED_USERS: '@MedicalApp:registeredUsers',
};

// Médicos mockados (DEPRECATED - usar authApiService.getAllDoctors())
const mockDoctors: User[] = [
  // Dados removidos - agora vêm da API
];

// Admin mockado (DEPRECATED - usar authApiService)
const mockAdmin = {
  id: 'admin',
  name: 'Administrador',
  email: 'admin@example.com',
  role: 'admin' as const,
  image: 'https://randomuser.me/api/portraits/men/3.jpg',
};

// Lista de usuários cadastrados (pacientes)
let registeredUsers: (User & { password: string })[] = [];

export const authService = {
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    // Verifica se é o admin
    if (credentials.email === mockAdmin.email && credentials.password === '123456') {
      return {
        user: mockAdmin,
        token: 'admin-token',
      };
    }

    // Verifica se é um médico
    const doctor = mockDoctors.find(
      (d) => d.email === credentials.email && credentials.password === '123456'
    );
    if (doctor) {
      return {
        user: doctor,
        token: `doctor-token-${doctor.id}`,
      };
    }

    // Verifica se é um paciente registrado
    const patient = registeredUsers.find(
      (p) => p.email === credentials.email
    );
    if (patient) {
      // Verifica a senha do paciente
      if (credentials.password === patient.password) {
        // Remove a senha do objeto antes de retornar
        const { password, ...patientWithoutPassword } = patient;
        return {
          user: patientWithoutPassword,
          token: `patient-token-${patient.id}`,
        };
      }
    }

    throw new Error('Email ou senha inválidos');
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    // Verifica se o email já está em uso
    if (
      mockDoctors.some((d) => d.email === data.email) ||
      mockAdmin.email === data.email ||
      registeredUsers.some((u) => u.email === data.email)
    ) {
      throw new Error('Email já está em uso');
    }

    // Cria um novo paciente
    const newPatient: User & { password: string } = {
      id: `patient-${registeredUsers.length + 1}`,
      name: data.name,
      email: data.email,
      role: 'patient' as const,
      image: `https://randomuser.me/api/portraits/${registeredUsers.length % 2 === 0 ? 'men' : 'women'}/${
        registeredUsers.length + 1
      }.jpg`,
      password: data.password,
    };

    registeredUsers.push(newPatient);

    // Salva a lista atualizada de usuários
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));

    // Remove a senha do objeto antes de retornar
    const { password, ...patientWithoutPassword } = newPatient;
    return {
      user: patientWithoutPassword,
      token: `patient-token-${newPatient.id}`,
    };
  },

  async signOut(): Promise<void> {
    // Limpa os dados do usuário do AsyncStorage
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },

  // Funções para o admin
  async getAllUsers(): Promise<User[]> {
    return [...mockDoctors, ...registeredUsers];
  },

  async getAllDoctors(): Promise<User[]> {
    // DEPRECATED: Use authApiService.getAllDoctors() instead
    return [];
  },

  async getPatients(): Promise<User[]> {
    return registeredUsers;
  },

  // Função para carregar usuários registrados ao iniciar o app
  async loadRegisteredUsers(): Promise<void> {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (usersJson) {
        registeredUsers = JSON.parse(usersJson);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  },
};

// Serviço de autenticação com API real
export const authApiService = {
  // Tenta obter o usuário atual usando múltiplos endpoints conhecidos
  async getCurrentUserWithFallback(): Promise<ApiUser> {
    const candidates = [
      API_ENDPOINTS.CURRENT_USER,
      '/auth/me',
      '/usuarios/logado',
      '/usuarios/usuario-autenticado',
    ];

    let lastError: unknown = null;
    for (const path of candidates) {
      try {
        const user = await apiClient.get<ApiUser>(path);
        if (user) return user;
      } catch (err) {
        lastError = err;
        // tenta o próximo
      }
    }
    throw lastError ?? new Error('Não foi possível obter o usuário atual');
  },
  // BUSCAR todos os médicos
  async getAllDoctors(): Promise<User[]> {
    try {
      const doctors = await apiClient.get<ApiUser[]>(API_ENDPOINTS.DOCTORS);
      return doctors.map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      throw new Error('Erro ao carregar médicos');
    }
  },

  // BUSCAR médicos por especialidade
  async getDoctorsBySpecialty(specialty: string): Promise<User[]> {
    try {
      const doctors = await apiClient.get<ApiUser[]>(
        `${API_ENDPOINTS.DOCTORS}?especialidade=${encodeURIComponent(specialty)}`
      );
      return doctors.map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar médicos por especialidade:', error);
      throw new Error('Erro ao carregar médicos da especialidade');
    }
  },

  // MAPEAMENTO da API para frontend
  mapApiUserToUser(apiUser: ApiUser): User {
    // Adiciona log para debugar
    console.log('API User recebido:', apiUser);
    
    // Verifica se apiUser existe
    if (!apiUser) {
      throw new Error('Dados do usuário não recebidos do backend');
    }

    // Verifica se o tipo existe, se não, assume PACIENTE como padrão
    const userType = apiUser.tipo || 'PACIENTE';
    console.log('Tipo de usuário:', userType);
    
    let image: string;
    if (userType === 'ADMIN') {
      // NOVO - Ícone de avatar para admins - SVG simples de usuário
      image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNjY2NjY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTAgNjVDMzUgNjUgMjUgNzUgMjUgODVWOTVINzVWODVDNzUgNzUgNjUgNjUgNTAgNjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
    } else {
      // Fotos aleatórias para médicos e pacientes
      const numericId = parseInt(apiUser.id) || 0;
      image = `https://randomuser.me/api/portraits/${numericId % 2 === 0 ? 'men' : 'women'}/${(numericId % 10) + 1}.jpg`;
    }

    const baseUser = {
      id: apiUser.id,
      name: apiUser.nome,
      email: apiUser.email,
      image: image,
    };

    switch (userType) {
      case 'MEDICO':
        return {
          ...baseUser,
          role: 'doctor' as const,
          specialty: apiUser.especialidade || 'Especialidade não informada',
        };
      case 'ADMIN':
        return {
          ...baseUser,
          role: 'admin' as const,
        };
      case 'PACIENTE':
        return {
          ...baseUser,
          role: 'patient' as const,
        };
      default:
        throw new Error(`Tipo de usuário desconhecido: ${userType}`);
    }
  },

  // Métodos de autenticação (mantidos para compatibilidade)
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Mapeia os dados do frontend para o formato esperado pelo backend
      const backendData = {
        email: credentials.email,
        senha: credentials.password,
      };

      const response = await apiClient.post<any>(API_ENDPOINTS.LOGIN, backendData);

      // Alguns backends retornam apenas o token. Se for o caso, buscamos o usuário em /usuarios/me
      const token: string | undefined = response?.token;
      if (!token) {
        throw new Error('Token não retornado pelo servidor');
      }

      // Configura o token no cliente para chamadas subsequentes
      apiClient.setToken(token);

      // Busca o usuário atual com fallback em múltiplos endpoints
      const currentUser = await this.getCurrentUserWithFallback();
      const user = this.mapApiUserToUser(currentUser);

      return { user, token };
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Email ou senha inválidos');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Mapeia os dados do frontend para o formato esperado pelo backend
      const backendData = {
        nome: data.name,
        email: data.email,
        senha: data.password,
        tipo: data.userType || 'PACIENTE',
      };

      const response = await apiClient.post<any>(API_ENDPOINTS.REGISTER, backendData);

      // Alguns backends retornam apenas o token após o cadastro
      const token: string | undefined = response?.token;
      if (!token) {
        throw new Error('Token não retornado pelo servidor');
      }

      // Configura o token e busca o usuário atual
      apiClient.setToken(token);
      const currentUser = await this.getCurrentUserWithFallback();
      const user = this.mapApiUserToUser(currentUser);

      return { user, token };
    } catch (error) {
      console.error('Erro no registro:', error);
      throw new Error('Erro ao criar conta');
    }
  },

  async signOut(): Promise<void> {
    // Limpa o token do cliente da API
    apiClient.clearToken();
  },

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },
}; 