import React from 'react';
import { EmptyText } from './styles';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <EmptyText>{message}</EmptyText>;
};

export default EmptyState;
