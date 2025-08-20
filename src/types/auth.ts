// Tipos para autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  image?: string;
  specialty?: string; // Para médicos
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType?: 'PACIENTE' | 'ADMIN';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  userType?: 'PACIENTE' | 'ADMIN';
} 