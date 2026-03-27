"use client";

import { useUserStore } from "@/store/useUserStore";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, KeyRound, CheckCircle2, History } from "lucide-react";
import { useState } from "react";

export default function SecurityPage() {
  const { user, is2FAEnabled, toggle2FA, addNotification } = useUserStore();
  const [passForm, setPassForm] = useState({ current: "", new: "", confirm: "" });
  const [updating, setUpdating] = useState(false);

  const handlePassChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) {
      addNotification("Error", "Passwords do not match.", "error");
      return;
    }
    setUpdating(true);
    setTimeout(() => {
      addNotification("Success", "Your password has been updated securely.", "success");
      setUpdating(false);
      setPassForm({ current: "", new: "", confirm: "" });
    }, 1500);
  };

  const loginHistory = [
    { id: 1, device: "MacBook Pro - Chrome", location: "New York, USA", ip: "192.168.1.1", time: "2 hours ago", status: "Current" },
    { id: 2, device: "iPhone 13 - Safari", location: "New York, USA", ip: "10.0.0.15", time: "Yesterday", status: "Success" },
    { id: 3, device: "Windows PC - Edge", location: "London, UK", ip: "45.22.11.89", time: "3 days ago", status: "Success" },
  ];

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security, 2FA, and active sessions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* KYC Status */}
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-white text-lg">Identity Verification (KYC)</h3>
              <p className="text-sm text-muted-foreground">Your identity has been verified. You can now trade up to $100,000 daily.</p>
              <div className="pt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Level 2
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 2FA Status */}
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-white text-lg">Two-Factor Auth (2FA)</h3>
              <p className="text-sm text-muted-foreground">Protect your account and transactions with an authenticator app.</p>
              <div className="pt-4 flex items-center justify-between">
                <span className={`text-sm font-medium ${is2FAEnabled ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {is2FAEnabled ? 'Enabled' : 'Not Configured'}
                </span>
                <button 
                  onClick={() => toggle2FA()}
                  className="px-4 py-2 text-sm font-semibold rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                  {is2FAEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Change Password */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <KeyRound className="h-5 w-5 text-purple-400" />
          <h3 className="font-semibold text-white text-lg">Change Password</h3>
        </div>
        
        <form className="space-y-4 max-w-md" onSubmit={handlePassChange}>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Current Password</Label>
            <Input 
              type="password" required 
              className="bg-black/40 border-white/10 text-white" 
              value={passForm.current}
              onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">New Password</Label>
            <Input 
              type="password" required 
              className="bg-black/40 border-white/10 text-white" 
              value={passForm.new}
              onChange={(e) => setPassForm({ ...passForm, new: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Confirm New Password</Label>
            <Input 
              type="password" required 
              className="bg-black/40 border-white/10 text-white" 
              value={passForm.confirm}
              onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
            />
          </div>
          <div className="pt-2">
            <GradientButton type="submit" className="w-full" disabled={updating}>
              {updating ? "Updating..." : "Update Password"}
            </GradientButton>
          </div>
        </form>
      </GlassCard>

      {/* Login History */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <History className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-white text-lg">Login History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-black/40 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Device / Browser</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loginHistory.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{log.device}</td>
                  <td className="px-6 py-4 text-muted-foreground">{log.location}</td>
                  <td className="px-6 py-4 text-muted-foreground">{log.ip}</td>
                  <td className="px-6 py-4 text-muted-foreground">{log.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                      log.status === "Current" 
                        ? "bg-primary/20 text-primary border-primary/30" 
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
