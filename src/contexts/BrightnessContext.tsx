import React, { createContext, useState, useContext, useMemo } from 'react';

interface BrightnessContextType {
  brightness: number;
  setBrightness: (brightness: number) => void;
}

const BrightnessContext = createContext<BrightnessContextType | undefined>(undefined);

export const BrightnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brightness, setBrightness] = useState(1);

  const value = useMemo(() => ({ brightness, setBrightness }), [brightness]);

  return (
    <BrightnessContext.Provider value={value}>
      {children}
    </BrightnessContext.Provider>
  );
};

export const useBrightness = () => {
  const context = useContext(BrightnessContext);
  if (context === undefined) {
    throw new Error('useBrightness must be used within a BrightnessProvider');
  }
  return context;
};
