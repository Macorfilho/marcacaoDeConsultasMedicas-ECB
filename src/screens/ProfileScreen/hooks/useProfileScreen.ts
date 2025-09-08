import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";
import { Alert } from "react-native";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export const useProfileScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleSignOut = () => {
    Alert.alert(
      "Confirmar Logout",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    user,
    handleSignOut,
    handleGoBack,
  };
};
