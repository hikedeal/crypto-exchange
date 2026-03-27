"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  ShieldCheck,
  History,
  Download,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { useP2PStore } from "@/store/useP2PStore";

const platformWallets = [
  { asset: "BTC", total: "145.28", usd: "$9,443,200", status: "Healthy", cold: "80%", hot: "20%" },
  { asset: "ETH", total: "2,840.15", usd: "$6,532,345", status: "Healthy", cold: "75%", hot: "25%" },
  { asset: "USDT", total: "4,200,500.00", usd: "$4,200,500", status: "Liquidity Low", cold: "90%", hot: "10%" },
];

export default function WalletManagement() {
  const [mounted, setMounted] = useState(false);
  const orders = useP2PStore((state) => state.orders);

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
  
  const recentTransactions = orders.slice(0, 3).map(o => ({
    id: o.id,
    type: o.type === "BUY" ? "Deposit" : "Withdrawal", // Mapping trade types to platform tx for demo
    user: o.traderName,
    amount: `${o.cryptoAmount.toFixed(4)} ${o.coin}`,
    status: o.status === "Pending" ? "Pending Review" : "Confirmed",
    time: new Date(o.createdAt).toLocaleTimeString()
  }));
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Platform Wallets</h1>
          <p className="text-muted-foreground mt-1">Global liquidity monitoring and fund security.</p>
        </div>
        <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformWallets.map((wallet) => (
          <GlassCard key={wallet.asset} className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold">
                {wallet.asset.charAt(0)}
              </div>
              <div className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                wallet.status === "Healthy" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"
              )}>
                {wallet.status}
              </div>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{wallet.asset} Holdings</p>
            <h3 className="text-2xl font-black text-white">{wallet.total} <span className="text-sm font-medium text-muted-foreground">{wallet.asset}</span></h3>
            <p className="text-sm text-muted-foreground mt-1">{wallet.usd}</p>
            
            <div className="mt-8 space-y-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Cold Storage</span>
                <span className="text-white font-bold">{wallet.cold}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: wallet.cold }} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction History */}
        <GlassCard className="border-white/5 bg-white/[0.01]">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-4 w-4 text-primary" />
              <h3 className="font-bold text-white uppercase tracking-widest text-xs opacity-50">Global Transations</h3>
            </div>
            <button className="p-2 text-muted-foreground hover:text-white transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    tx.type === "Withdrawal" ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                  )}>
                    {tx.type === "Withdrawal" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.user}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{tx.id} • {tx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{tx.amount}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-tighter",
                    tx.status === "Pending Review" ? "text-yellow-400" : "text-emerald-400"
                  )}>
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Security Summary */}
        <div className="space-y-6">
          <GlassCard className="p-8 bg-blue-500/[0.03] border-blue-500/10 relative overflow-hidden">
            <ShieldCheck className="absolute -right-4 -top-4 h-24 w-24 text-blue-500/[0.03]" />
            <h3 className="text-lg font-bold text-white mb-4">Security Protocol</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Multisig Enabled</h4>
                  <p className="text-xs text-muted-foreground mt-1">All withdrawals &gt; $10k require 3/5 administrator signatures.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Cold Storage Sync</h4>
                  <p className="text-xs text-muted-foreground mt-1">Last synced with hardware security module 14 minutes ago.</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 bg-yellow-500/[0.03] border-yellow-500/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Alert Center</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-sm text-yellow-500/80 leading-relaxed font-medium">
              USDT Hot Wallet liquidity below 15% threshold. Consider moving funds from cold storage to ensure P2P fulfillment speed.
            </p>
            <button className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest">
              Initiate Liquidity Move
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
