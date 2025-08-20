import { Platform, StatusBar } from 'react-native';

// Margem superior para o Dynamic Island do iPhone
export const getSafeAreaTopMargin = () => {
  if (Platform.OS === 'ios') {
    // Para iPhone com Dynamic Island (iPhone 14 Pro e superior)
    // A altura da área segura varia, mas geralmente é entre 47-59px
    return 59;
  }
  // Para Android, usa a altura da StatusBar
  return StatusBar.currentHeight || 0;
};

// Container principal com margem superior
export const SafeAreaContainer = `
  padding-top: ${getSafeAreaTopMargin()}px;
  flex: 1;
`;

// Margem superior apenas
export const SafeAreaTopMargin = `
  margin-top: ${getSafeAreaTopMargin()}px;
`;

// Padding superior apenas
export const SafeAreaTopPadding = `
  padding-top: ${getSafeAreaTopMargin()}px;
`;
