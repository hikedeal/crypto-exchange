import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function MarginTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            CryptoP2P
          </Link>
          <Link href="/" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-20 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-center bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          {t("MegaMenu.margin_title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-center mb-16">
          {t("MegaMenu.margin_desc")}
        </p>
        
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-4xl w-full shadow-2xl space-y-8">
           <h2 className="text-2xl font-semibold">Maximize your capital efficiency.</h2>
           <p className="text-muted-foreground text-lg leading-relaxed">
             Borrow funds directly against your existing portfolio to increase your purchasing power. Margin trading lets you act on high conviction plays without fully liquidating cold storage assets.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
             <div>
               <h3 className="text-white font-medium mb-2">Tiered Interest</h3>
               <p className="text-sm text-muted-foreground">Competitive hourly borrow rates that scale elegantly with your tier level.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Unified Accounts</h3>
               <p className="text-sm text-muted-foreground">Share margin balances seamlessly between Spot, Futures, and Margin setups.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Auto-Repayment</h3>
               <p className="text-sm text-muted-foreground">Smart liquidation logic that prioritizes asset-preservation models.</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}
