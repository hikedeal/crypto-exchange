"use client";

import { useState, useEffect, useRef } from "react";

import { useUserStore } from "@/store/useUserStore";
import { useCurrencyStore, type Currency } from "@/store/useCurrencyStore";
import { Bell, Search, ChevronDown, Coins, User, Shield, LogOut } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";

const flags: Record<string, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  es: "🇪🇸",
  zh: "🇨🇳",
  ar: "🇦🇪",
  ru: "🇷🇺",
};

const localeNames: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  zh: "Chinese",
  ar: "Arabic",
  ru: "Russian",
};

const currencies: Currency[] = ["USD", "EUR", "INR", "AED", "GBP", "CNY"];

export function TopNavbar() {
  const { user, clearNotifications, addNotification } = useUserStore();
  const { currency, setCurrency, formatCurrency } = useCurrencyStore();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalBalanceUsd = user ? (
    user.balances.USDT + 
    user.balances.BTC * 65000 + 
    user.balances.ETH * 3500 + 
    user.balances.BNB * 600
  ) : 0;

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-background/80 px-6 backdrop-blur-xl lg:pl-10">

      <div className="hidden flex-1 lg:flex items-center gap-4 max-w-sm">
        <div className="relative w-full text-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search coins..."
            className="w-full h-8 bg-white/5 border-white/10 pl-9 text-xs focus-visible:ring-1 focus-visible:ring-primary/50"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNotification("Search", `No results found for "${(e.target as any).value}"`, "info");
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 gap-2 px-2 text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-lg transition-all flex items-center bg-transparent">
          <span className="text-base leading-none">{flags[locale]}</span>
          <span className="hidden sm:inline text-xs font-medium uppercase">{locale}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-background/95 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl">
            {routing.locales.map((loc) => (
              <DropdownMenuItem
                key={loc}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer"
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
          <DropdownMenuTrigger className="h-8 gap-2 px-2 text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 rounded-lg transition-all flex items-center bg-transparent">
          <Coins className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-bold">{currency}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 bg-background/95 border-white/10 backdrop-blur-xl rounded-xl p-1 shadow-2xl">
            {currencies.map((curr) => (
              <DropdownMenuItem
                key={curr}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer"
                onClick={() => setCurrency(curr)}
              >
                <span>{curr}</span>
                {currency === curr && <div className="h-1 w-1 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-white/10"></div>

        {user && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mb-1">
              {t("total_balance")}
            </span>
            <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mounted ? formatCurrency(totalBalanceUsd) : `$${totalBalanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg"
            onClick={clearNotifications}
          >
            <Bell className="h-4 w-4" />
            {(user?.notifications.length || 0) > 0 && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background"></span>
            )}
          </Button>

          {user && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 pl-2 sm:border-l border-white/5 cursor-pointer group outline-none bg-transparent"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white shadow-lg shadow-purple-500/20 text-xs ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block leading-tight text-left">
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter opacity-60">Pro</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden z-50">
                  <div className="px-3 py-2.5 border-b border-white/5">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <User className="h-4 w-4 text-primary" />
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/security"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Shield className="h-4 w-4 text-primary" />
                      Security
                    </Link>
                    <div className="h-px bg-white/5 my-1" />
                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
