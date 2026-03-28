import { Shield, Lock, Eye, Share2, Database, UserCheck, Bell, Cookie } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

const sections = [
  {
    icon: Database,
    title: "1. Information Collection",
    content: "We collect personal information that you provide to us, such as your name, email address, and financial details during registration. We also collect technical data including IP addresses and browser info for security and analytics."
  },
  {
    icon: Eye,
    title: "2. How We Use Data",
    content: "Your data is used to provide and maintain our services, notify you about changes, provide customer support, and detect, prevent, and address technical issues or fraudulent activities."
  },
  {
    icon: Share2,
    title: "3. Information Sharing",
    content: "We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, or when required by law to comply with legal obligations."
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: "The security of your data is important to us. We implement industry-standard encryption and security measures to protect your personal information from unauthorized access, alteration, or disclosure."
  },
  {
    icon: UserCheck,
    title: "5. Your Privacy Rights",
    content: "Depending on your location, you may have rights under GDPR, CCPA, or other regulations. This includes the right to access, correct, or delete your personal data. Contact our DPO for any requests."
  },
  {
    icon: Cookie,
    title: "6. Cookie Policy",
    content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="h-3 w-3" />
            Privacy & Trust
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Your privacy is our priority. Learn how we handle and protect your data. Last updated: March 28, 2026.
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

        <GlassCard className="mt-12 p-8 text-center border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex flex-col items-center gap-4">
            <Bell className="h-8 w-8 text-primary/50" />
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the date.
            </p>
            <p className="text-primary font-medium text-sm">privacy@cryptop2p.exchange</p>
          </div>
        </GlassCard>
      </main>
      
      <LandingFooter />
    </div>
  );
}
