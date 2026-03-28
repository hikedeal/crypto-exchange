import { Shield, FileText, CheckCircle, Scale, Gavel, AlertCircle, Lock, Globe } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

const sections = [
  {
    icon: Globe,
    title: "1. Acceptance of Terms",
    content: "By accessing or using the CryptoP2P platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
  },
  {
    icon: Shield,
    title: "2. Eligibility & Account",
    content: "You must be at least 18 years old to use this platform. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account."
  },
  {
    icon: Scale,
    title: "3. Trading Services & Fees",
    content: "CryptoP2P provides a platform for peer-to-peer cryptocurrency trading. Users are responsible for verifying the identity of their counterparties. All fees are clearly disclosed in our Fee Schedule and are subject to change with prior notice."
  },
  {
    icon: Gavel,
    title: "4. Prohibited Activities",
    content: "Users may not engage in any illegal activities, including money laundering, terrorist financing, or fraud. We reserve the right to suspend or terminate accounts that violate these rules or engage in suspicious behavior."
  },
  {
    icon: AlertCircle,
    title: "5. Risk Disclosure",
    content: "Trading cryptocurrencies involves significant risk and can result in the loss of your invested capital. You should not invest more than you can afford to lose. CryptoP2P is not responsible for any losses incurred due to market volatility or user error."
  },
  {
    icon: Lock,
    title: "6. Limitation of Liability",
    content: "To the maximum extent permitted by law, CryptoP2P shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly."
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="h-3 w-3" />
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Please read these terms carefully before using our platform. Last updated: March 28, 2026.
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
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {section.content}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-3 w-3" />
                Compliance Verified
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-12 p-8 text-center border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <p className="text-muted-foreground text-sm italic">
            Questions about our terms? Contact our legal team at <span className="text-primary font-medium">legal@cryptop2p.exchange</span>
          </p>
        </GlassCard>
      </main>
      
      <LandingFooter />
    </div>
  );
}
