"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Lock, CreditCard, 
  ChevronRight, Star, ArrowUpRight, ArrowDownRight,
  TrendingUp, Users, Wallet, CheckCircle2, Quote
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useAdminStore } from "@/store/useAdminStore";
import { useP2PStore } from "@/store/useP2PStore";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";

const userAvatars = [
  "/avatars/user_avatar_john_1773685431308.png",
  "/avatars/user_avatar_amit_1773685512361.png",
  "/avatars/user_avatar_chen_1773685726550.png",
  "/avatars/user_avatar_ali_1773685841990.png",
  "/avatars/user_avatar_maria_1773685872168.png",
];

interface TickerData {
  symbol: string;
  price: string;
}

interface MarketData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  quoteVolume: string;
}

const DEFAULT_TICKER_DATA: TickerData[] = [
  { symbol: "BTCUSDT", price: "68420.50" },
  { symbol: "ETHUSDT", price: "3850.25" },
  { symbol: "BNBUSDT", price: "612.80" },
  { symbol: "SOLUSDT", price: "145.15" },
  { symbol: "XRPUSDT", price: "0.62" },
];

const DEFAULT_MARKET_DATA: MarketData[] = [
  { symbol: "BTCUSDT", lastPrice: "68420.50", priceChangePercent: "2.45", quoteVolume: "1250000000" },
  { symbol: "ETHUSDT", lastPrice: "3850.25", priceChangePercent: "1.82", quoteVolume: "850000000" },
  { symbol: "BNBUSDT", lastPrice: "612.80", priceChangePercent: "3.15", quoteVolume: "420000000" },
  { symbol: "SOLUSDT", lastPrice: "145.15", priceChangePercent: "-0.54", quoteVolume: "310000000" },
  { symbol: "XRPUSDT", lastPrice: "0.62", priceChangePercent: "0.12", quoteVolume: "150000000" },
  { symbol: "DOGEUSDT", lastPrice: "0.16", priceChangePercent: "5.67", quoteVolume: "95000000" },
  { symbol: "ADAUSDT", lastPrice: "0.58", priceChangePercent: "-1.23", quoteVolume: "82000000" },
  { symbol: "TRXUSDT", lastPrice: "0.12", priceChangePercent: "0.45", quoteVolume: "65000000" },
  { symbol: "AVAXUSDT", lastPrice: "42.30", priceChangePercent: "2.11", quoteVolume: "54000000" },
  { symbol: "DOTUSDT", lastPrice: "7.85", priceChangePercent: "-0.89", quoteVolume: "45000000" },
];

export default function LandingPage() {
  const t = useTranslations();
  const { formatCurrency } = useCurrencyStore();
  const cms = useAdminStore((state: any) => state.cms);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [tickerPrices, setTickerPrices] = useState<TickerData[]>(DEFAULT_TICKER_DATA);
  const [marketData, setMarketData] = useState<MarketData[]>(DEFAULT_MARKET_DATA);

  // Fetch Live Ticker Prices (5 symbols)
  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const targets = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];
        const filtered = data.filter((item: any) => targets.includes(item.symbol));
        if (filtered.length > 0) setTickerPrices(filtered);
      } catch (error) {
        console.warn("Ticker fetch failed, using fallback:", error);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Market Table Data (Top 10 by Quote Volume)
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const topSymbols = [
          "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", 
          "DOGEUSDT", "ADAUSDT", "TRXUSDT", "AVAXUSDT", "DOTUSDT"
        ];
        
        const filtered = data
          .filter((item: any) => topSymbols.includes(item.symbol))
          .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
          
        if (filtered.length > 0) setMarketData(filtered);
      } catch (error) {
        console.warn("Market fetch failed, using fallback:", error);
      }
    };

    fetchMarket();
    const interval = setInterval(fetchMarket, 60000); // Update every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none translate-y-1/2" />
      
      {/* Navbar Shared */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("Hero.volume_badge")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
              {mounted ? cms.hero.headline : t("Hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {mounted ? cms.hero.subtitle : t("Hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <GradientButton className="h-16 text-lg w-full sm:w-60 font-medium">
                  {mounted ? cms.hero.ctaPrimary : t("Hero.cta_start")}
                </GradientButton>
              </Link>
              <Link href="#p2p">
                <button className="h-16 text-lg w-full sm:w-60 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  {mounted ? cms.hero.ctaSecondary : t("Hero.cta_offers")} <ChevronRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Market Ticker */}
        <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-md overflow-hidden flex">
          <div className="flex space-x-16 animate-[scroll_30s_linear_infinite] px-8 whitespace-nowrap opacity-80">
            {(tickerPrices.length > 0 ? [...tickerPrices, ...tickerPrices] : [1, 2, 3, 4, 5]).map((ticker: any, i) => (
              <div key={i} className="flex items-center gap-3 min-w-[200px]">
                <span className="font-bold text-white">{ticker.symbol || "BTCUSDT"}</span>
                <span className="text-emerald-400 font-medium">
                  {mounted ? formatCurrency(parseFloat(ticker.price || "65000")) : `$${ticker.price || "65000"}`}
                </span>
                <span className="text-xs text-emerald-500 font-bold">+2.4%</span>
              </div>
            ))}
          </div>
        </section>


        {/* Stats Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: t("Stats.users"), value: "2M+", icon: Users, color: "blue" },
              { label: t("Stats.volume"), value: "$5B", icon: TrendingUp, color: "purple" },
              { label: t("Stats.countries"), value: "150+", icon: Globe, color: "cyan" },
              { label: t("Stats.payments"), value: "300+", icon: Wallet, color: "emerald" },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-8 text-center group hover:-translate-y-2 transition-all duration-500">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-opacity-10",
                  stat.color === "blue" ? "bg-blue-500 text-blue-400" :
                  stat.color === "purple" ? "bg-purple-500 text-purple-400" :
                  stat.color === "cyan" ? "bg-cyan-500 text-cyan-400" :
                  "bg-emerald-500 text-emerald-400"
                )}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <div className={cn(
                  "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity",
                  stat.color === "blue" ? "from-blue-500/0 via-blue-500 to-blue-500/0" :
                  stat.color === "purple" ? "from-purple-500/0 via-purple-500 to-purple-500/0" :
                  stat.color === "cyan" ? "from-cyan-500/0 via-cyan-500 to-cyan-500/0" :
                  "from-emerald-500/0 via-emerald-500 to-emerald-500/0"
                )} />
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">{t("Features.title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("Features.subtitle")}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="p-8 group hover:border-blue-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("Features.fast_title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("Features.fast_desc")}</p>
              </GlassCard>
              
              <GlassCard className="p-8 group hover:border-purple-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("Features.secure_title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("Features.secure_desc")}</p>
              </GlassCard>
              
              <GlassCard className="p-8 group hover:border-cyan-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("Features.global_title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("Features.global_desc")}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* About P2P Section */}
        <section className="py-24 px-4 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {t.rich("About.title", {
                  span: (chunks) => <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{chunks}</span>
                })}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("About.desc")}
              </p>
              <div className="space-y-4">
                {[
                  { title: t("About.escrow_title"), desc: t("About.escrow_desc"), icon: ShieldCheck },
                  { title: t("About.direct_title"), desc: t("About.direct_desc"), icon: Users },
                  { title: t("About.payments_title"), desc: t("About.payments_desc"), icon: CreditCard },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <GlassCard className="p-2 border-white/10 relative overflow-hidden">
                <div className="rounded-lg bg-[#0b0f19] border border-white/5 overflow-hidden">
                  <div className="bg-black/40 p-4 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">cryptop2p.com/escrow-verified</span>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <div>
                          <p className="text-xs font-bold text-white">{t("About.seller_label")}: CryptoWhale</p>
                          <p className="text-[10px] text-emerald-400">100% {t("About.completion_label")} • 5.0 Rating</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-white">1 BTC</p>
                        <p className="text-[10px] text-muted-foreground">Price: {mounted ? formatCurrency(65000) : "$65,000.00"}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg text-center">
                      <p className="text-xs font-bold text-emerald-400">{t("About.escrow_active")}</p>
                      <p className="text-[10px] text-emerald-300 opacity-70">{t("About.escrow_locked")}</p>
                    </div>
                    <Link href="/register">
                      <GradientButton className="w-full text-xs font-bold h-10">{t("About.confirm_btn")}</GradientButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>


        {/* Live Market Table */}
        <section id="market" className="py-24 px-4 bg-black/40 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  {t.rich("Market.title", {
                    span: (chunks: React.ReactNode) => <span className="text-blue-400">{chunks}</span>
                  })}
                </h2>
                <p className="text-muted-foreground">{t("Market.subtitle")}</p>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white shadow-xl shadow-blue-500/10">{t("Market.usdt_tab")}</div>
                <div className="px-6 py-2 rounded-full border border-white/10 bg-transparent text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer">{t("Market.btc_tab")}</div>
              </div>
            </div>
            
            <GlassCard className="overflow-hidden border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10 bg-white/[0.02]">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("Market.asset")}</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">{t("Market.price")}</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">{t("Market.change")}</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">{t("Market.volume")}</th>
                      <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">{t("Market.action")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(marketData.length > 0 ? marketData : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((coin: any, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 text-xs">
                              {(coin.symbol || "BTC").charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{coin.symbol || "BTC/USDT"}</p>
                              <p className="text-[10px] text-muted-foreground uppercase">{coin.symbol?.replace("USDT", "") || "Bitcoin"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right font-mono text-sm text-white">
                          {mounted ? formatCurrency(parseFloat(coin.lastPrice || "65000")) : `$${coin.lastPrice || "65000"}`}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className={cn(
                            "inline-flex items-center gap-1 font-bold text-sm",
                            parseFloat(coin.priceChangePercent || "2.4") > 0 ? "text-emerald-400" : "text-red-400"
                          )}>
                            {parseFloat(coin.priceChangePercent || "2.4") > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            {coin.priceChangePercent || "2.4"}%
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right font-mono text-xs text-muted-foreground">
                          {mounted ? formatCurrency(parseFloat(coin.quoteVolume || "1200000000")) : `$${coin.quoteVolume || "1200000000"}`}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Link href="/register">
                            <button className="text-xs font-bold text-primary hover:text-white transition-colors">{t("Market.trade_now")}</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* P2P Section */}
        <section id="p2p" className="py-24 px-4 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {t.rich("P2P.title", {
                  span: (chunks) => <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{chunks}</span>
                })}
              </h2>
              <p className="text-lg text-muted-foreground">{t("P2P.subtitle")}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {['Bank Transfer', 'PayPal', 'Apple Pay', 'Google Pay', 'Wise', 'Revolut', 'Zelle', 'Cash App'].map(method => (
                  <div key={method} className="flex items-center gap-2 p-3 rounded-lg border border-white/5 bg-black/40 text-sm font-medium text-white">
                    <CreditCard className="h-4 w-4 text-primary" /> {method}
                  </div>
                ))}
              </div>
              
              <Link href="/register" className="inline-block pt-4">
                <span className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  {t("P2P.explore")} <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
            
            <div className="relative z-10">
              <P2PPreview t={t} formatCurrency={formatCurrency} mounted={mounted} />
              
              <GlassCard className="absolute -bottom-8 -left-8 p-4 flex items-center gap-4 animate-bounce duration-[3000ms]">
                <Lock className="h-8 w-8 text-emerald-400" />
                <div>
                  <p className="font-bold text-white text-sm">{t("P2P.escrow_protected")}</p>
                  <p className="text-xs text-muted-foreground">{t("P2P.safe_trades")}</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-32 px-4 relative overflow-hidden bg-black/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto mb-16 relative text-center">
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold text-primary uppercase tracking-widest">
                Wall of Love
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {t.rich("Testimonials.title", {
                span: (chunks: React.ReactNode) => <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{chunks}</span>
              })}
            </h2>
          </div>
          
          <div className="flex flex-nowrap gap-6 animate-[scroll_50s_linear_infinite] hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-6 shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <GlassCard key={`${groupIndex}-${i}`} className="p-8 min-w-[400px] shrink-0 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
                    <Quote className="absolute -right-4 -top-4 h-24 w-24 text-white/[0.02] -rotate-12 group-hover:text-primary/[0.05] transition-colors" />
                    
                    <div className="flex items-center justify-between mb-6 relative">
                      <div className="flex items-center gap-4">
                        <div className="relative group/avatar">
                          <img 
                            src={userAvatars[i-1]} 
                            alt={t(`Testimonials.user${i}_name`)}
                            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover/avatar:ring-primary/50 transition-all duration-300"
                          />
                          <div className="absolute -right-1 -bottom-1 bg-primary rounded-full p-0.5 border-2 border-background shadow-lg">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg tracking-tight">{t(`Testimonials.user${i}_name`)}</h4>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t(`Testimonials.user${i}_country`)}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-base text-muted-foreground leading-relaxed relative pl-4 border-l-2 border-primary/20 group-hover:border-primary/50 transition-colors italic">
                      "{t(`Testimonials.user${i}_review`)}"
                    </p>
                  </GlassCard>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 relative max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {t.rich("FAQ.title", {
                span: (chunks: React.ReactNode) => <span className="text-cyan-400">{chunks}</span>
              })}
            </h2>
            <p className="text-muted-foreground">{t("FAQ.subtitle")}</p>
          </div>
          
          <Accordion {...({ type: "single", collapsible: true } as any)} className="w-full space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/5 bg-white/[0.02] rounded-xl px-6">
                <AccordionTrigger className="text-white hover:text-primary transition-colors py-6 text-left">{t(`FAQ.q${i}`)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {t(`FAQ.a${i}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>


        {/* Partners Section */}
        <section className="py-24 px-4 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-12">{t("Partners.title")}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-40">
              {["Visa", "Mastercard", "Stripe", "Binance Pay", "Coinbase", "Metamask"].map((partner) => (
                <div key={partner} className="text-xl font-black text-white hover:opacity-100 hover:text-primary transition-all cursor-crosshair grayscale hover:grayscale-0">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4 relative text-center">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white">{t("CTA.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("CTA.subtitle")}</p>
            <div className="flex justify-center pt-8">
              <Link href="/register">
                <GradientButton className="px-10 py-6 text-xl shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 transition-transform duration-300">
                  {t("CTA.btn")}
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shared */}
      <LandingFooter />
    </div>
  );
}

function P2PPreview({ t, formatCurrency, mounted }: { t: any, formatCurrency: any, mounted: boolean }) {
  const ads = useP2PStore((state: any) => state.ads);
  const displayAds = ads.filter((ad: any) => ad.coin === "USDT" && ad.type === "SELL").slice(0, 3);

  return (
    <GlassCard className="p-2 border-white/10 shadow-2xl shadow-blue-900/40 rotate-1 hover:rotate-0 transition-transform duration-500">
      <div className="bg-background rounded-lg border border-white/5 overflow-hidden">
        <div className="bg-black/60 p-4 border-b border-white/5 flex justify-between items-center">
          <span className="font-bold text-sm text-white">{t("P2P.buy_usdt")}</span>
          <span className="text-xs text-muted-foreground">{t("P2P.amount")}: {mounted ? formatCurrency(1000) : "$1,000.00"}</span>
        </div>
        <div className="p-0">
          {displayAds.length > 0 ? displayAds.map((ad: any, i: number) => (
            <div key={ad.id} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {ad.traderName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{ad.traderName}</p>
                  <p className="text-xs text-muted-foreground">{ad.price} {ad.currency} / {ad.coin}</p>
                </div>
              </div>
              <Link href="/register">
                <button className="px-4 py-1.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">{t("Common.buy")}</button>
              </Link>
            </div>
          )) : (
            [1, 2, 3].map((_: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">T</div>
                  <div>
                    <p className="text-sm font-bold text-white">TraderPro</p>
                    <p className="text-xs text-muted-foreground">1.01 USDT / USD</p>
                  </div>
                </div>
                <Link href="/register">
                  <button className="px-4 py-1.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">{t("Common.buy")}</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </GlassCard>
  );
}
