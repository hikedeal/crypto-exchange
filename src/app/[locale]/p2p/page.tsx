"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  Users, ShieldCheck, Zap, Globe, Lock, CreditCard, 
  ArrowRight, ShieldAlert, CheckCircle2, MessageSquare, Handshake, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function P2PTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-1/2 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2" />

      <LandingNavbar />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-4 text-sm font-medium text-blue-400">
              <Users className="h-4 w-4" />
              {t("MegaMenu.p2p_title")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              Direct Peer-to-Peer <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Exchange.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Buy and sell crypto directly with other users using your preferred payment method. Secured by our institutional-grade escrow system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  Browse Offers
                </GradientButton>
              </Link>
              <Link href="/register">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  Become a Merchant <ShieldCheck className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* P2P Trust Markers */}
        <section className="py-12 px-4 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Zero Fees", desc: "No trading fees on P2P. What you see is exactly what you pay/receive.", icon: Zap },
              { title: "Escrow Protection", desc: "Digital assets are locked in our secure escrow until payment is confirmed.", icon: Lock },
              { title: "300+ Payments", desc: "Bank transfer, PayPal, Apple Pay, Wise, and hundreds of local options.", icon: CreditCard },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center justify-center md:justify-start">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-lg">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Simple 3-Step Process</h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden md:block -translate-y-1/2" />
              {[
                { title: "Choose Offer", desc: "Pick a merchant based on price, rating, and payment method.", icon: Users },
                { title: "Pay Merchant", desc: "Send funds directly to the seller via your chosen payment app.", icon: Handshake },
                { title: "Receive Crypto", desc: "Mark as paid and receive your assets instantly from escrow.", icon: CheckCircle2 },
              ].map((step, i) => (
                <GlassCard key={i} className="p-8 text-center space-y-4 relative z-10 hover:border-blue-500/50 transition-all group">
                   <div className="h-16 w-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <step.icon className="h-8 w-8 text-blue-400" />
                   </div>
                   <h3 className="text-xl font-bold text-white leading-tight">Step {i+1}: {step.title}</h3>
                   <p className="text-sm text-muted-foreground italic">{step.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section Deep Dive */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                 Industry-Leading <span className="text-emerald-400">P2P Security.</span>
               </h2>
               <div className="space-y-6">
                 {[
                   { title: "24/7 Dispute Support", desc: "Our global support team acts as moderators to resolve any trade disputes within minutes, ensuring a fair outcome for all parties.", icon: MessageSquare },
                   { title: "Verified Merchants", desc: "Look for the yellow checkmark. Our Pro-Merchants undergo deep KYC and identity verification to ensure maximum trust.", icon: ShieldAlert },
                   { title: "Risk Scoring", desc: "Every user has a transparent completion rate and rating history. You only trade with people you trust.", icon: Activity },
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                       <item.icon className="h-5 w-5 text-emerald-400" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">{item.title}</h4>
                       <p className="text-sm text-muted-foreground">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
              <GlassCard className="p-8 border-white/10 text-center space-y-6">
                <div className="h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                   <Lock className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Funds are Safe in Escrow</h3>
                <p className="text-muted-foreground italic">"I've been trading P2P for 3 years, and this is the only platform where I never worry about scammers. The escrow is rock solid."</p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2">
                   <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                   <div className="text-left">
                     <p className="text-xs font-bold text-white">Alexander K.</p>
                     <p className="text-[10px] text-muted-foreground">Top Merchant • 5.0 Rating</p>
                   </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
