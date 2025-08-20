import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

const mockDoctors = [
  // Dados removidos - agora vêm da API
];

async getAllDoctors(): Promise<User[]> {
  // DEPRECIADO: Use authApiService.getAllDoctors() instead
  return [];
},