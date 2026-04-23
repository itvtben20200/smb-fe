import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
  loginWithSession: (accessToken: string, user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        set({ user: res.data.user, accessToken: res.data.accessToken });
        // Store role in cookie for middleware
        document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=900`;
        document.cookie = `userRole=${res.data.user.role}; path=/; max-age=604800`;
      },
      register: async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        set({ user: res.data.user, accessToken: res.data.accessToken });
        document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=900`;
        document.cookie = `userRole=${res.data.user.role}; path=/; max-age=604800`;
      },
      logout: async () => {
        await api.post('/auth/logout').catch(() => {});
        set({ user: null, accessToken: null });
        document.cookie = 'accessToken=; path=/; max-age=0';
        document.cookie = 'userRole=; path=/; max-age=0';
      },
      setToken: (token) => set({ accessToken: token }),
      loginWithSession: (accessToken, user) => {
        set({ user, accessToken });
        document.cookie = `accessToken=${accessToken}; path=/; max-age=900`;
        document.cookie = `userRole=${user.role}; path=/; max-age=604800`;
      },
    }),
    { name: 'smb-auth', partialize: (state) => ({ user: state.user }) }
  )
);
