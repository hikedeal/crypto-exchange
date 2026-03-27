import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  avatarUrl?: string;
  balances: {
    USDT: number;
    BTC: number;
    ETH: number;
    BNB: number;
  };
  notifications: Array<{ id: string; title: string; message: string; type: "success" | "error" | "info" }>;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  is2FAEnabled: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateBalance: (coin: keyof User["balances"], amount: number) => void;
  addNotification: (title: string, message: string, type: "success" | "error" | "info") => void;
  clearNotifications: () => void;
  toggle2FA: () => void;
}

const mockUser: User = {
  id: "u_1",
  name: "Alex Trader",
  email: "alex@crypto.local",
  phone: "+1 234 567 8900",
  country: "United States",
  balances: {
    USDT: 1000,
    BTC: 0.15,
    ETH: 1.2,
    BNB: 5.5,
  },
  notifications: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      is2FAEnabled: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      updateBalance: (coin, amount) =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              balances: {
                ...state.user.balances,
                [coin]: state.user.balances[coin] + amount,
              },
            },
          };
        }),

      addNotification: (title, message, type) =>
        set((state) => {
          if (!state.user) return state;
          const newNotif = { id: Math.random().toString(36).substring(7), title, message, type };
          return {
            user: {
              ...state.user,
              notifications: [newNotif, ...state.user.notifications].slice(0, 5),
            },
          };
        }),

      clearNotifications: () =>
        set((state) => ({
          user: state.user ? { ...state.user, notifications: [] } : null,
        })),

      toggle2FA: () =>
        set((state) => ({
          is2FAEnabled: !state.is2FAEnabled,
        })),
    }),
    {
      name: "p2p-exchange-user-storage",
    }
  )
);
