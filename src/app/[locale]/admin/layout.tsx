"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
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
  Megaphone
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent tracking-tighter group-hover:opacity-80 transition-opacity">
              ADMIN PANEL
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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

        <div className="p-4 mt-auto border-t border-white/5">
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-8">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search administration..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-[#050505]" />
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-white">Project Lead</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 border border-white/10 shadow-lg" />
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
