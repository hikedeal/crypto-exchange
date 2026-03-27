import { create } from "zustand";
import { persist } from "zustand/middleware";
import { P2PAd, Order, mockAds, mockOrders } from "@/lib/mockData";

interface P2PStore {
  ads: P2PAd[];
  orders: Order[];
  createAd: (ad: Omit<P2PAd, "id">) => void;
  createOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  cancelOrder: (orderId: string) => void;
  releaseOrder: (orderId: string) => void;
  payOrder: (orderId: string) => void;
  resolveOrderDispute: (orderId: string) => void;
  deleteAd: (adId: string) => void;
  toggleAdStatus: (adId: string) => void;
  updateAd: (adId: string, updates: Partial<P2PAd>) => void;
}

export const useP2PStore = create<P2PStore>()(
  persist(
    (set) => ({
      ads: mockAds,
      orders: mockOrders,
  createAd: (ad) =>
    set((state) => ({
      ads: [{ ...ad, id: `ad_${Date.now()}` }, ...state.ads],
    })),
  createOrder: (order) =>
    set((state) => ({
      orders: [
        {
          ...order,
          id: `ord_${Date.now()}`,
          status: "Pending",
          createdAt: new Date().toISOString(),
        },
        ...state.orders,
      ],
    })),
  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: "Cancelled" } : o
      ),
    })),
  releaseOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: "Released" } : o
      ),
    })),
  payOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: "Paid" } : o
      ),
    })),
      resolveOrderDispute: (orderId) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: "Released" } : o
          ),
        })),
      deleteAd: (adId) =>
        set((state) => ({
          ads: state.ads.filter((ad) => ad.id !== adId),
        })),
      toggleAdStatus: (adId) =>
        set((state) => ({
          ads: state.ads.map((ad) =>
            ad.id === adId ? { ...ad, isActive: !ad.isActive } : ad
          ),
        })),
      updateAd: (adId, updates) =>
        set((state) => ({
          ads: state.ads.map((ad) =>
            ad.id === adId ? { ...ad, ...updates } : ad
          ),
        })),
    }),
    {
      name: "p2p-exchange-trading-storage",
    }
  )
);
