"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  Scale, ShieldCheck, Zap, Globe, Lock, Coins, 
  ArrowUpRight, BarChart3, AlertTriangle, Wallet, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarginTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-md mb-4 text-sm font-medium text-orange-400">
              <Scale className="h-4 w-4" />
              {t("MegaMenu.margin_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Bigger Capital. <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Higher Potential.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
               Borrow funds to increase your trading position. Trade with up to 10x leverage on Cross Margin and 125x on Isolated Margin projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  Borrow & Trade
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  Margin Calculator <Scale className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Stats */}
        <section className="py-12 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">10x</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Cross Leverage</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">0%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Interest Promos</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">600+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Collateral Types</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">Instant</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Borrowing</p>
            </div>
          </div>
        </section>

        {/* Why Margin Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Why choose <span className="text-orange-400">Margin Trading</span> with us?
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Smart Collateral Ratio", desc: "Our dynamic collateral management system adjusts to market volatility, providing you with more headroom and reducing liquidation risks.", icon: AlertTriangle },
                    { title: "Lowest Interest Rates", desc: "Borrow USDT, BTC, and other top assets at some of the lowest interest rates in the industry, with daily compounding options.", icon: Wallet },
                    { title: "Unified Account", desc: "Use your entire portfolio as collateral for cross-margin trading, maximizing your buying power across all supported pairs.", icon: Coins },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                        <item.icon className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-muted-foreground italic leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
                <GlassCard className="p-8 border-white/10 relative overflow-hidden group hover:border-orange-500/50 transition-all duration-500">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Margin Risk Monitor</p>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">HEALTHY</span>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Margin Level</span>
                         <span className="text-emerald-400 font-bold">2.45</span>
                       </div>
                       <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 w-[80%]" />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-muted-foreground mb-1">Total Debt</p>
                        <p className="text-white font-bold">$12,450.00</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-muted-foreground mb-1">Maintenance</p>
                        <p className="text-white font-bold">$1,245.00</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <p className="text-[10px] text-muted-foreground uppercase border-b border-white/5 pb-1">Quick Borrow</p>
                       <div className="flex gap-2">
                         {["1k", "5k", "10k", "Custom"].map(v => (
                           <button key={v} className="flex-1 py-2 rounded bg-white/5 border border-white/5 text-xs text-white hover:bg-white/10 transition-colors">{v}</button>
                         ))}
                       </div>
                    </div>

                    <GradientButton className="w-full font-bold">Manage Margin</GradientButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trading Built for Growth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Leverage our professional margin infrastructure to execute complex strategies with ease.</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard className="p-8 space-y-4">
              <Zap className="h-10 w-10 text-orange-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Auto-Borrow Mode</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Simply place your order, and our system automatically borrows the required funds at the best available rate. No manual steps needed.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Negative Balance Protection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Trade with peace of mind. Our system ensures you can never lose more than your initial collateral. We absorb any catastrophic slippage.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <Activity className="h-10 w-10 text-blue-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Dynamic Interest</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Rates update hourly based on pool utilization, ensuring you always get the fairest market-reflective borrowing costs.</p>
            </GlassCard>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
