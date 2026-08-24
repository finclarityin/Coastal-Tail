import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '../types';
import { INITIAL_ADMIN_USERS } from '../data/storeDefaults';

interface AdminAuthContextType {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => { success: boolean; error?: string };
  logout: () => void;
  adminUsers: AdminUser[];
  addAdminUser: (user: Omit<AdminUser, 'id'>) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  hasPermission: (permission: string) => boolean;
  isOwner: boolean;
  isManager: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'coastal_tails_admin_auth_v1';
const ADMIN_USERS_KEY = 'coastal_tails_admin_users_v1';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_USERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_ADMIN_USERS;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(adminUsers));
    } catch {
      // ignore
    }
  }, [adminUsers]);

  const login = (email: string, password: string, rememberMe = true): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Quick demo matches or registered users
    const matchedUser = adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      return { success: false, error: 'No admin account found with this email address.' };
    }

    if (!matchedUser.active) {
      return { success: false, error: 'This account has been deactivated. Please contact the studio owner.' };
    }

    // Passwords accepted: admin123, manager123, groomer123, staff123 or any 6+ char for test
    const validRoles = ['owner', 'manager', 'groomer', 'staff'];
    const expectedPw = `${matchedUser.role}123`;
    
    if (password !== expectedPw && password !== 'admin123' && password !== 'coastaltails' && password.length < 6) {
      return { success: false, error: `Invalid credentials. (Hint: default demo password is "${expectedPw}")` };
    }

    const updatedUser: AdminUser = {
      ...matchedUser,
      lastLogin: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setCurrentAdmin(updatedUser);

    if (rememberMe) {
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    } else {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
    }

    // Update in users list
    setAdminUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

    return { success: true };
  };

  const logout = () => {
    setCurrentAdmin(null);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const addAdminUser = (user: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `usr-${Date.now()}`,
    };
    setAdminUsers((prev) => [newUser, ...prev]);
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    if (currentAdmin?.id === id) {
      setCurrentAdmin((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteAdminUser = (id: string) => {
    if (currentAdmin?.id === id) return;
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const isOwner = currentAdmin?.role === 'owner';
  const isManager = currentAdmin?.role === 'manager' || isOwner;

  const hasPermission = (permission: string): boolean => {
    if (!currentAdmin) return false;
    if (currentAdmin.role === 'owner') return true;
    if (currentAdmin.permissions.includes('all') || currentAdmin.permissions.includes(permission)) {
      return true;
    }
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        isAuthenticated: !!currentAdmin,
        login,
        logout,
        adminUsers,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        hasPermission,
        isOwner,
        isManager,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
