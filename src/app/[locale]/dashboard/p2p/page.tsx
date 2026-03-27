"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { useP2PStore } from "@/store/useP2PStore";
import { Coin, P2PAd, PaymentMethod, TradeType } from "@/lib/mockData";
import { Search, Filter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "@/i18n/routing";
import { Wallet as WalletIcon } from "lucide-react";

export default function P2PTradingPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { ads, createOrder } = useP2PStore();
  
  const [tradeType, setTradeType] = useState<TradeType>("BUY");
  const [selectedCoin, setSelectedCoin] = useState<Coin>("USDT");
  const [amount, setAmount] = useState<string>("");
  const [selectedAd, setSelectedAd] = useState<P2PAd | null>(null);
  const [buyerWalletAddress, setBuyerWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { addNotification } = useUserStore();
  
  const coins: Coin[] = ["USDT", "BTC", "ETH", "BNB"];
  
  const filteredAds = ads.filter(
    (ad) => {
      const matchesType = ad.type === (tradeType === "BUY" ? "SELL" : "BUY");
      const matchesCoin = ad.coin === selectedCoin;
      const matchesStatus = ad.isActive;
      const matchesAmount = amount ? (ad.limitMin <= parseFloat(amount) && ad.limitMax >= parseFloat(amount)) : true;
      return matchesType && matchesCoin && matchesAmount && matchesStatus;
    }
  );

  const handleTrade = () => {
    if (!selectedAd || !user) return;
    
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      const fiatAmount = parseFloat(amount) || selectedAd.limitMin;
      const cryptoAmount = fiatAmount / selectedAd.price;

      createOrder({
        adId: selectedAd.id,
        traderName: selectedAd.traderName,
        amount: fiatAmount,
        cryptoAmount: cryptoAmount,
        coin: selectedAd.coin,
        price: selectedAd.price,
        type: tradeType,
        buyerWalletAddress: tradeType === "BUY" ? buyerWalletAddress : selectedAd.walletAddress,
        sellerWalletAddress: tradeType === "SELL" ? buyerWalletAddress : selectedAd.walletAddress,
        paymentInstructions: selectedAd.paymentInstructions,
      });

      addNotification(
        "Trade Initiated", 
        `Your order to ${tradeType.toLowerCase()} ${cryptoAmount.toFixed(4)} ${selectedAd.coin} has been created.`, 
        "success"
      );
      
      setLoading(false);
      router.push("/dashboard/orders");
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Filters and Table */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">P2P Trading</h1>
          <p className="text-muted-foreground">Buy and sell crypto directly with other users via bank transfer, PayPal, and more.</p>
        </div>

        <GlassCard className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-white/10 pb-4">
            <div className="flex p-1 rounded-lg bg-black/40 border border-white/5 w-full sm:w-auto">
              <button
                onClick={() => setTradeType("BUY")}
                className={cn(
                  "flex-1 sm:flex-none px-8 py-2 rounded-md text-sm font-semibold transition-all",
                  tradeType === "BUY" 
                    ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]" 
                    : "text-muted-foreground hover:text-white"
                )}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType("SELL")}
                className={cn(
                  "flex-1 sm:flex-none px-8 py-2 rounded-md text-sm font-semibold transition-all",
                  tradeType === "SELL" 
                    ? "bg-rose-500/20 text-rose-400 shadow-[inset_0_0_10px_rgba(244,63,94,0.2)]" 
                    : "text-muted-foreground hover:text-white"
                )}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {coins.map(coin => (
                <button
                  key={coin}
                  onClick={() => setSelectedCoin(coin)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    selectedCoin === coin 
                      ? "bg-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/5"
                  )}
                >
                  {coin}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="relative col-span-1 md:col-span-2">
              <span className="text-xs text-muted-foreground mb-1 block">Amount</span>
              <div className="relative">
                <Input 
                  placeholder="Enter amount" 
                  className="bg-black/40 border-white/10 pr-16"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground font-medium">
                  USD
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <span className="text-xs text-muted-foreground mb-1 block">Payment</span>
              <button className="flex items-center justify-between w-full px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-md text-foreground hover:bg-white/5 transition-colors">
                <span>All Methods</span>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="col-span-1 flex items-end">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="rounded-xl border border-white/10 overflow-hidden bg-card/40 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-black/40 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Advertiser</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Limit/Available</th>
                  <th className="px-6 py-4 font-medium">Payment</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAds.map((ad) => (
                  <tr key={ad.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                          {ad.traderName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-primary transition-colors">{ad.traderName}</p>
                          <p className="text-xs text-muted-foreground">{ad.tradesCompleted} orders | {ad.completionRate}% completion</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-bold text-white">{ad.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-muted-foreground font-normal">{ad.currency}</span></p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Available: <span className="text-foreground font-medium">{ad.available} {ad.coin}</span></p>
                        <p className="text-xs text-muted-foreground">Limit: <span className="text-foreground font-medium">${ad.limitMin.toLocaleString()} - ${ad.limitMax.toLocaleString()}</span></p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {ad.paymentMethods.map(pm => (
                          <span key={pm} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            {pm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedAd(ad)}
                        className={cn(
                          "px-6 py-2 rounded-md text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95",
                          tradeType === "BUY" 
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/25" 
                            : "bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-rose-500/25"
                        )}
                      >
                        {tradeType} {ad.coin}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredAds.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No ads available for {selectedCoin} right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Order Panel */}
      {selectedAd && (
        <div className="w-full lg:w-80 space-y-4 animate-in slide-in-from-right-8 duration-500">
          <GlassCard className="sticky top-24 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">
                {tradeType} {selectedCoin}
              </h3>
              <button 
                onClick={() => setSelectedAd(null)}
                className="text-muted-foreground hover:text-white text-sm"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-white font-medium">{selectedAd.price} {selectedAd.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span className="text-white font-medium">{selectedAd.available} {selectedCoin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Limit</span>
                  <span className="text-white font-medium">${selectedAd.limitMin} - ${selectedAd.limitMax}</span>
                </div>
              </div>

              {/* Instructions Panel */}
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 space-y-2 animate-pulse">
                <p className="text-[10px] text-primary uppercase font-bold tracking-wider">Trading Instructions</p>
                <p className="text-xs text-white leading-relaxed">
                  {selectedAd.paymentInstructions || "Please follow the counterparty instructions carefully."}
                </p>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">I want to pay</label>
                <div className="relative">
                  <Input 
                    placeholder={`${selectedAd.limitMin} - ${selectedAd.limitMax}`} 
                    className="bg-black/40 border-white/10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary font-medium cursor-pointer">
                    All
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {tradeType === "BUY" ? "Your Receiving Wallet" : "Your Deposit Wallet"}
                </label>
                <div className="relative">
                  <Input 
                    required
                    placeholder="Enter wallet address" 
                    className="bg-black/40 border-white/10 font-mono text-[10px]"
                    value={buyerWalletAddress}
                    onChange={(e) => setBuyerWalletAddress(e.target.value)}
                  />
                  <WalletIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Ensure this is a valid {selectedCoin} address.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Order Amount</span>
                  <span className="text-white font-medium">{amount ? parseFloat(amount).toLocaleString() : "0.00"} USD</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Commission ({selectedAd.commissionPercentage || 0}%)</span>
                  <span className="text-emerald-400 font-medium">
                    +{( (parseFloat(amount) || 0) * (selectedAd.commissionPercentage || 0) / 100).toFixed(2)} USD
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/5 pt-1 mt-1">
                  <span className="text-white">Total to Pay</span>
                  <span className="text-primary font-mono tracking-tight">
                    {( (parseFloat(amount) || 0) * (1 + (selectedAd.commissionPercentage || 0) / 100)).toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-white/10">
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAd.paymentMethods.map(pm => (
                    <Badge key={pm} variant="outline" className="border-primary/30 text-primary/80 bg-primary/5">
                      {pm}
                    </Badge>
                  ))}
                </div>
                
                <GradientButton 
                  onClick={handleTrade} 
                  disabled={loading}
                  className="w-full mt-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>
                      {tradeType} {selectedCoin} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// Add Button component locally since we imported it from UI but might not have created its specific shadcn variant yet if not properly configured. Actually we ran `npx shadcn init` and it created Button.
import { Button } from "@/components/ui/button";
