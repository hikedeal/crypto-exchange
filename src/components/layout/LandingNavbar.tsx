"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter, routing } from "@/i18n/routing";
import { GradientButton } from "@/components/ui/gradient-button";
import { 
  Menu, X, ChevronDown, ChevronRight, Globe, 
  Activity, TrendingUp, Clock, Cpu, Users, Repeat,
  ArrowRight
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCurrencyStore, type Currency } from "@/store/useCurrencyStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { flags, localeNames, currencies } from "@/lib/constants";

export function LandingNavbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleLocaleChange = (newLocale: string) => {
    const cleanPath = pathname.replace(/^\/(en|hi|es|zh|ar|ru)(\/|$)/, '/') || '/';
    router.replace(cleanPath, { locale: newLocale as any });
    setIsMobileMenuOpen(false);
  };

  const handleCurrencyChange = (newCurr: Currency) => {
    setCurrency(newCurr);
    setIsMobileMenuOpen(false);
  };

  const productLinks = [
    { title: t("MegaMenu.spot_title"), desc: t("MegaMenu.spot_desc"), href: "/spot", icon: Activity },
    { title: t("MegaMenu.margin_title"), desc: t("MegaMenu.margin_desc"), href: "/margin", icon: TrendingUp },
    { title: t("MegaMenu.futures_title"), desc: t("MegaMenu.futures_desc"), href: "/futures", icon: Clock },
    { title: t("MegaMenu.bot_title"), desc: t("MegaMenu.bot_desc"), href: "/bot", icon: Cpu },
    { title: t("MegaMenu.p2p_title"), desc: t("MegaMenu.p2p_desc"), href: "/p2p", icon: Users },
    { title: t("MegaMenu.arbitrage_title"), desc: t("MegaMenu.arbitrage_desc"), href: "/arbitrage", icon: Repeat },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent tracking-tight">
            CryptoP2P
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="relative group/mega">
            <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-primary transition-colors">
              {t("MegaMenu.products")}
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover/mega:rotate-180" />
            </button>
            
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-300 z-50">
              <div className="w-[600px] bg-background/95 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {productLinks.map((link) => (
                    <Link key={link.href} href={link.href as any} className="group/item flex flex-col gap-1">
                      <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{link.title}</span>
                      <span className="text-xs text-muted-foreground">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.features")}</Link>
          <Link href="/#p2p" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.p2p")}</Link>
          <Link href="/#market" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.market")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 sm:gap-4">
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="h-8 gap-1 md:gap-2 px-1.5 md:px-2 text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-lg transition-all flex items-center bg-transparent shrink-0">
                  <span className="text-sm md:text-base leading-none">{flags[locale]}</span>
                  <span className="text-[10px] md:text-xs font-medium uppercase hidden xs:inline">{locale}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-background/95 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl z-[100]">
                  {routing.locales.map((loc: string) => (
                    <DropdownMenuItem
                      key={loc}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer text-white"
                      onClick={() => handleLocaleChange(loc)}
                    >
                      <span className="text-lg">{flags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="h-8 gap-1 md:gap-2 px-1.5 md:px-2 text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-lg transition-all flex items-center bg-transparent shrink-0">
                  <span className="text-[10px] md:text-xs font-bold">{currency}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32 bg-background/95 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl z-[100]">
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer text-white"
                      onClick={() => handleCurrencyChange(curr)}
                    >
                      <span>{curr}</span>
                      {currency === curr && <div className="h-1 w-1 rounded-full bg-primary" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href="/login" className="text-sm font-medium text-white hover:text-primary transition-colors hidden lg:block shrink-0">{t("Navbar.login")}</Link>
            <Link href="/register" className="shrink-0 hidden xs:block lg:block">
              <GradientButton className="text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 h-8 sm:h-9">
                {t("Navbar.signup")}
              </GradientButton>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="flex items-center justify-center p-2 text-white hover:bg-white/5 rounded-lg transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

    </header>

    {/* High-Fidelity Mobile Drawer - Moved outside header for full-height coverage */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] lg:hidden"
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-[300px] xs:w-[340px] bg-[#0b0f19] z-[10000] lg:hidden shadow-2xl flex flex-col border-l border-white/10"
            style={{ height: '100dvh' }}
          >
            {/* Drawer Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-white/5 bg-[#0b0f19] shrink-0">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                CryptoP2P
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  {t("Navbar.menu") !== "Navbar.menu" ? t("Navbar.menu") : "Menu"}
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 bg-[#0b0f19]">
              {/* Products Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">{t("MegaMenu.products")}</h3>
                <div className="flex flex-col gap-2">
                  {productLinks.map((link) => {
                    const Icon = link.icon || Activity;
                    return (
                      <Link 
                        key={link.href} 
                        href={link.href as any} 
                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-primary group-hover:bg-primary/20 group-hover:border-primary/20 transition-all shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                            {link.title}
                          </span>
                          <span className="text-[11px] text-white/50 leading-tight mt-0.5 line-clamp-2">
                            {link.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Main Navigation */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Discover</h3>
                <div className="flex flex-col gap-1">
                  {[
                    { name: t("Navbar.features"), href: "/#features" },
                    { name: t("Navbar.p2p"), href: "/#p2p" },
                    { name: t("Navbar.market"), href: "/#market" },
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href as any}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm font-medium text-white/80 hover:text-white transition-all group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer - Fixed Bottom */}
            <div className="p-6 border-t border-white/5 bg-[#0b0f19] shrink-0">
              <Link 
                href="/login" 
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm hover:text-primary transition-all group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("Navbar.login")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/register" className="block mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                <GradientButton className="w-full py-6 rounded-xl text-sm font-bold shadow-lg shadow-primary/10">
                  {t("Navbar.signup")}
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
    </header>
  );
}
