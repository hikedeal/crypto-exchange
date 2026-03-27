"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  BarChart3, ShieldCheck, Zap, Globe, Lock, CreditCard, 
  ArrowUpRight, LineChart, Coins, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SpotTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-4 text-sm font-medium text-blue-400">
              <BarChart3 className="h-4 w-4" />
              {t("MegaMenu.spot_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Instant Spot Trading with <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Zero Slippage</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Execute high-volume trades instantly at market price with our institutional-grade matching engine. Simple, transparent, and ultra-secure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  Start Trading Now
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  View Live Markets <ArrowUpRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Stats Section */}
        <section className="py-12 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">0.1%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Base Fee</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">800+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Trading Pairs</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">&lt; 5ms</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Execution Time</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-bold text-white mb-1">$2.4B</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Daily Volume</p>
            </div>
          </div>
        </section>

        {/* Why Spot Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  The most powerful <span className="text-blue-400">Spot Exchange</span> for retail and pro traders.
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Deep Liquidity", desc: "Never worry about slippage. Our order books are deeper than the ocean, ensuring you get the best price for any volume.", icon: Zap },
                    { title: "Institutional Grade", desc: "Connected to top-tier liquidity providers to offer you tight spreads and high throughput availability 24/7.", icon: ShieldCheck },
                    { title: "Global Access", desc: "Trade from anywhere in the world with local currency support and 300+ payment methods for instant funding.", icon: Globe },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                        <item.icon className="h-6 w-6 text-blue-400" />
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
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
                <GlassCard className="p-8 border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">B</div>
                        <div>
                          <p className="text-sm font-bold text-white">BTC / USDT</p>
                          <p className="text-[10px] text-emerald-400">+2.45% Today</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">$68,420.50</p>
                        <p className="text-[10px] text-muted-foreground">Vol: 1.25B USDT</p>
                      </div>
                    </div>
                    
                    {/* Simulated Order Book */}
                    <div className="space-y-2 font-mono text-[10px]">
                      <p className="text-white/30 mb-2 uppercase tracking-widest border-b border-white/5 pb-1">Order Book</p>
                      {[68425.50, 68423.20, 68421.10].map((price, i) => (
                        <div key={i} className="flex justify-between text-red-400/80">
                          <span>{price.toFixed(2)}</span>
                          <span>0.{Math.floor(Math.random() * 900) + 100} BTC</span>
                        </div>
                      ))}
                      <div className="py-2 text-center text-xl font-bold text-white border-y border-white/5 my-2">
                        68,420.50
                      </div>
                      {[68419.80, 68418.50, 68417.20].map((price, i) => (
                        <div key={i} className="flex justify-between text-emerald-400/80">
                          <span>{price.toFixed(2)}</span>
                          <span>0.{Math.floor(Math.random() * 900) + 100} BTC</span>
                        </div>
                      ))}
                    </div>
                    
                    <GradientButton className="w-full font-bold">Buy BTC Instantly</GradientButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Features Content Dense */}
        <section className="py-24 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Trading Control</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our spot trading platform is packed with features designed to give you the edge in any market condition.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-8 space-y-4">
                <LineChart className="h-10 w-10 text-blue-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Advanced Charting</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Integrated TradingView charts with 100+ indicators, custom drawing tools, and multi-timeframe analysis for precision entries.</p>
              </GlassCard>
              
              <GlassCard className="p-8 space-y-4">
                <Coins className="h-10 w-10 text-purple-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Dust Conversion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Instantly convert small balances (dust) into our platform token or BNB with a single click, maximizing your capital efficiency.</p>
              </GlassCard>
              
              <GlassCard className="p-8 space-y-4">
                <Lock className="h-10 w-10 text-cyan-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Asset Isolation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Your spot assets are held in segregated accounts with multi-sig protection, ensuring your funds are always yours and never commingled.</p>
              </GlassCard>
              
              <GlassCard className="p-8 space-y-4">
                <Zap className="h-10 w-10 text-orange-400 mb-2" />
                <h3 className="text-xl font-bold text-white">OCO Orders</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">One-Cancels-the-Other orders allow you to set both a stop-loss and a take-profit at the same time, automating your risk management.</p>
              </GlassCard>
              
              <GlassCard className="p-8 space-y-4">
                <Globe className="h-10 w-10 text-emerald-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Sub-Account Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Create up to 50 sub-accounts for different trading strategies, API bots, or family members, all under one master account control.</p>
              </GlassCard>
              
              <GlassCard className="p-8 space-y-4">
                <ShieldCheck className="h-10 w-10 text-indigo-400 mb-2" />
                <h3 className="text-xl font-bold text-white">Slippage Protection</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Our smart order routing protects you from price impact on large orders by splitting executions across multiple liquidity pools.</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px]" />
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to trade spot?</h2>
            <p className="text-xl text-muted-foreground">Join millions of traders and enjoy the most robust spot exchange experience on the planet.</p>
            <div className="flex justify-center gap-4 pt-8">
              <Link href="/register">
                <GradientButton className="px-12 py-6 text-xl">Create Free Account</GradientButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
