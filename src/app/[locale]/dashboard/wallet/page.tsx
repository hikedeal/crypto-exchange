"use client";

import { useUserStore } from "@/store/useUserStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { DepositDialog, WithdrawDialog } from "@/components/dashboard/transaction-dialogs";
import { TransferDialog } from "@/components/dashboard/transfer-dialog";

export default function WalletPage() {
  const { user, updateBalance, addNotification } = useUserStore();
  const { formatCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string>("USDT");
  
  const transactions = [
    { id: "tx_1", type: "Deposit", coin: "USDT", amount: 500, status: "Completed", date: "2024-03-10 14:30" },
    { id: "tx_2", type: "Withdraw", coin: "BTC", amount: 0.05, status: "Pending", date: "2024-03-09 09:15" },
    { id: "tx_3", type: "Transfer", coin: "ETH", amount: 1.2, status: "Completed", date: "2024-03-08 18:45" },
    { id: "tx_4", type: "Deposit", coin: "BNB", amount: 10, status: "Completed", date: "2024-03-05 11:20" },
  ];

  const totalBalanceUsd = (
    (user?.balances.USDT || 0) + 
    (user?.balances.BTC || 0) * 65000 + 
    (user?.balances.ETH || 0) * 3500 + 
    (user?.balances.BNB || 0) * 600
  );

  const openDeposit = (asset: string = "USDT") => {
    setSelectedAsset(asset);
    setIsDepositOpen(true);
  };

  const openWithdraw = (asset: string = "USDT") => {
    setSelectedAsset(asset);
    setIsWithdrawOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DepositDialog open={isDepositOpen} onOpenChange={setIsDepositOpen} initialAsset={selectedAsset} />
      <WithdrawDialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} initialAsset={selectedAsset} />
      <TransferDialog open={isTransferOpen} onOpenChange={setIsTransferOpen} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Wallet Overview</h1>
          <p className="text-muted-foreground">Manage your crypto assets, deposits, and withdrawals.</p>
        </div>
        <div className="flex gap-3">
          <div 
            onClick={() => openDeposit()}
            className="py-2 px-6 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            <ArrowDownLeft className="h-4 w-4" /> Deposit
          </div>

          <div 
            onClick={() => openWithdraw()}
            className="py-2 px-6 rounded-md bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpRight className="h-4 w-4" /> Withdraw
          </div>

          <button 
            onClick={() => setIsTransferOpen(true)}
            className="py-2 px-6 rounded-md bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <ArrowRightLeft className="h-4 w-4" /> Transfer
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-3 p-8 border-primary/20 bg-primary/5">
          <p className="text-sm font-medium text-primary mb-2">Estimated Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-bold text-white tracking-tight">
              {mounted ? formatCurrency(totalBalanceUsd) : `$${totalBalanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </h2>
          </div>
        </GlassCard>

        {Object.entries(user?.balances || {}).map(([coin, balance]) => (
          <GlassCard key={coin} className="flex flex-col gap-4 group hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  {coin.substring(0, 1)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{coin}</h3>
                  <p className="text-xs text-muted-foreground">{coin} Network</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{balance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                ≈ {mounted ? formatCurrency(balance * (coin === 'BTC' ? 65000 : coin === 'ETH' ? 3500 : coin === 'BNB' ? 600 : 1)) : `$${(balance * (coin === 'BTC' ? 65000 : coin === 'ETH' ? 3500 : coin === 'BNB' ? 600 : 1)).toLocaleString()}`}
              </p>
            </div>
            <div className="flex gap-2 mt-2 pt-4 border-t border-white/5">
              <button 
                onClick={() => openDeposit(coin)}
                className="flex-1 py-2 text-xs font-semibold rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Deposit
              </button>
              <button 
                onClick={() => openWithdraw(coin)}
                className="flex-1 py-2 text-xs font-semibold rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Withdraw
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-black/40 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Asset</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-white">
                      {tx.type === "Deposit" ? <ArrowDownLeft className="h-4 w-4 text-emerald-500" /> : 
                       tx.type === "Withdraw" ? <ArrowUpRight className="h-4 w-4 text-rose-500" /> : 
                       <ArrowRightLeft className="h-4 w-4 text-blue-500" />}
                      {tx.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{tx.coin}</td>
                  <td className="px-6 py-4 font-bold text-white">{tx.type === "Withdraw" ? "-" : "+"}{tx.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                      tx.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
