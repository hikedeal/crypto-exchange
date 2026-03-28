import { Shield, UserCheck, Search, ShieldCheck, Landmark, AlertTriangle, FileCheck, History } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

const sections = [
  {
    icon: Landmark,
    title: "1. Compliance Overview",
    content: "CryptoP2P is committed to the highest standards of Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance to prevent the use of our platform for illegal activities."
  },
  {
    icon: UserCheck,
    title: "2. Identity Verification",
    content: "All users must undergo identity verification before accessing trading services. This includes providing a valid government-issued ID and proof of residence to ensure a secure trading environment."
  },
  {
    icon: ShieldCheck,
    title: "3. Verification Levels",
    content: "We offer tiered verification levels (Level 1, 2, and 3) with increasing deposit and withdrawal limits. Higher tiers require more detailed documentation, such as source of funds declarations."
  },
  {
    icon: Search,
    title: "4. Continuous Monitoring",
    content: "We perform ongoing monitoring of transactions to detect and report suspicious activities. This includes screening against global sanctions lists and PEP (Politically Exposed Persons) databases."
  },
  {
    icon: AlertTriangle,
    title: "5. AML Measures",
    content: "Our AML program includes internal controls, record keeping, and employee training. We cooperate fully with regulators and law enforcement agencies to maintain market integrity."
  },
  {
    icon: History,
    title: "6. Record Keeping",
    content: "In accordance with regulatory requirements, we maintain records of all identity documentation and transaction history for a minimum period of five years following the closure of an account."
  }
];

export default function KYCPage() {
  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <FileCheck className="h-3 w-3" />
            Compliance Standards
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            KYC & AML Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Maintaining a secure and compliant ecosystem for global peer-to-peer trading. Last updated: March 28, 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <GlassCard key={idx} className="p-8 bg-white/[0.01] border-white/5 hover:border-primary/20 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 text-primary group-hover:bg-primary/10 transition-colors">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {section.content}
              </p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-12 p-8 border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-white tracking-tight">Ready to Verify?</h3>
              <p className="text-muted-foreground text-sm">Start your identification process to unlock higher limits.</p>
            </div>
            <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform whitespace-nowrap">
              Verify Identity
            </button>
          </div>
        </GlassCard>
      </main>
      
      <LandingFooter />
    </div>
  );
}
