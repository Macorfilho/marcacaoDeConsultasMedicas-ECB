import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Alert } from "react-native";

export const useRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp(email, password, name, userType);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro no cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    loading,
    error,
    handleRegister,
  };
};