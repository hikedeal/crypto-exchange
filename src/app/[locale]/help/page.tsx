"use client";

import { useState } from "react";
import { Search, Book, Shield, CreditCard, Users, Zap, ArrowRight, LifeBuoy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { Link } from "@/i18n/routing";

const categories = [
  { icon: Zap, title: "Getting Started", desc: "A guide for new users", count: 12 },
  { icon: Shield, title: "Account & Security", desc: "2FA, KYC, and password", count: 24 },
  { icon: Book, title: "Spot & Margin Trading", desc: "Understanding the markets", count: 35 },
  { icon: Users, title: "P2P Marketplace", desc: "Buying & selling directly", count: 18 },
  { icon: CreditCard, title: "Deposits & Withdrawals", desc: "Funding your account", count: 21 },
  { icon: LifeBuoy, title: "Other Enquiries", desc: "APIs, sub-accounts, etc.", count: 9 },
];

const popularFaqs = [
  { q: "How do I secure my account?", a: "Enable Google Authenticator (2FA) in your Security settings. Never share your passwords or verification codes with anyone, including support staff." },
  { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal varies by cryptocurrency. For Bitcoin, it is typically 0.001 BTC. Please check the specific asset's withdrawal page for real-time limits." },
  { q: "How long does P2P arbitration take?", a: "Once a dispute is opened, our team typically resolves it within 12-24 hours depending on the evidence provided by both the buyer and the seller." },
  { q: "Why is my deposit not showing up?", a: "Deposits require a certain number of network confirmations. Please check the blockchain explorer using your TXID to verify if the transaction has been confirmed by the network." }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 w-full relative z-10">
        {/* Hero Search Section */}
        <div className="w-full py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              How can we help you?
            </h1>
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, guides, or FAQs..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-base focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-xl shadow-black/20"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>Popular:</span>
              <button className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:text-white transition-colors">Reset Password</button>
              <button className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:text-white transition-colors">KYC Verification</button>
              <button className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:text-white transition-colors">2FA Setup</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-20 space-y-20">
          {/* Categories Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 px-2">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, idx) => (
                <GlassCard key={idx} className="p-6 bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{category.count} Articles</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Popular FAQs */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {popularFaqs.map((faq, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-white flex items-start gap-2">
                    <span className="text-primary mt-1">Q:</span> {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support CTA */}
          <GlassCard className="p-8 md:p-12 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Can't find what you're looking for? Our dedicated support team is available 24/7 to assist you.
              </p>
              <Link href="/tickets" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                <LifeBuoy className="h-5 w-5" />
                Submit a Support Ticket
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
}
