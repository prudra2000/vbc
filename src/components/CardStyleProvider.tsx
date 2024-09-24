import React, { createContext, useContext } from 'react';
import '@/app/CardStyles.css';

type CardType = 'primary' | 'secondary' | 'success' | 'danger';

interface CardStyleContextProps {
  type: CardType;
}

const CardStyleContext = createContext<CardStyleContextProps | undefined>(undefined);

export const CardStyleProvider: React.FC<{ type: CardType; children: React.ReactNode }> = ({ type, children }) => {
  return (
    <CardStyleContext.Provider value={{ type }}>
      {children}
    </CardStyleContext.Provider>
  );
};

export const useCardStyle = () => {
  const context = useContext(CardStyleContext);
  if (!context) {
    throw new Error('useCardStyle must be used within a CardStyleProvider');
  }
  return context;
};