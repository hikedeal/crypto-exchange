"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Banned" | "Pending";
  level: number;
  balance: string;
  joined: string;
}

export interface AdminOrder {
  id: string;
  buyer: string;
  seller: string;
  asset: string;
  amount: string;
  status: "In Dispute" | "Completed" | "Processing" | "Cancelled";
  time: string;
  type: "Buy" | "Sell";
}

export interface CMSContent {
  hero: {
    headline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  promotion: {
    text: string;
  };
}

interface AdminState {
  users: AdminUser[];
  orders: AdminOrder[];
  cms: CMSContent;
  settings: {
    maintenanceMode: boolean;
    twoFactorRequired: boolean;
    apiKey: string;
    supportEmail: string;
  };
  orderFilter: string;
  orderSearch: string;
  
  // Actions
  updateUserStatus: (userId: string, status: AdminUser["status"]) => void;
  resolveOrderDispute: (orderId: string) => void;
  updateCMS: (newCMS: Partial<CMSContent>) => void;
  updateHero: (hero: Partial<CMSContent["hero"]>) => void;
  updateSettings: (settings: Partial<AdminState["settings"]>) => void;
  setOrderFilter: (filter: string) => void;
  setOrderSearch: (search: string) => void;
  addUser: (user: AdminUser) => void;
}

const initialUsers: AdminUser[] = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "Active", level: 2, balance: "$12,450", joined: "2024-01-15" },
  { id: "2", name: "Sarah Smith", email: "sarah@crypto.io", status: "Active", level: 3, balance: "$45,200", joined: "2024-02-01" },
  { id: "3", name: "Mike Ross", email: "mike.r@gmail.com", status: "Banned", level: 1, balance: "$0", joined: "2023-11-20" },
  { id: "4", name: "Alice Wong", email: "alice.w@tech.com", status: "Active", level: 2, balance: "$8,900", joined: "2024-02-14" },
  { id: "5", name: "David Chen", email: "d.chen@enterprise.com", status: "Pending", level: 1, balance: "$1,200", joined: "2024-03-05" },
];

const initialOrders: AdminOrder[] = [
  { id: "ORD-7741", buyer: "John Doe", seller: "CryptoKing", asset: "USDT", amount: "500.00", status: "In Dispute", time: "10 mins ago", type: "Buy" },
  { id: "ORD-9982", buyer: "Sarah Smith", seller: "Luna-P2P", asset: "BTC", amount: "0.025", status: "Completed", time: "45 mins ago", type: "Sell" },
  { id: "ORD-1123", buyer: "Mike Ross", seller: "FastTrade", asset: "ETH", amount: "1.20", status: "Processing", time: "1 hour ago", type: "Buy" },
  { id: "ORD-5541", buyer: "Alice Wong", seller: "GlobalEx", asset: "USDT", amount: "2,500.00", status: "Cancelled", time: "3 hours ago", type: "Sell" },
  { id: "ORD-8821", buyer: "David Chen", seller: "ProTrader", asset: "BTC", amount: "0.15", status: "In Dispute", time: "5 hours ago", type: "Buy" },
];

const initialCMS: CMSContent = {
  hero: {
    headline: "Trade Crypto with Zero Boundaries.",
    subtitle: "The world's most advanced Peer-to-Peer crypto exchange. Buy and sell BTC, ETH, and USDT with 300+ payment methods securely.",
    ctaPrimary: "Start Trading Now",
    ctaSecondary: "View Offers",
  },
  promotion: {
    text: "Over $2 Billion in Quarterly Volume",
  },
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      users: initialUsers,
      orders: initialOrders,
      cms: initialCMS,
      settings: {
        maintenanceMode: false,
        twoFactorRequired: true,
        apiKey: "pk_live_51P8zR9...2jK9",
        supportEmail: "support@p2p-exchange.io",
      },
      orderFilter: "All Orders",
      orderSearch: "",

      updateUserStatus: (userId, status) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, status } : u)),
        })),

      resolveOrderDispute: (orderId) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: "Completed" } : o)),
        })),

      updateCMS: (newCMS) =>
        set((state) => ({
          cms: { ...state.cms, ...newCMS },
        })),
        
      updateHero: (hero) =>
        set((state) => ({
          cms: { 
            ...state.cms, 
            hero: { ...state.cms.hero, ...hero } 
          },
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setOrderFilter: (filter) =>
        set({ orderFilter: filter }),

      setOrderSearch: (search) =>
        set({ orderSearch: search }),

      addUser: (user) =>
        set((state) => ({
          users: [user, ...state.users],
        })),
    }),
    {
      name: "p2p-exchange-admin-storage",
    }
  )
);
