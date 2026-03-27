export type Coin = "BTC" | "ETH" | "USDT" | "BNB";
export type PaymentMethod = "UPI" | "Bank" | "PayPal" | "Wise";
export type TradeType = "BUY" | "SELL";
export type OrderStatus = "Pending" | "Paid" | "Released" | "Cancelled";
export type PricingType = "FIXED" | "FLOATING";

export interface P2PAd {
  id: string;
  traderName: string;
  tradesCompleted: number;
  completionRate: number; // percentage
  coin: Coin;
  type: TradeType;
  price: number;
  currency: string;
  available: number;
  limitMin: number;
  limitMax: number;
  paymentMethods: PaymentMethod[];
  pricingType: PricingType;
  marketMarkup?: number; // e.g. 1.5% markup
  commissionPercentage: number;
  walletAddress: string;
  isActive: boolean;
  paymentInstructions?: string;
}

export const mockAds: P2PAd[] = [
  {
    id: "ad_1",
    traderName: "JohnTrader",
    tradesCompleted: 452,
    completionRate: 98.5,
    coin: "USDT",
    type: "SELL",
    price: 1.01,
    currency: "USD",
    available: 50000.0,
    limitMin: 100,
    limitMax: 10000,
    paymentMethods: ["Bank", "Wise"],
    pricingType: "FIXED",
    commissionPercentage: 1.0,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    isActive: true,
    paymentInstructions: "Please send the exact amount. No third-party payments.",
  },
  {
    id: "ad_2",
    traderName: "CryptoKing",
    tradesCompleted: 1024,
    completionRate: 99.9,
    coin: "USDT",
    type: "SELL",
    price: 1.015,
    currency: "USD",
    available: 120000.0,
    limitMin: 500,
    limitMax: 50000,
    paymentMethods: ["PayPal", "Bank"],
    pricingType: "FLOATING",
    marketMarkup: 0.5,
    commissionPercentage: 0.8,
    walletAddress: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    isActive: true,
  },
  {
    id: "ad_3",
    traderName: "FastSeller",
    tradesCompleted: 210,
    completionRate: 95.0,
    coin: "BTC",
    type: "SELL",
    price: 65100.0,
    currency: "USD",
    available: 2.5,
    limitMin: 100,
    limitMax: 5000,
    paymentMethods: ["UPI", "PayPal"],
    pricingType: "FLOATING",
    marketMarkup: 1.2,
    commissionPercentage: 1.5,
    walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    isActive: true,
  },
  {
    id: "ad_4",
    traderName: "ProBuyer",
    tradesCompleted: 3410,
    completionRate: 100,
    coin: "ETH",
    type: "BUY",
    price: 3450.0,
    currency: "USD",
    available: 50.0,
    limitMin: 500,
    limitMax: 10000,
    paymentMethods: ["Bank", "Wise"],
    pricingType: "FIXED",
    commissionPercentage: 0.5,
    walletAddress: "0x1234567890123456789012345678901234567890",
    isActive: false,
  },
];

export interface Order {
  id: string;
  adId: string;
  traderName: string;
  amount: number; // Fiat amount
  cryptoAmount: number;
  coin: Coin;
  price: number;
  type: TradeType;
  status: OrderStatus;
  createdAt: string;
  buyerWalletAddress?: string;
  sellerWalletAddress?: string;
  paymentInstructions?: string;
}

export const mockOrders: Order[] = [
  {
    id: "ord_001",
    adId: "ad_1",
    traderName: "JohnTrader",
    amount: 1000.0,
    cryptoAmount: 990.09,
    coin: "USDT",
    price: 1.01,
    type: "BUY",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "ord_002",
    adId: "ad_2",
    traderName: "CryptoKing",
    amount: 5000.0,
    cryptoAmount: 4926.1,
    coin: "USDT",
    price: 1.015,
    type: "BUY",
    status: "Paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "ord_003",
    adId: "ad_4",
    traderName: "ProBuyer",
    amount: 2000.0,
    cryptoAmount: 0.579,
    coin: "ETH",
    price: 3450.0,
    type: "SELL",
    status: "Released",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "ord_004",
    adId: "ad_3",
    traderName: "FastSeller",
    amount: 500.0,
    cryptoAmount: 0.00768,
    coin: "BTC",
    price: 65100.0,
    type: "BUY",
    status: "Cancelled",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
