"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname, routing } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useCurrencyStore, type Currency } from "@/store/useCurrencyStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { flags, localeNames, currencies } from "@/lib/constants";

export function LandingFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();

  const handleLocaleChange = (newLocale: string) => {
    const cleanPath = pathname.replace(/^\/(en|hi|es|zh|ar|ru)(\/|$)/, '/') || '/';
    router.replace(cleanPath, { locale: newLocale as any });
  };

  const handleCurrencyChange = (newCurr: Currency) => {
    setCurrency(newCurr);
  };

  return (
    <footer className="w-full bg-background border-t border-white/5 pt-20 pb-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent tracking-tight block mb-4">
            CryptoP2P
          </span>
          <p className="text-sm text-muted-foreground pr-4 transition-opacity hover:opacity-100 opacity-80">{t("Footer.desc")}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">{t("MegaMenu.products")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/spot" className="hover:text-primary transition-colors">{t("MegaMenu.spot_title")}</Link></li>
            <li><Link href="/margin" className="hover:text-primary transition-colors">{t("MegaMenu.margin_title")}</Link></li>
            <li><Link href="/futures" className="hover:text-primary transition-colors">{t("MegaMenu.futures_title")}</Link></li>
            <li><Link href="/bot" className="hover:text-primary transition-colors">{t("MegaMenu.bot_title")}</Link></li>
            <li><Link href="/p2p" className="hover:text-primary transition-colors">{t("MegaMenu.p2p_title")}</Link></li>
            <li><Link href="/arbitrage" className="hover:text-primary transition-colors">{t("MegaMenu.arbitrage_title")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">{t("Footer.platform")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/p2p" className="hover:text-primary transition-colors">{t("Footer.p2p")}</Link></li>
            <li><Link href="/#market" className="hover:text-primary transition-colors">{t("Footer.wallet")}</Link></li>
            <li><Link href="/#features" className="hover:text-primary transition-colors">{t("Footer.vip")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">{t("Footer.support")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/help" className="hover:text-primary transition-colors">{t("Footer.help")}</Link></li>
            <li><Link href="/tickets" className="hover:text-primary transition-colors">{t("Footer.ticket")}</Link></li>
            <li><Link href="/fees" className="hover:text-primary transition-colors">{t("Footer.fees")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">{t("Footer.legal")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/terms" className="hover:text-primary transition-colors">{t("Footer.terms")}</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">{t("Footer.privacy")}</Link></li>
            <li><Link href="/kyc" className="hover:text-primary transition-colors">{t("Footer.kyc")}</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           {/* Language Switcher */}
           <DropdownMenu>
              <DropdownMenuTrigger className="h-8 gap-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center text-sm font-medium text-white">
                <span className="text-base leading-none">{flags[locale]}</span>
                <span className="uppercase">{locale}</span>
                <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40 bg-black/90 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl">
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
              <DropdownMenuTrigger className="h-8 gap-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center text-sm font-bold text-white">
                <span>{currency}</span>
                <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32 bg-black/90 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl">
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

        <div className="text-sm text-muted-foreground/50 text-center md:text-right">
          &copy; {new Date().getFullYear()} CryptoP2P Exchange. {t("Footer.rights")}
        </div>
      </div>
    </footer>
  );
}
