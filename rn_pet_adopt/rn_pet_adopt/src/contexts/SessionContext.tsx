import { createContext, useContext, useState, ReactNode } from 'react';

interface SessionContextData {
  isAuthenticated: boolean;
  hasSeenSplash: boolean;
  login: () => void;
  logout: () => void;
  completeSplash: () => void;
  resetSplash: () => void;
}

const SessionContext = createContext<SessionContextData>({} as SessionContextData);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const completeSplash = () => setHasSeenSplash(true);
  const resetSplash = () => setHasSeenSplash(false);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, hasSeenSplash, login, logout, completeSplash, resetSplash }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
