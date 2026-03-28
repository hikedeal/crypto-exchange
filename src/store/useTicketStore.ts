import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TicketStatus = "Open" | "Closed";

export interface Ticket {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  description: string;
  date: string;
  status: TicketStatus;
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-382914",
    name: "Alex Smith",
    email: "alex@example.com",
    category: "Account & Security",
    subject: "Cannot reset 2FA",
    description: "I lost my phone and need to reset my 2FA immediately.",
    date: "10 mins ago",
    status: "Open"
  },
  {
    id: "TKT-489201",
    name: "John Doe",
    email: "john@example.com",
    category: "Deposits & Withdrawals",
    subject: "ETH Withdrawal stuck",
    description: "My ETH withdrawal has been pending for hours. TXID attached.",
    date: "2 hours ago",
    status: "Open"
  },
  {
    id: "TKT-590212",
    name: "Maria Garcia",
    email: "maria@example.com",
    category: "P2P Marketplace Dispute",
    subject: "Buyer didn't release funds",
    description: "I sent the fiat payment but the seller isn't releasing the USDT.",
    date: "5 hours ago",
    status: "Closed"
  },
  {
    id: "TKT-601934",
    name: "David Kim",
    email: "david@example.com",
    category: "Spot/Margin Trading",
    subject: "Order filled at wrong price",
    description: "My limit order triggered incorrectly during the flash crash.",
    date: "1 day ago",
    status: "Closed"
  }
];

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "date" | "status">) => void;
  toggleStatus: (id: string) => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      tickets: initialTickets,
      addTicket: (ticketData) =>
        set((state) => {
          const newTicket: Ticket = {
            ...ticketData,
            date: "Just now",
            status: "Open",
          };
          return { tickets: [newTicket, ...state.tickets] };
        }),
      toggleStatus: (id) =>
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === id ? { ...t, status: t.status === "Open" ? "Closed" : "Open" } : t
          ),
        })),
    }),
    {
      name: "crypto-exchange-tickets-storage",
    }
  )
);
