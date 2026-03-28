import { Shield, FileText, LifeBuoy, Ticket, Percent, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

export default function Page() {
  const isSupport = ["help", "tickets", "fees"].includes("terms");
  
  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col">
      <LandingNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-primary">
            {isSupport ? <LifeBuoy className="h-12 w-12" /> : <FileText className="h-12 w-12" />}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight capitalize">
            terms
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            This page is currently under development. The full content will be available in a future update.
          </p>
          <GlassCard className="mt-8 p-6 max-w-md bg-white/[0.02] border-white/5">
            <h3 className="text-white font-semibold mb-2">Want to know more?</h3>
            <p className="text-sm text-muted-foreground">
              Our {isSupport ? 'support center' : 'legal department'} is actively preparing documentation to provide you with the most comprehensive information.
            </p>
          </GlassCard>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
