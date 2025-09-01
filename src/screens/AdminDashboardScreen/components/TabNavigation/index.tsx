import React from 'react';
import { TabContainer, TabButton, TabText } from './styles';

interface TabNavigationProps {
  activeTab: 'appointments' | 'users';
  setActiveTab: (tab: 'appointments' | 'users') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <TabContainer>
      <TabButton
        active={activeTab === 'appointments'}
        onPress={() => setActiveTab('appointments')}
      >
        <TabText active={activeTab === 'appointments'}>Consultas</TabText>
      </TabButton>
      <TabButton
        active={activeTab === 'users'}
        onPress={() => setActiveTab('users')}
      >
        <TabText active={activeTab === 'users'}>Usuários</TabText>
      </TabButton>
    </TabContainer>
  );
};

export default TabNavigation;
