"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter, routing } from "@/i18n/routing";
import { GradientButton } from "@/components/ui/gradient-button";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCurrencyStore, type Currency } from "@/store/useCurrencyStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { flags, localeNames, currencies } from "@/lib/constants";

export function LandingNavbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    // Robust cleanup: remove any of our supported locales from the start of the path
    const cleanPath = pathname.replace(/^\/(en|hi|es|zh|ar|ru)(\/|$)/, '/') || '/';
    router.replace(cleanPath, { locale: newLocale as any });
  };

  const handleCurrencyChange = (newCurr: Currency) => {
    setCurrency(newCurr);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent tracking-tight">
            CryptoP2P
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {/* Mega Menu */}
          <div className="relative group/mega">
            <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-primary transition-colors">
              {t("MegaMenu.products")}
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover/mega:rotate-180" />
            </button>
            
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-300 z-50">
              <div className="w-[600px] bg-background/95 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {/* Column 1 */}
                  <Link href="/spot" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.spot_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.spot_desc")}</span>
                  </Link>
                  {/* Column 2 */}
                  <Link href="/margin" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.margin_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.margin_desc")}</span>
                  </Link>
                  
                  <Link href="/futures" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.futures_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.futures_desc")}</span>
                  </Link>
                  <Link href="/bot" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.bot_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.bot_desc")}</span>
                  </Link>
                  
                  <Link href="/p2p" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.p2p_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.p2p_desc")}</span>
                  </Link>
                  <Link href="/arbitrage" className="group/item flex flex-col gap-1">
                    <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{t("MegaMenu.arbitrage_title")}</span>
                    <span className="text-xs text-muted-foreground">{t("MegaMenu.arbitrage_desc")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.features")}</Link>
          <Link href="/#p2p" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.p2p")}</Link>
          <Link href="/#market" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">{t("Navbar.market")}</Link>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-4 overflow-hidden">
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Language Switcher */}
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

            {/* Currency Switcher */}
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

          <Link href="/login" className="text-sm font-medium text-white hover:text-primary transition-colors hidden md:block shrink-0">{t("Navbar.login")}</Link>
          <Link href="/register" className="shrink-0">
            <GradientButton className="text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 h-8 sm:h-9">
              {t("Navbar.signup")}
            </GradientButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
