"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientButton } from "@/components/ui/gradient-button";
import { Copy, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAsset?: string;
}

export function DepositDialog({ open, onOpenChange, initialAsset = "USDT" }: TransactionDialogProps) {
  const { updateBalance, addNotification } = useUserStore();
  const [asset, setAsset] = useState(initialAsset);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state when initialAsset changes or when dialog opens
  useEffect(() => {
    if (open) {
      setAsset(initialAsset);
    }
  }, [initialAsset, open]);

  const handleDeposit = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    setLoading(true);
    setTimeout(() => {
      updateBalance(asset as any, val);
      addNotification("Deposit Successful", `Your deposit of ${val} ${asset} has been credited.`, "success");
      setLoading(false);
      onOpenChange(false);
      setAmount("");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111827] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Deposit Crypto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Asset to Deposit</Label>
            <Select onValueChange={(val) => val && setAsset(val)} value={asset}>
              <SelectTrigger className="bg-black/40 border-white/10">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="BNB">BNB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-center space-y-3">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Your {asset} Deposit Address</p>
            <div className="bg-black/40 p-3 rounded border border-white/5 font-mono text-xs flex items-center justify-between text-emerald-400">
              <span>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
              <Copy className="h-4 w-4 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Simulate Amount</Label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="bg-black/40 border-white/10" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <GradientButton onClick={handleDeposit} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Complete Deposit"}
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function WithdrawDialog({ open, onOpenChange, initialAsset = "USDT" }: TransactionDialogProps) {
  const { user, updateBalance, addNotification } = useUserStore();
  const [asset, setAsset] = useState(initialAsset);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state when initialAsset changes or when dialog opens
  useEffect(() => {
    if (open) {
      setAsset(initialAsset);
    }
  }, [initialAsset, open]);

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    const currentBalance = user?.balances[asset as keyof typeof user.balances] || 0;
    if (val > currentBalance) {
      addNotification("Insufficient Balance", "You do not have enough funds.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      updateBalance(asset as any, -val);
      addNotification("Withdrawal Sent", `Your withdrawal of ${val} ${asset} is being processed.`, "info");
      setLoading(false);
      onOpenChange(false);
      setAmount("");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111827] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Withdraw Crypto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Asset to Withdraw</Label>
            <Select onValueChange={(val) => val && setAsset(val)} value={asset}>
              <SelectTrigger className="bg-black/40 border-white/10">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="BNB">BNB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <Input placeholder="Enter destination address" className="bg-black/40 border-white/10 font-mono text-xs" />
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="bg-black/40 border-white/10" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground mt-1">Available: {user?.balances[asset as keyof typeof user.balances]} {asset}</p>
          </div>
        </div>
        <DialogFooter>
          <button 
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full py-2 rounded-md bg-white text-black font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm Withdrawal"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
