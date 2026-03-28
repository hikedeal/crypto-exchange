"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert,
  UserCheck,
  UserMinus,
  Mail,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useAdminStore } from "@/store/useAdminStore";

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const users = useAdminStore((state) => state.users);
  const updateUserStatus = useAdminStore((state) => state.updateUserStatus);
  const [mounted, setMounted] = useState(false);

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

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-12 lg:pl-0 pt-2 lg:pt-0">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor and manage all platform participants.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2 self-start sm:self-auto">
          <Mail className="h-4 w-4" />
          Broadcast Email
        </button>
      </div>

      <GlassCard className="border-white/5 bg-white/[0.01] overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search users by name, email, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors">
              <Filter className="h-3 w-3" />
              Filters
            </button>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-primary/40 text-white"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Banned</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Desktop Table - hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">KYC Level</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{user.name}</p>
                        <p className="text-[11px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-tighter px-2.5 py-1 rounded-full",
                      user.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      user.status === "Banned" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-white">Level {user.level}</td>
                  <td className="px-6 py-5 text-sm font-bold text-emerald-400">{user.balance}</td>
                  <td className="px-6 py-5 text-xs text-muted-foreground">{user.joined}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.status === "Active" ? (
                        <button onClick={() => updateUserStatus(user.id, "Banned")} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Ban User">
                          <UserMinus className="h-4 w-4" />
                        </button>
                      ) : (
                        <button onClick={() => updateUserStatus(user.id, "Active")} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Activate User">
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - shown only on mobile */}
        <div className="md:hidden divide-y divide-white/5">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-primary font-bold shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-none mb-1 truncate">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full",
                      user.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                      user.status === "Banned" ? "bg-red-500/10 text-red-400" :
                      "bg-yellow-500/10 text-yellow-400"
                    )}>{user.status}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">{user.balance}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {user.status === "Active" ? (
                  <button onClick={() => updateUserStatus(user.id, "Banned")} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <UserMinus className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={() => updateUserStatus(user.id, "Active")} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                    <UserCheck className="h-4 w-4" />
                  </button>
                )}
                <button className="p-2 rounded-lg bg-white/5 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing 5 of 12,845 users</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white disabled:opacity-30" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={cn(
                  "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                  p === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}>
                  {p}
                </button>
              ))}
              <span className="text-muted-foreground px-1">...</span>
            </div>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
