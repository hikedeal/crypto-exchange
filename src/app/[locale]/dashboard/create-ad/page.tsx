"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useP2PStore } from "@/store/useP2PStore";
import { useUserStore } from "@/store/useUserStore";
import { Coin, PaymentMethod, TradeType } from "@/lib/mockData";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Check, Wallet as WalletIcon, Settings } from "lucide-react";
import { PricingType } from "@/lib/mockData";

export default function CreateAdPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { createAd } = useP2PStore();

  const [tradeType, setTradeType] = useState<TradeType>("SELL");
  const [selectedCoin, setSelectedCoin] = useState<Coin>("USDT");
  const [price, setPrice] = useState("1.00");
  const [limitMin, setLimitMin] = useState("100");
  const [limitMax, setLimitMax] = useState("10000");
  const [totalAmount, setTotalAmount] = useState("5000");
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>(["Bank"]);
  const [pricingType, setPricingType] = useState<PricingType>("FIXED");
  const [marketMarkup, setMarketMarkup] = useState("0.00");
  const [commissionPercentage, setCommissionPercentage] = useState("0.00");
  const [walletAddress, setWalletAddress] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [terms, setTerms] = useState("");

  const coins: Coin[] = ["USDT", "BTC", "ETH", "BNB"];
  const paymentMethods: PaymentMethod[] = ["Bank", "PayPal", "UPI", "Wise"];

  const toggleMethod = (method: PaymentMethod) => {
    if (selectedMethods.includes(method)) {
      if (selectedMethods.length > 1) {
        setSelectedMethods(selectedMethods.filter(m => m !== method));
      }
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    createAd({
      traderName: user.name.replace(" ", ""),
      tradesCompleted: 0,
      completionRate: 100,
      coin: selectedCoin,
      type: tradeType,
      price: parseFloat(price),
      currency: "USD",
      available: parseFloat(totalAmount),
      limitMin: parseFloat(limitMin),
      limitMax: parseFloat(limitMax),
      paymentMethods: selectedMethods,
      pricingType: pricingType,
      marketMarkup: pricingType === "FLOATING" ? parseFloat(marketMarkup) : undefined,
      commissionPercentage: parseFloat(commissionPercentage),
      walletAddress: walletAddress,
      isActive: true,
      paymentInstructions: paymentInstructions,
    });

    router.push("/dashboard/p2p");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create P2P Advertisement</h1>
        <p className="text-muted-foreground">Post a trade advertisement to buy or sell crypto on your own terms.</p>
      </div>

      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleCreateAd} className="space-y-8">
          
          {/* Ad Type & Asset */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">1. Type & Asset</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground mb-2 block">I want to...</Label>
                <div className="flex p-1 rounded-lg bg-black/40 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setTradeType("BUY")}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all",
                      tradeType === "BUY" 
                        ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]" 
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setTradeType("SELL")}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all",
                      tradeType === "SELL" 
                        ? "bg-rose-500/20 text-rose-400 shadow-[inset_0_0_10px_rgba(244,63,94,0.2)]" 
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    Sell
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-2 block">Asset</Label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {coins.map(coin => (
                    <button
                      key={coin}
                      type="button"
                      onClick={() => setSelectedCoin(coin)}
                      className={cn(
                        "flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border",
                        selectedCoin === coin 
                          ? "bg-primary text-white border-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                          : "bg-black/40 text-muted-foreground hover:text-white border-white/5"
                      )}
                    >
                      {coin}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price & Limits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">2. Price & Limits</h3>
            
            <div className="space-y-4">
              <Label className="text-muted-foreground">Pricing Strategy</Label>
              <div className="flex p-1 rounded-lg bg-black/40 border border-white/5 max-w-xs">
                <button
                  type="button"
                  onClick={() => setPricingType("FIXED")}
                  className={cn(
                    "flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all",
                    pricingType === "FIXED" 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  Fixed
                </button>
                <button
                  type="button"
                  onClick={() => setPricingType("FLOATING")}
                  className={cn(
                    "flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all",
                    pricingType === "FLOATING" 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  Floating
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingType === "FIXED" ? (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <Label className="text-muted-foreground">Fixed Price (USD)</Label>
                  <div className="relative">
                    <Input 
                      required
                      type="number" step="0.01"
                      className="bg-black/40 border-white/10 pr-12 text-lg font-medium"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">USD</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <Label className="text-muted-foreground">Market Markup (%)</Label>
                  <div className="relative">
                    <Input 
                      required
                      type="number" step="0.01"
                      className="bg-black/40 border-white/10 pr-12 text-lg font-medium"
                      placeholder="e.g. 1.50"
                      value={marketMarkup}
                      onChange={(e) => setMarketMarkup(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Price will be: (Global Market Price + {marketMarkup}%)</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-muted-foreground">Commission Fee (%)</Label>
                <div className="relative">
                  <Input 
                    required
                    type="number" step="0.01"
                    className="bg-black/40 border-white/10 pr-12"
                    placeholder="e.g. 0.50"
                    value={commissionPercentage}
                    onChange={(e) => setCommissionPercentage(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Total Trading Amount ({selectedCoin})</Label>
                <Input 
                  required
                  type="number" step="0.0001"
                  className="bg-black/40 border-white/10"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground whitespace-nowrap">Min Limit (USD)</Label>
                  <Input 
                    required
                    type="number"
                    className="bg-black/40 border-white/10"
                    value={limitMin}
                    onChange={(e) => setLimitMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground whitespace-nowrap">Max Limit (USD)</Label>
                  <Input 
                    required
                    type="number"
                    className="bg-black/40 border-white/10"
                    value={limitMax}
                    onChange={(e) => setLimitMax(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Terms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">3. Payment & Terms</h3>
            
            <div className="space-y-3">
              <Label className="text-muted-foreground">Wallet Address (Depositing Asset)</Label>
              <Input 
                required
                className="bg-black/40 border-white/10 font-mono text-xs"
                placeholder="Enter your crypto wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">Ensure this address matches the asset type ({selectedCoin})</p>
            </div>

            <div className="space-y-3">
              <Label className="text-muted-foreground">Payment Methods (Select up to 3)</Label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(method => {
                  const isSelected = selectedMethods.includes(method);
                  return (
                    <div 
                      key={method}
                      onClick={() => toggleMethod(method)}
                      className={cn(
                        "cursor-pointer flex items-center justify-between p-3 rounded-lg border transition-all",
                        isSelected 
                          ? "bg-primary/10 border-primary text-white" 
                          : "bg-black/40 border-white/5 text-muted-foreground hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className="font-medium text-sm">{method}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Payment Instructions (Auto-Reply)</Label>
              <textarea 
                className="w-full flex min-h-[100px] rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                placeholder="Write specific instructions that the buyer will see after starting the trade (e.g., Pay to 9876543210@upi)"
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Terms (Optional)</Label>
              <textarea 
                className="w-full flex min-h-[100px] rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Leave a message for the counterparty (e.g., No third party payments allowed)"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 mt-8 border-t border-white/10">
            <GradientButton type="submit" className="w-full py-6 text-lg">
              Post Advertisement
            </GradientButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
