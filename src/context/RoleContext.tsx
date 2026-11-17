import { createContext, useContext, useState, type ReactNode } from 'react';
import { USERS } from '../data/mockData';

type Role = typeof USERS[keyof typeof USERS];

interface RoleContextType {
  role: Role;
  isAuthenticated: boolean;
  setRole: (role: Role) => void;
  login: (role: Role) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(USERS.INTERNAL);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (newRole: Role) => {
    setRole(newRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <RoleContext.Provider value={{ role, isAuthenticated, setRole, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
