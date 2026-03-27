"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  Zap, Globe, Lock, BarChart3, TrendingUp, 
  ArrowRight, Search, Activity, Layers, Repeat
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArbitrageTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4 text-sm font-medium text-cyan-400">
              <Repeat className="h-4 w-4" />
              {t("MegaMenu.arbitrage_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Capture Every <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Spread.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Automated cross-exchange arbitrage scanning. Discover price discrepancies across 50+ exchanges and execute instantly with zero risk using flash-loan technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  Scan Markets
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  View Arbitrage Bot <Activity className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Arbitrage Stats */}
        <section className="py-12 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-white mb-1">50+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Exchanges Linked</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">0.5% - 4%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Avg Spread</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">Flash Loan</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Native Support</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">Real-Time</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Scanning</p>
            </div>
          </div>
        </section>

        {/* Arbitrage Scanner Visual */}
        <section className="py-24 px-4 bg-black/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
                  <GlassCard className="p-0 border-white/10 overflow-hidden relative">
                     <div className="bg-black/60 p-4 border-b border-white/5 flex justify-between items-center font-mono">
                        <span className="text-xs text-cyan-400">scanner_engine V2.1.0</span>
                        <div className="flex gap-2">
                           <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                           <div className="h-2 w-2 rounded-full bg-yellow-500" />
                           <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                     </div>
                     <div className="p-6 space-y-4">
                        {[
                          { asset: "BTC", buy: "Binance", sell: "ByBit", spread: "1.24%", px1: "68,420", px2: "69,270" },
                          { asset: "ETH", buy: "Coinbase", sell: "OKX", spread: "0.85%", px1: "3,850", px2: "3,883" },
                          { asset: "SOL", buy: "Kraken", sell: "KuCoin", spread: "2.10%", px1: "145.15", px2: "148.20" },
                        ].map((row, i) => (
                           <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/[0.08] transition-colors group">
                              <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-xs">{row.asset}</div>
                                 <div>
                                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">{row.buy} &rarr; {row.sell}</p>
                                    <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Capture Spread</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-lg font-bold text-emerald-400">{row.spread}</p>
                                 <p className="text-[10px] text-muted-foreground font-mono">Profit: ~$124.50</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="p-4 bg-cyan-500/10 border-t border-white/5 text-center text-xs text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
                        Scanning WebSockets...
                     </div>
                  </GlassCard>
               </div>

               <div className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Risk-Free <span className="text-cyan-400">Profit Opportunities</span> in every cycle.
                  </h2>
                  <div className="space-y-6">
                    {[
                      { title: "Cross-Exchange Arbitrage", desc: "Our engine scans for price differences for the same asset across 50+ major CEX and DEX platforms simultaneously.", icon: Globe },
                      { title: "Triangular Arbitrage", desc: "Identify and exploit price gaps between three different assets on the same exchange, resulting in risk-free net gains.", icon: Layers },
                      { title: "Flash Loan Execution", desc: "Apply for instant, collateral-free loans to fund large arbitrage trades, paying them back in the same block for 100% security.", icon: Zap },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                          <item.icon className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-muted-foreground italic leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        </section>

        {/* Security & Speed */}
        <section className="py-24 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16">The Arbitrage Edge</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <GlassCard className="p-8 space-y-4">
                  <Search className="h-10 w-10 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">Dynamic Scanning</h3>
                  <p className="text-sm text-muted-foreground">Monitor millions of orderbook combinations per second with our distributed scanning nodes.</p>
               </GlassCard>
               <GlassCard className="p-8 space-y-4">
                  <Zap className="h-10 w-10 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Flash-Fast Execution</h3>
                  <p className="text-sm text-muted-foreground">Automated multi-hop execution ensures your trades are finalized before the market spread closes.</p>
               </GlassCard>
               <GlassCard className="p-8 space-y-4">
                  <Lock className="h-10 w-10 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Zero Capital Risk</h3>
                  <p className="text-sm text-muted-foreground">Utilize institutional liquidity to capture spreads without ever needing to risk your own personal holdings.</p>
               </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
