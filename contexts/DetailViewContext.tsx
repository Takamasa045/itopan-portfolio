import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DetailViewContextType {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

const noop = () => {};
const defaultValue: DetailViewContextType = { isDetailOpen: false, setIsDetailOpen: noop };

export const DetailViewContext = createContext<DetailViewContextType | null>(null);

export const DetailViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <DetailViewContext.Provider value={{ isDetailOpen, setIsDetailOpen }}>
      {children}
    </DetailViewContext.Provider>
  );
};

export const useDetailView = () => {
  const context = useContext(DetailViewContext);
  if (!context) {
    return defaultValue;
  }
  return context;
};
