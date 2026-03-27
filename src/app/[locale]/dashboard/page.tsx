"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ArrowLeftRight, CreditCard, Download, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useP2PStore } from "@/store/useP2PStore";
import { cn } from "@/lib/utils";
import { DepositDialog, WithdrawDialog } from "@/components/dashboard/transaction-dialogs";

export default function DashboardPage() {
  const { user } = useUserStore();
  const { orders } = useP2PStore();
  const { formatCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalBalanceUsd = user ? (
    user.balances.USDT + 
    user.balances.BTC * 65000 + 
    user.balances.ETH * 3500 + 
    user.balances.BNB * 600
  ) : 0;

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DepositDialog open={isDepositOpen} onOpenChange={setIsDepositOpen} />
      <WithdrawDialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your trading activity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="relative overflow-hidden group">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Estimated Balance
            </span>
            <span className="text-3xl font-bold text-white tracking-tight">
              {mounted ? formatCurrency(totalBalanceUsd) : `$${totalBalanceUsd.toLocaleString()}`}
            </span>
            <span className="text-xs text-emerald-400 font-medium">+2.5% from last week</span>
          </div>
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
        </GlassCard>

        {Object.entries({
          BTC: user?.balances.BTC || 0,
          ETH: user?.balances.ETH || 0,
          BNB: user?.balances.BNB || 0,
        }).map(([coin, balance]) => (
          <GlassCard key={coin} className="flex flex-col justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {coin} Balance
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-white">{balance}</span>
              <span className="text-xs text-muted-foreground">{coin}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
              <Link
                href="/dashboard/orders"
                className="text-sm text-primary hover:underline font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-bold relative",
                      order.type === "BUY" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {order.coin.substring(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{order.type} {order.coin}</p>
                      <p className="text-xs text-muted-foreground">with {order.traderName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">
                      {mounted ? formatCurrency(order.amount) : `$${order.amount}`}
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border",
                        order.status === "Released" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        order.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No recent orders found.</p>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid gap-4">
              <Link href="/dashboard/p2p" className="w-full">
                <GradientButton className="w-full py-6 flex items-center justify-center gap-2">
                  <ArrowLeftRight className="h-5 w-5" />
                  <span className="text-base">P2P Trading</span>
                </GradientButton>
              </Link>
              
              <button 
                onClick={() => setIsDepositOpen(true)}
                className="w-full relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md blur-xl group-hover:blur-md transition-all"></div>
                <div className="relative w-full py-4 rounded-md border border-white/10 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center gap-2 font-medium text-white">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  Deposit Crypto
                </div>
              </button>

              <button 
                onClick={() => setIsWithdrawOpen(true)}
                className="w-full py-4 rounded-md border border-white/10 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center gap-2 font-medium text-white"
              >
                <Download className="h-5 w-5 text-purple-400" />
                Withdraw
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

