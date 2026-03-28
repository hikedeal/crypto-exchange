"use client";

import { CheckCircle2, ChevronRight, Infinity, Info, Shield, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

const spotFees = [
  { level: "VIP 0", vol: "< $50K", maker: "0.100%", taker: "0.100%" },
  { level: "VIP 1", vol: "> $50K", maker: "0.080%", taker: "0.090%" },
  { level: "VIP 2", vol: "> $500K", maker: "0.060%", taker: "0.075%" },
  { level: "VIP 3", vol: "> $2M", maker: "0.040%", taker: "0.060%" },
  { level: "VIP 4", vol: "> $10M", maker: "0.020%", taker: "0.040%" },
];

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 w-full relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Transparent Fee Schedule
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We believe in clear, low fees. Trade more, pay less with our volume-based VIP tiers. Zero hidden charges.
          </p>
        </div>

        <div className="space-y-12">
          {/* P2P Zero Fees Callout */}
          <GlassCard className="p-8 border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent flex flex-col sm:flex-row items-center gap-6">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Infinity className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">0% P2P Trading Fees</h2>
              <p className="text-sm text-emerald-100/70 leading-relaxed">
                Buying and selling crypto on our P2P marketplace is completely free. We charge absolutely zero maker or taker fees for peer-to-peer transactions. Keep 100% of your money.
              </p>
            </div>
          </GlassCard>

          {/* Spot Trading Fees */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Spot & Margin Trading</h2>
                <p className="text-sm text-muted-foreground">Discounted fees based on 30-day trading volume</p>
              </div>
            </div>
            
            <GlassCard className="overflow-hidden bg-white/[0.01] border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Tier Level</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">30-Day Volume</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Maker Fee</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Taker Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {spotFees.map((tier, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5">
                          <span className="font-bold text-white">{tier.level}</span>
                        </td>
                        <td className="px-6 py-5 text-sm text-muted-foreground">
                          {tier.vol}
                        </td>
                        <td className="px-6 py-5 text-right font-medium text-emerald-400">
                          {tier.maker}
                        </td>
                        <td className="px-6 py-5 text-right font-medium text-rose-400">
                          {tier.taker}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
            <div className="flex items-start gap-2 mt-4 px-2">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Using the native platform token (CP2P) to pay for trading fees automatically applies an additional 25% discount to the standard rates above.</p>
            </div>
          </div>

          {/* Deposit & Withdrawals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <GlassCard className="p-8 bg-white/[0.01] border-white/5">
              <div className="p-3 bg-white/5 rounded-xl text-white inline-flex mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fiat Deposits</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bank Transfer (SEPA/ACH)</span>
                  <span className="font-bold text-emerald-400">Free</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Credit / Debit Card</span>
                  <span className="font-bold text-rose-400">1.8%</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Apple Pay / Google Pay</span>
                  <span className="font-bold text-rose-400">2.0%</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8 bg-white/[0.01] border-white/5">
              <div className="p-3 bg-white/5 rounded-xl text-white inline-flex mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Crypto Withdrawals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Crypto withdrawal fees are purely determined by the blockchain network and are completely dynamic. We do not charge any additional internal processing fees.
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between text-sm">
                <span className="text-white font-medium">Standard Network Fee</span>
                <span className="font-bold text-white">Dynamic</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
}
