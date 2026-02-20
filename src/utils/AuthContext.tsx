import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  cryptoKey: CryptoKey | null;
  loginSecurely: (key: CryptoKey) => void;
  logoutSecurely: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // RAM-ONLY STORAGE: The state is wiped if the user refreshes the page
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

  const loginSecurely = (key: CryptoKey) => {
    setCryptoKey(key);
  };

  const logoutSecurely = () => {
    // Overwrite the key with null, destroying it from memory instantly
    setCryptoKey(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!cryptoKey, 
      cryptoKey, 
      loginSecurely, 
      logoutSecurely 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to make grabbing the key easy in the components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}