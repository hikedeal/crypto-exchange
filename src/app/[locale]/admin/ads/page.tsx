"use client";

import { useState, useEffect } from "react";
import { useP2PStore } from "@/store/useP2PStore";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink,
  Wallet as WalletIcon,
  ShieldCheck,
  MoreVertical,
  Edit,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { P2PAd } from "@/lib/mockData";

export default function AdminAdsPage() {
  const { ads, deleteAd, toggleAdStatus, updateAd } = useP2PStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingAd, setEditingAd] = useState<P2PAd | null>(null);
  const [editForm, setEditForm] = useState<Partial<P2PAd>>({});

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

  const filteredAds = ads.filter(ad => 
    ad.traderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditOpen = (ad: P2PAd) => {
    setEditingAd(ad);
    setEditForm(ad);
  };

  const handleSaveEdit = () => {
    if (editingAd) {
      updateAd(editingAd.id, editForm);
      setEditingAd(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            Manage Advertisements
          </h1>
          <p className="text-muted-foreground">Monitor and manage all user-posted P2P trade advertisements.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by trader, coin or wallet..." 
              className="bg-white/5 border-white/10 pl-10 w-80 rounded-xl focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Ads</p>
              <p className="text-2xl font-bold text-white">{ads.length}</p>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verified Sellers</p>
              <p className="text-2xl font-bold text-white">
                {ads.filter(ad => ad.completionRate > 95).length}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
              <LogOut className="h-6 w-6 rotate-180" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Coins</p>
              <p className="text-2xl font-bold text-white">
                {new Set(ads.map(ad => ad.coin)).size}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Table Section */}
      <GlassCard className="overflow-hidden border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">Trader</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">Asset / Type</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">Price details</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">Wallet Address</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">Commission</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold border border-white/10">
                        {ad.traderName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{ad.traderName}</p>
                        <p className="text-xs text-muted-foreground">{ad.tradesCompleted} trades • {ad.completionRate}% rate</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{ad.coin}</span>
                        <Badge variant="outline" className={cn(
                          "text-[10px] py-0",
                          ad.type === "BUY" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-rose-400 bg-rose-400/10 border-rose-400/20"
                        )}>
                          {ad.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Available: {ad.available.toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-white">${ad.price.toLocaleString()}</p>
                      <Badge variant="outline" className="w-fit text-[9px] py-0 border-white/10 text-muted-foreground">
                        {ad.pricingType} {ad.marketMarkup ? `(+${ad.marketMarkup}%)` : ""}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 group/wallet">
                      <div className="p-1.5 rounded-md bg-white/5 border border-white/5">
                        <WalletIcon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[120px]" title={ad.walletAddress}>
                        {ad.walletAddress}
                      </span>
                      <button className="opacity-0 group-hover/wallet:opacity-100 transition-opacity p-1 hover:text-white transition-colors">
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-emerald-400">{ad.commissionPercentage}%</p>
                  </td>
                    <div className="flex items-center justify-end gap-2 text-right">
                      <button 
                        onClick={() => toggleAdStatus(ad.id)}
                        className={cn(
                          "p-2 rounded-lg border transition-all",
                          ad.isActive 
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20" 
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        )}
                        title={ad.isActive ? "Pause Ad" : "Activate Ad"}
                      >
                        {ad.isActive ? <div className="h-4 w-4 border-2 border-current rounded-full" /> : <TrendingUp className="h-4 w-4" />}
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-white/10 text-white">
                          <DropdownMenuItem onClick={() => handleEditOpen(ad)} className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                            <Edit className="h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleAdStatus(ad.id)} className="flex items-center gap-2 cursor-pointer hover:bg-white/10">
                            {ad.isActive ? <div className="h-3.5 w-3.5 border-2 border-current rounded-full" /> : <TrendingUp className="h-4 w-4" />}
                            {ad.isActive ? "Pause Ad" : "Activate Ad"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5" />
                          <DropdownMenuItem 
                            onClick={() => deleteAd(ad.id)}
                            className="flex items-center gap-2 cursor-pointer text-rose-400 hover:bg-rose-500/10"
                          >
                            <Trash2 className="h-4 w-4" /> Delete Ad
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                </tr>
              ))}
              {filteredAds.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Megaphone className="h-8 w-8 text-muted-foreground/20" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-white">No advertisements found</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Edit Ad Modal */}
      <Dialog open={!!editingAd} onOpenChange={(open) => !open && setEditingAd(null)}>
        <DialogContent className="bg-gray-900 border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Edit Advertisement Details
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ({editingAd?.currency})</Label>
                <Input 
                  id="price" 
                  type="number"
                  step="0.001"
                  value={editForm.price || ""}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission">Commission (%)</Label>
                <Input 
                  id="commission" 
                  type="number"
                  step="0.1"
                  value={editForm.commissionPercentage || ""}
                  onChange={(e) => setEditForm({ ...editForm, commissionPercentage: parseFloat(e.target.value) })}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="available">Available Supply</Label>
              <Input 
                id="available" 
                type="number"
                value={editForm.available || ""}
                onChange={(e) => setEditForm({ ...editForm, available: parseFloat(e.target.value) })}
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min">Min Limit ($)</Label>
                <Input 
                  id="min" 
                  type="number"
                  value={editForm.limitMin || ""}
                  onChange={(e) => setEditForm({ ...editForm, limitMin: parseFloat(e.target.value) })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Limit ($)</Label>
                <Input 
                  id="max" 
                  type="number"
                  value={editForm.limitMax || ""}
                  onChange={(e) => setEditForm({ ...editForm, limitMax: parseFloat(e.target.value) })}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Payment Instructions (Auto-Reply)</Label>
              <textarea 
                id="instructions"
                rows={3}
                value={editForm.paymentInstructions || ""}
                onChange={(e) => setEditForm({ ...editForm, paymentInstructions: e.target.value })}
                className="w-full rounded-md bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
                placeholder="Enter trading terms..."
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setEditingAd(null)} className="text-muted-foreground hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90 text-white px-8">
              <CheckCircle2 className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reuse Icon from lucide-react but it needs to be imported
import { LogOut } from "lucide-react";
