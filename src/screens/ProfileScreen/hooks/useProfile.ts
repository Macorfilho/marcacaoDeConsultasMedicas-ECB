import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../types/navigation';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export const useProfile = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const goBack = () => {
    navigation.goBack();
  };

  return {
    user,
    goBack,
  };
};
