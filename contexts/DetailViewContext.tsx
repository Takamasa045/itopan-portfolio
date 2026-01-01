import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DetailViewContextType {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  detailPages: number;
  setDetailPages: (pages: number) => void;
}

const noop = () => {};
const noopPages = (_pages: number) => {};
const defaultValue: DetailViewContextType = {
  isDetailOpen: false,
  setIsDetailOpen: noop,
  detailPages: 0,
  setDetailPages: noopPages
};

export const DetailViewContext = createContext<DetailViewContextType | null>(null);

export const DetailViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailPages, setDetailPages] = useState(0);

  return (
    <DetailViewContext.Provider value={{ isDetailOpen, setIsDetailOpen, detailPages, setDetailPages }}>
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
