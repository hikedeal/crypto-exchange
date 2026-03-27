"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  MessageSquare,
  Scale,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { useP2PStore } from "@/store/useP2PStore";

export default function OrderManagement() {
  const [mounted, setMounted] = useState(false);
  const { 
    orders, 
    resolveOrderDispute: resolveP2PDispute,
    cancelOrder: cancelP2POrder 
  } = useP2PStore();
  
  const orderFilter = useAdminStore((state) => state.orderFilter);
  const setOrderFilter = useAdminStore((state) => state.setOrderFilter);
  const orderSearch = useAdminStore((state) => state.orderSearch);
  const setOrderSearch = useAdminStore((state) => state.setOrderSearch);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeDisputesCount = orders.filter(o => o.status === "Pending").length; // Using Pending as placeholder for dispute-like state if not explicit

  const filteredOrders = orders.filter(o => {
    // Basic mapping for demo/admin consistency
    const matchesFilter = orderFilter === "All Orders" || o.status === orderFilter;
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.traderName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.coin.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">P2P Order Management</h1>
          <p className="text-muted-foreground mt-1">Oversee all marketplace transactions and disputes.</p>
        </div>
        <div className="flex items-center gap-3">
          {activeDisputesCount > 0 && (
            <GlassCard className="flex items-center gap-3 px-4 py-2 bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-tighter">
                {activeDisputesCount} Active Disputes
              </span>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-4">
        {["All Orders", "Pending", "Paid", "Released", "Cancelled"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setOrderFilter(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all border",
              orderFilter === tab 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <GlassCard className="border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-white/[0.01]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Buyer, or Seller..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/40 transition-colors"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors">
            <Filter className="h-3 w-3" />
            Advanced Search
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Counterparties</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount/Asset</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Intervene</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        order.type === "BUY" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      )}>
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{order.id}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{order.type} Order</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-white font-medium">
                      <span>{order.traderName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {order.status === "Pending" ? <Clock className="h-3 w-3 text-amber-400" /> :
                       order.status === "Released" ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> :
                       order.status === "Paid" ? <CreditCard className="h-3 w-3 text-blue-400" /> :
                       <AlertCircle className="h-3 w-3 text-rose-400" />}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-tighter",
                        order.status === "Pending" ? "text-amber-400" :
                        order.status === "Released" ? "text-emerald-400" :
                        order.status === "Paid" ? "text-blue-400" :
                        "text-rose-400"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm">
                      <span className="text-white font-bold">{order.cryptoAmount.toFixed(4)}</span>{" "}
                      <span className="text-muted-foreground text-xs">{order.coin}</span>
                      <p className="text-[10px] text-muted-foreground">${order.amount.toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white transition-colors" title="Chat Logs">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      {order.status === "Pending" ? (
                        <button 
                          onClick={() => resolveP2PDispute(order.id)}
                          className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                        >
                          Release
                        </button>
                      ) : (
                        <button 
                          onClick={() => cancelP2POrder(order.id)}
                          className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-rose-400 transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Dispute Management Card */}
      <GlassCard className="p-8 border-red-500/10 bg-gradient-to-r from-red-500/5 to-transparent relative overflow-hidden">
        <Scale className="absolute -right-4 -bottom-4 h-32 w-32 text-red-500/[0.03] -rotate-12" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-white mb-2 italic">Arbitration Center</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              As an administrator, you have the final authority to release escrowed funds or refund buyers in case of confirmed disputes. 
              Always review chat logs and payment proof before taking action.
            </p>
          </div>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center gap-3">
            <Scale className="h-4 w-4 text-red-400" />
            Open Dispute Workspace
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
