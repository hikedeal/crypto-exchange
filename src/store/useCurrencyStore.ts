import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "USD" | "EUR" | "INR" | "AED" | "GBP" | "CNY";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: Record<Currency, number>;
  formatCurrency: (amount: number) => string;
}

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83.5,
  AED: 3.67,
  GBP: 0.79,
  CNY: 7.24,
};

const symbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  AED: "د.إ",
  GBP: "£",
  CNY: "¥",
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "USD",
      rates,
      setCurrency: (currency: Currency) => set({ currency }),
      formatCurrency: (amount: number) => {
        const { currency } = get();
        const rate = rates[currency];
        const converted = amount * rate;
        
        return new Intl.NumberFormat('en-US', {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(converted);
      },
    }),
    {
      name: "currency-storage",
    }
  )
);
