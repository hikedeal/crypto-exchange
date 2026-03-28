"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { useP2PStore } from "@/store/useP2PStore";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const users = useAdminStore((state) => state.users);
  const orders = useP2PStore((state) => state.orders);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    { 
      label: "Total Users", 
      value: users.length.toLocaleString(), 
      change: "+12%", 
      isPositive: true, 
      icon: Users,
      color: "blue" as const
    },
    { 
      label: "24h Volume", 
      value: `$${orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString()}`, 
      change: "+8%", 
      isPositive: true, 
      icon: TrendingUp,
      color: "emerald" as const
    },
    { 
      label: "Active Trades", 
      value: orders.filter(o => o.status === "Pending" || o.status === "Paid").length.toString(), 
      change: "-2%", 
      isPositive: false, 
      icon: Activity,
      color: "purple" as const
    },
    { 
      label: "P2P Orders", 
      value: orders.length.toString(), 
      change: "+15%", 
      isPositive: true, 
      icon: DollarSign,
      color: "cyan" as const
    },
  ];

  const recentActivity = orders.slice(0, 4).map(o => ({
    id: o.id,
    user: o.traderName,
    action: `${o.type} ${o.coin}`,
    amount: `$${o.amount.toLocaleString()}`,
    time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-12 lg:pl-0 pt-2 lg:pt-0">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time platform performance and core metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
            Download Report
          </button>
          <button className="px-3 py-2 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden relative">
            <div className={cn(
              "absolute -right-4 -top-4 h-24 w-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12",
              stat.color === "blue" ? "text-blue-500" : 
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "purple" ? "text-purple-500" : "text-cyan-500"
            )}>
              <stat.icon className="h-full w-full" />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-3 rounded-xl",
                stat.color === "blue" ? "bg-blue-500/10 text-blue-400" : 
                stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
                stat.color === "purple" ? "bg-purple-500/10 text-purple-400" : "bg-cyan-500/10 text-cyan-400"
              )}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard className="border-white/5 bg-white/[0.01]">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white uppercase tracking-widest text-xs opacity-50">Global Activity Feed</h3>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div className="divide-y divide-white/5">
              {recentActivity.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:text-white transition-colors">
                      {item.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{item.amount}</p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white/[0.01] text-center">
              <button className="text-xs font-bold text-primary hover:underline">View All Activity</button>
            </div>
          </GlassCard>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-white/5 bg-white/[0.01]">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs opacity-50 mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Core Engine</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded">Stable</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-medium text-white">API Sync</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded">98ms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Database</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/20">
            <h4 className="text-sm font-bold text-white mb-2">Pro Administrator</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">You have access to all high-level platform tools and global settings.</p>
            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-primary/30">
              Platform Logs
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
