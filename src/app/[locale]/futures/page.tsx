"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  TrendingUp, ShieldAlert, Zap, Globe, Lock, Cpu, 
  ArrowUpRight, BarChart3, Rocket, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FuturesTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-4 text-sm font-medium text-purple-400">
              <Rocket className="h-4 w-4" />
              {t("MegaMenu.futures_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Trade Futures with up to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">125x Leverage</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Amplify your trading strategy with USDT-M and Coin-M Perpetual Contracts. Advanced risk management tools and high-speed execution for professional traders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  Go Long / Short
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  Simulation Trading <Activity className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Futures Stats */}
        <section className="py-12 px-4 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">125x</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Max Leverage</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">0.02%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Maker Fee</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Funding Cycles</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">$15B+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Open Interest</p>
            </div>
          </div>
        </section>

        {/* Contract Types */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full" />
                <GlassCard className="p-8 border-white/10 relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">E</div>
                        <div>
                          <p className="text-sm font-bold text-white">ETHUSDT PERP</p>
                          <p className="text-[10px] text-red-400">Mark Price: $3,850.25</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">USDT-M</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-muted-foreground uppercase mb-1">PnL (ROE%)</p>
                        <p className="text-xl font-bold text-emerald-400">+$1,420.50 (+120%)</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Leverage</p>
                        <p className="text-xl font-bold text-white">100x Isolated</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between text-xs">
                         <span className="text-muted-foreground">Liq. Price</span>
                         <span className="text-white font-bold">$3,120.45</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-400 w-[75%]" />
                       </div>
                       <div className="flex justify-between text-[10px] text-muted-foreground">
                         <span>Safe Zone</span>
                         <span>Risk Level: Low</span>
                       </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors">Long</button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors">Short</button>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Diverse <span className="text-purple-400">Futures Contracts</span> for every market outlook.
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "USDT-M Perpetuals", desc: "Settled in USDT. Best for easy profit calculation and hedging. Supports 100+ assets with up to 125x leverage.", icon: Zap },
                    { title: "Coin-M Perpetuals", desc: "Settled in the underlying coin (e.g. BTC, ETH). Ideal for long-term holders who want to increase their coin stack.", icon: TrendingUp },
                    { title: "Delivery Contracts", desc: "Quarterly and Bi-Quarterly contracts for traders who prefer fixed-term exposures without funding fees.", icon: BarChart3 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                        <item.icon className="h-6 w-6 text-purple-400" />
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

        {/* Features Content Dense */}
        <section className="py-24 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Institutional Trading Infrastructure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Built for zero downtime and extreme performance, our matching engine can handle millions of orders per second.</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard className="p-8 space-y-4">
              <Cpu className="h-10 w-10 text-purple-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Ultra-Low Latency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Execute trades in under 5 milliseconds. Co-located servers across global hubs ensure your orders hit the book before the competition.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <ShieldAlert className="h-10 w-10 text-red-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Smart Liquidation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Our multi-stage liquidation process protects your balance by gradually reducing positions rather than instant total closure when possible.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <Lock className="h-10 w-10 text-cyan-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Insurance Fund</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">A multi-billion dollar insurance fund protects against system-wide bankruptcies, ensuring all winning traders always receive their profits.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <Activity className="h-10 w-10 text-orange-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Cross/Isolated Margin</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Switch between Cross and Isolated margin modes on the fly to optimize your portfolio risk according to your strategy.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <Globe className="h-10 w-10 text-emerald-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Advanced APIs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Full WebSocket and REST API support with FIX protocol options for institutional high-frequency trading bots.</p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4">
              <TrendingUp className="h-10 w-10 text-indigo-400 mb-2" />
              <h3 className="text-xl font-bold text-white">Strategy Trading</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Built-in grid bots, TWAP, and VP strategies to automate your entries and exits across hundreds of contracts.</p>
            </GlassCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Experience High-Octane Trading</h2>
            <p className="text-xl text-muted-foreground">The ultimate platform for leverage trading. Open your futures account in seconds.</p>
            <div className="flex justify-center gap-4 pt-8">
              <Link href="/register">
                <GradientButton className="px-12 py-6 text-xl shadow-[0_0_40px_rgba(168,85,247,0.4)]">Get Started Now</GradientButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
