"use client";

import { useUserStore } from "@/store/useUserStore";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, addNotification } = useUserStore();
  
  const fallbackUser = {
    name: "Alex Trader",
    email: "alex@crypto.local",
    phone: "+1 234 567 8900",
    country: "United States"
  };

  const [formData, setFormData] = useState({
    name: user?.name || fallbackUser.name,
    email: user?.email || fallbackUser.email,
    phone: user?.phone || fallbackUser.phone,
    country: user?.country || fallbackUser.country,
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile(formData);
      addNotification("Profile Updated", "Your changes have been saved successfully.", "success");
      setSaving(false);
    }, 800);
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <GlassCard className="p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-purple-500/20">
            {(user?.name || fallbackUser.name).charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name || fallbackUser.name}</h2>
            <p className="text-muted-foreground">{user?.email || fallbackUser.email}</p>
            <div className="flex gap-2 mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Email Verified
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                KYC Verified
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground block">Full Name</Label>
              <Input 
                required 
                className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground block">Email Address</Label>
              <Input 
                required type="email"
                className="bg-black/40 border-white/10 text-muted-foreground cursor-not-allowed" 
                value={formData.email} disabled
              />
              <p className="text-[10px] text-muted-foreground/60 mt-1">Contact support to change email.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground block">Phone Number</Label>
              <Input 
                required type="tel"
                className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground block">Country / Region</Label>
              <Input 
                required
                className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white" 
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <GradientButton 
              type="submit" 
              disabled={saving}
              className="px-8 py-5 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Changes
                </>
              )}
            </GradientButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
