"use client";

import { useState, useRef, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Wallet, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Megaphone,
  Menu,
  X
} from "lucide-react";
import { useTranslations } from "next-intl";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Advertisements", href: "/admin/ads", icon: Megaphone },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Wallets", href: "/admin/wallets", icon: Wallet },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminSidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo / Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent tracking-tighter group-hover:opacity-80 transition-opacity">
            ADMIN PANEL
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {adminNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                isActive 
                  ? "bg-primary/20 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
              {item.name}
              {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto border-t border-white/5">
        <Link 
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-white transition-colors rounded-xl hover:bg-white/5"
        >
          <LogOut className="h-5 w-5" />
          Exit Admin
        </Link>
      </div>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, clearNotifications } = useUserStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex-col z-50 fixed top-0 left-0 h-screen">
        <AdminSidebarContent />
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 left-4 z-50 flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all lg:hidden shadow-lg"
        aria-label="Open admin menu"
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
                backgroundColor: "#050505",
                height: "100dvh",
              }}
            >
              <AdminSidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden lg:pl-64">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 relative z-50">
          {/* Left side spacer on mobile for hamburger button */}
          <div className="lg:hidden w-12" />

          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search administration..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              className="relative p-2 text-muted-foreground hover:text-white transition-colors"
              onClick={clearNotifications}
            >
              <Bell className="h-5 w-5" />
              {(user?.notifications?.length || 0) > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-[#050505]" />
              )}
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-4 md:pl-6">
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 cursor-pointer group outline-none bg-transparent"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white">{user?.name || "Project Lead"}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Super Admin</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 border border-white/10 shadow-lg shrink-0 flex items-center justify-center font-bold text-white ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                    {(user?.name || "P").charAt(0)}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden z-50">
                    <div className="px-3 py-2.5 border-b border-white/5">
                      <p className="text-xs font-bold text-white">{user?.name || "Project Lead"}</p>
                      <p className="text-[10px] text-muted-foreground">{user?.email || "admin@example.com"}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/admin/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Settings className="h-4 w-4 text-primary" />
                        Settings
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
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
