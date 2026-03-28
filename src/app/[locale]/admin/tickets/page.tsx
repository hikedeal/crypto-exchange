"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Filter, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useTicketStore, TicketStatus } from "@/store/useTicketStore";

export default function AdminTicketsPage() {
  const tickets = useTicketStore((state) => state.tickets);
  const toggleStoreStatus = useTicketStore((state) => state.toggleStatus);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const toggleStatus = (id: string, currentStatus: TicketStatus) => {
    toggleStoreStatus(id);
  };

  const filteredTickets = tickets.filter((ticket: any) => {
    const matchesSearch = 
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Support Tickets</h1>
          <p className="text-muted-foreground text-sm">Manage and resolve user contact inquiries.</p>
        </div>
        <div className="flex gap-3">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold flex items-center gap-2 text-sm shadow-xl shadow-orange-500/5">
            <AlertCircle className="h-4 w-4" />
            {tickets.filter(t => t.status === "Open").length} Open Tickets
          </div>
        </div>
      </div>

      <GlassCard className="p-4 sm:p-6 bg-white/[0.01]">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, email, subject, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-primary/50 transition-colors min-w-[140px]"
              >
                <option value="All" className="bg-[#050505]">All Status</option>
                <option value="Open" className="bg-[#050505]">Open</option>
                <option value="Closed" className="bg-[#050505]">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider rounded-tl-xl">Ticket ID</th>
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">User Info</th>
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider font-medium max-w-[200px]">Subject</th>
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-white/70 bg-white/5 px-2 py-1 rounded">{ticket.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white text-sm">{ticket.name}</span>
                      <span className="text-xs text-muted-foreground">{ticket.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/80">{ticket.category}</span>
                  </td>
                  <td className="px-4 py-4 max-w-[200px] truncate">
                    <span className="text-sm font-medium text-white group-hover:text-primary transition-colors cursor-pointer">{ticket.subject}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-xs text-muted-foreground">{ticket.date}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => toggleStatus(ticket.id, ticket.status)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors border border-white/5"
                    >
                      {ticket.status === 'Open' ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Mark Closed
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-3.5 w-3.5 text-orange-400" /> Re-open
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No tickets found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
