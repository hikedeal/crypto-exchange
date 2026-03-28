"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Wallet,
  History,
  ListOrdered,
  User,
  Shield,
  LogOut,
  Menu,
  X,
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

// Shared sidebar content used by both desktop and mobile versions
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 items-center px-6 border-b border-white/5">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent tracking-tight">
          CryptoP2P
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all group",
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
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-card/50 backdrop-blur-xl transition-transform hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Hamburger Button - shown in top-left on mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all lg:hidden shadow-lg"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99998] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[300px] z-[99999] lg:hidden flex flex-col border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: "#0a0b12",
                height: "100dvh",
              }}
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
