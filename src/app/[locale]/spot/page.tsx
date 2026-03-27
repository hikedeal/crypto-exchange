import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function SpotTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
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
          {t("MegaMenu.spot_title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-center mb-16">
          {t("MegaMenu.spot_desc")}
        </p>
        
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-4xl w-full shadow-2xl space-y-8">
           <h2 className="text-2xl font-semibold">Invest with confidence.</h2>
           <p className="text-muted-foreground text-lg leading-relaxed">
             Spot trading provides the simplest and most accessible form of interacting with cryptocurrency markets. Buy and hold directly, without the complexities of leverage or liquidation thresholds.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
             <div>
               <h3 className="text-white font-medium mb-2">Zero Implicit Fees</h3>
               <p className="text-sm text-muted-foreground">Trade without hidden margins. You pay exact market prices.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Instant Settlement</h3>
               <p className="text-sm text-muted-foreground">Assets move directly to your wallet the moment the trade confirms.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Maximum Security</h3>
               <p className="text-sm text-muted-foreground">Your assets are stored offline in cold storage instantly after purchase.</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}
