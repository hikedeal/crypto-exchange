"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  Cpu, Zap, Play, Settings, BarChart3, TrendingUp, 
  RotateCcw, History, Copy, Layers, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BotTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-4 text-sm font-medium text-emerald-400">
              <Cpu className="h-4 w-4" />
              {t("MegaMenu.bot_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Trade While You <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Sleep.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Deploy powerful automated trading strategies in seconds. No coding required. Just choose your strategy and let our bots handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium font-bold">
                  Create First Bot
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  Browse Martketplace <Settings className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Bot Stats */}
        <section className="py-12 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-white mb-1">500k+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Active Bots</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">$250M</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">24h Profited</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">&lt; 1ms</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Reaction Time</p>
            </div>
            <div className="border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">Unlimited</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Grid Levels</p>
            </div>
          </div>
        </section>

        {/* Strategy Types */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Automate any <span className="text-emerald-400">Strategy</span> with precision.
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Spot Grid Bots", desc: "Perfect for sideways markets. Automatically buy low and sell high within a defined price range to capture small price movements.", icon: Layers },
                    { title: "Futures Martingale", desc: "Average down your entry price during dips and exit with a profit when the market recovers by a small percentage.", icon: TrendingUp },
                    { title: "Smart Rebalance", desc: "Automatically rebalance your portfolio to maintain your desired asset allocation as prices fluctuate.", icon: RotateCcw },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                      <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                        <item.icon className="h-6 w-6 text-emerald-400" />
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
                <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                <GlassCard className="p-8 border-white/10 relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <p className="text-xs font-bold text-white uppercase tracking-widest">Live Performance</p>
                       <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                         <Activity className="h-3 w-3" /> ACTIVE
                       </span>
                    </div>

                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] text-muted-foreground uppercase">BTC/USDT Grid Bot</p>
                        <p className="text-lg font-bold text-emerald-400">+$2,450.00 (24.5%)</p>
                      </div>
                      <div className="h-20 w-full flex items-end gap-1 overflow-hidden">
                         {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                           <div key={i} className="flex-1 bg-emerald-500/40 rounded-t-[2px] hover:bg-emerald-400 transition-colors" style={{ height: `${h}%` }} />
                         ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                       <div className="space-y-1">
                         <p className="text-muted-foreground">Orders Filled</p>
                         <p className="text-white">1,245 / 5,000</p>
                       </div>
                       <div className="space-y-1 text-right">
                         <p className="text-muted-foreground">Runtime</p>
                         <p className="text-white">12d 4h 32m</p>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button className="flex-1 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all">Stop Bot</button>
                       <button className="flex-1 py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all">Optimize</button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
