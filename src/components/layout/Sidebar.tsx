"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Wallet,
  History,
  ListOrdered,
  User,
  Shield,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/p2p", icon: ArrowRightLeft, label: "P2P Trading" },
  { href: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
  { href: "/dashboard/orders", icon: ListOrdered, label: "Orders" },
  { href: "/dashboard/history", icon: History, label: "History" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/security", icon: Shield, label: "Security" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-card/50 backdrop-blur-xl transition-transform hidden lg:flex flex-col">
      <div className="flex h-16 items-center px-6 border-b border-white/5">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent tracking-tight">
          CryptoP2P
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary/10 text-primary shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "group-hover:text-foreground"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
