"use client";

import { useState } from "react";
import { useP2PStore } from "@/store/useP2PStore";
import { useUserStore } from "@/store/useUserStore";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Send, X, ShieldCheck } from "lucide-react";

export default function OrdersPage() {
  const { orders, cancelOrder, payOrder, releaseOrder } = useP2PStore();
  const { addNotification } = useUserStore();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");

  const handleCancel = (id: string) => {
    cancelOrder(id);
    addNotification("Order Cancelled", `Order ${id} has been cancelled successfully.`, "info");
  };

  const handlePay = (id: string) => {
    payOrder(id);
    addNotification("Payment Confirmed", `Payment for order ${id} has been marked as completed.`, "success");
  };

  const handleRelease = (id: string) => {
    releaseOrder(id);
    addNotification("Crypto Released", `Assets for order ${id} have been released to the buyer.`, "success");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
      case "Paid":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Paid</Badge>;
      case "Released":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Released</Badge>;
      case "Cancelled":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Orders</h1>
        <p className="text-muted-foreground">Manage your P2P trades and order history.</p>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-black/40 uppercase border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID / Time</th>
                <th className="px-6 py-4 font-medium">Type / Asset</th>
                <th className="px-6 py-4 font-medium">Counterparty</th>
                <th className="px-6 py-4 font-medium">Wallet Info</th>
                <th className="px-6 py-4 font-medium">Amount / Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <div key={order.id} className="contents group">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{order.id}</p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold mb-1",
                        order.type === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                      )}>
                        {order.type}
                      </span>
                      <p className="font-bold text-white whitespace-nowrap">{order.cryptoAmount.toFixed(6)} {order.coin}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                          {order.traderName.charAt(0)}
                        </div>
                        <span className="font-medium text-white">{order.traderName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold text-[8px]">Sender</p>
                        <p className="text-[10px] font-mono text-white/70 truncate max-w-[100px]" title={order.sellerWalletAddress}>
                          {order.sellerWalletAddress || "N/A"}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1 text-[8px]">Receiver</p>
                        <p className="text-[10px] font-mono text-white/70 truncate max-w-[100px]" title={order.buyerWalletAddress}>
                          {order.buyerWalletAddress || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-muted-foreground">at {order.price} USD</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "Pending" && order.type === "BUY" && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleCancel(order.id)} className="h-8 text-[11px] text-muted-foreground hover:text-rose-400">Cancel</Button>
                            <Button size="sm" onClick={() => handlePay(order.id)} className="h-8 text-[11px] bg-primary hover:bg-primary/80 text-white">I have paid</Button>
                          </>
                        )}
                        
                        {order.status === "Pending" && order.type === "SELL" && (
                          <Button variant="outline" size="sm" disabled className="h-8 text-[11px] opacity-50 border-white/10">Waiting pay</Button>
                        )}
    
                        {order.status === "Paid" && order.type === "SELL" && (
                          <Button size="sm" onClick={() => handleRelease(order.id)} className="h-8 text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white">Release</Button>
                        )}
  
                        {order.status === "Paid" && order.type === "BUY" && (
                          <Button variant="outline" size="sm" disabled className="h-8 text-[11px] opacity-50 text-emerald-500 border-white/10">Waiting release</Button>
                        )}
  
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setActiveChat(order.id)}
                          className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 text-primary"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {order.status === "Pending" && order.type === "BUY" && order.paymentInstructions && (
                    <tr className="bg-primary/5 border-l-2 border-primary">
                      <td colSpan={7} className="px-6 py-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-1 bg-primary/20 rounded border border-primary/20">
                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] text-primary uppercase font-bold tracking-wider">Instructions from {order.traderName}</p>
                            <p className="text-xs text-white/80 leading-relaxed max-w-2xl">{order.paymentInstructions}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </div>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground italic">
                    You don't have any active or previous orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Floating Chat Integration */}
      {activeChat && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-right-8 duration-300">
          <div className="p-4 border-b border-white/5 bg-primary/10 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold">
                {orders.find(o => o.id === activeChat)?.traderName.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-none">{orders.find(o => o.id === activeChat)?.traderName}</span>
                <span className="text-[10px] text-emerald-400">Online</span>
              </div>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-1 hover:bg-white/10 rounded-md transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            <div className="text-[10px] text-center text-muted-foreground uppercase tracking-widest py-1 border-y border-white/5">
              Order Created {orders.find(o => o.id === activeChat) && formatDistanceToNow(new Date(orders.find(o => o.id === activeChat)!.createdAt), { addSuffix: true })}
            </div>
            
            <div className="bg-blue-500/5 rounded-xl p-3 border border-blue-500/10">
              <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Escrow Protected
              </p>
              <p className="text-[11px] text-white/60 leading-relaxed italic">
                Platform is holding the assets. Do not confirm receipt until you verify funds in your own wallet.
              </p>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white/5 rounded-2xl p-3 border border-white/10 rounded-tl-none shadow-sm">
                <p className="text-xs text-white/90 leading-relaxed font-medium mb-2 italic text-[11px]">Auto-Reply:</p>
                <p className="text-xs text-white leading-relaxed">
                  {orders.find(o => o.id === activeChat)?.paymentInstructions || "Hello! Please let me know once you have made the payment. My wallet is ready."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/40 border-t border-white/5 rounded-b-2xl">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Message counterparty..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setChatMessage("")}
              />
              <button 
                onClick={() => setChatMessage("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-lg text-white hover:bg-primary/80 transition-colors"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
