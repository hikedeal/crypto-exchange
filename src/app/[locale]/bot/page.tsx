import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function BotTradingPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-white">
      <div className="fixed top-1/4 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />
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
          {t("MegaMenu.bot_title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-center mb-16">
          {t("MegaMenu.bot_desc")}
        </p>
        
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-4xl w-full shadow-2xl space-y-8">
           <h2 className="text-2xl font-semibold">Automate your strategies. 24/7.</h2>
           <p className="text-muted-foreground text-lg leading-relaxed">
             Deploy intelligent trading algorithms ranging from simple Grid Bots and DCA setups to incredibly complex quantitative strategies powered by AI. Never sleep on the market.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
             <div>
               <h3 className="text-white font-medium mb-2">Grid & DCA</h3>
               <p className="text-sm text-muted-foreground">Pre-configured popular templates ready to deploy with one click.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Copy Trading</h3>
               <p className="text-sm text-muted-foreground">Automatically mirror the quantitative strategies of our top performers.</p>
             </div>
             <div>
               <h3 className="text-white font-medium mb-2">Webhooks & API</h3>
               <p className="text-sm text-muted-foreground">Build entirely custom integrations natively linked to TradingView alerts.</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}
