"use client";

import { useP2PStore } from "@/store/useP2PStore";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { History as HistoryIcon, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  const { orders } = useP2PStore();
  
  // Filter for completed or cancelled orders for the history page
  const historyOrders = orders.filter(o => o.status === "Released" || o.status === "Cancelled");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Trade History</h1>
          <p className="text-muted-foreground">Review your past trades and completed transactions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors text-sm">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <GlassCard className="p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by Order ID or Trader" className="bg-black/40 border-white/10 pl-10 h-10" />
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/20">All Assets</button>
            <button className="px-4 py-2 rounded-md bg-white/5 text-muted-foreground text-sm font-medium hover:text-white border border-white/5 transition-colors">Last 30 Days</button>
        </div>
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-black/40 uppercase border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Type / Asset</th>
                <th className="px-6 py-4 font-medium">Traders</th>
                <th className="px-6 py-4 font-medium">Total Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Completion Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {historyOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold",
                        order.type === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                        )}>
                        {order.type}
                        </span>
                        <p className="font-bold text-white">{order.cryptoAmount} {order.coin}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{order.traderName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">${order.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Price: {order.price} USD</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={cn(
                        order.status === "Released" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    )}>
                        {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </p>
                  </td>
                </tr>
              ))}
              {historyOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <HistoryIcon className="h-10 w-10 opacity-20" />
                        <p>No trade history found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
