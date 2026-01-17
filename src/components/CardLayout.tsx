import React, { createContext, useContext } from "react";

export type CardLayout = "classic" | "modern";

const CardLayoutContext = createContext<CardLayout | undefined>(undefined);

export type CardLayoutProviderProps = {
  layout: CardLayout;
  children: React.ReactNode;
};

export function CardLayoutProvider({ layout, children }: CardLayoutProviderProps) {
  return (
    <CardLayoutContext.Provider value={layout}>
      {children}
    </CardLayoutContext.Provider>
  );
}

export function useCardLayout(explicit?: CardLayout) {
  const context = useContext(CardLayoutContext);
  return explicit ?? context;
}
