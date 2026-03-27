"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientButton } from "@/components/ui/gradient-button";

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferDialog({ open, onOpenChange }: TransferDialogProps) {
  const { user, updateBalance, addNotification } = useUserStore();
  const [asset, setAsset] = useState<string>("USDT");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || !recipient) return;
    const currentBalance = user?.balances[asset as keyof typeof user.balances] || 0;
    if (val > currentBalance) {
      addNotification("Insufficient Balance", "You do not have enough funds.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      updateBalance(asset as any, -val);
      addNotification("Transfer Successful", `Sent ${val} ${asset} to ${recipient}.`, "success");
      setLoading(false);
      onOpenChange(false);
      setAmount("");
      setRecipient("");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111827] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Transfer Crypto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Select onValueChange={(val) => val && setAsset(val)} defaultValue={asset}>
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
            <Label>Recipient (Email or User ID)</Label>
            <Input 
              placeholder="Enter recipient info" 
              className="bg-black/40 border-white/10" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
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
          <GradientButton onClick={handleTransfer} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Confirm Internal Transfer"}
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
