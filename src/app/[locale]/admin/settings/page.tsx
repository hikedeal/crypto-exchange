"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Settings, 
  Globe, 
  Shield, 
  Paintbrush, 
  Save, 
  BellRing,
  Languages,
  Database,
  Cloud,
  ChevronRight,
  ShieldCheck,
  Lock,
  Mail,
  Key
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/store/useAdminStore";

const settingCategories = [
  { id: "general", label: "General Settings", icon: Settings, desc: "Global system parameters and site identity" },
  { id: "cms", label: "Content Management", icon: Paintbrush, desc: "Hero text, testimonials, and FAQ editor" },
  { id: "security", label: "Security & Access", icon: Shield, desc: "API keys, rate limits, and admin roles" },
  { id: "intl", label: "Internationalization", icon: Languages, desc: "Manage supported locales and currencies" },
  { id: "infra", label: "Infrastructure", icon: Database, desc: "Database sync and cloud storage status" },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("cms");
  const cms = useAdminStore((state) => state.cms);
  const settings = useAdminStore((state) => state.settings);
  const updateHero = useAdminStore((state) => state.updateHero);
  const updateCMS = useAdminStore((state) => state.updateCMS);
  const updateSettings = useAdminStore((state) => state.updateSettings);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-1">Configure global parameters and platform content.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-3">
          {settingCategories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all group",
                activeTab === cat.id 
                  ? "bg-primary/10 border-primary/20 text-white" 
                  : "bg-white/[0.01] border-white/5 text-muted-foreground hover:bg-white/[0.03] hover:text-white"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-xl border transition-colors",
                activeTab === cat.id ? "bg-primary text-white border-white/10" : "bg-white/5 border-white/10 group-hover:border-white/20"
              )}>
                <cat.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{cat.label}</p>
                <p className="text-[10px] opacity-60 leading-tight mt-0.5">{cat.desc}</p>
              </div>
              <ChevronRight className={cn("h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity", activeTab === cat.id && "opacity-100")} />
            </button>
          ))}
        </div>

        {/* Setting Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "cms" && (
            <>
              <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <Paintbrush className="h-5 w-5 text-primary" />
                  Hero Section Editor
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Main Headline</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 min-h-[100px]"
                      value={cms.hero.headline}
                      onChange={(e) => updateHero({ headline: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Subtitle Description</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 min-h-[80px]"
                      value={cms.hero.subtitle}
                      onChange={(e) => updateHero({ subtitle: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Primary CTA</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" 
                        value={cms.hero.ctaPrimary} 
                        onChange={(e) => updateHero({ ctaPrimary: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Secondary CTA</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" 
                        value={cms.hero.ctaSecondary} 
                        onChange={(e) => updateHero({ ctaSecondary: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <BellRing className="h-5 w-5 text-primary" />
                  Promotion Badge
                </h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">Active Promotion</p>
                      <input 
                        className="w-full bg-transparent border-none text-xs text-muted-foreground focus:outline-none mt-1"
                        value={cms.promotion.text}
                        onChange={(e) => updateCMS({ promotion: { text: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </>
          )}

          {activeTab === "general" && (
            <GlassCard className="p-8 border-white/5 bg-white/[0.01] space-y-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                Global Parameters
              </h3>
              
              <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Maintenance Mode</p>
                  <p className="text-xs text-muted-foreground italic">Disable public access to the marketplace for system upgrades.</p>
                </div>
                <button 
                  onClick={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative border",
                    settings.maintenanceMode ? "bg-primary border-primary" : "bg-white/10 border-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all",
                    settings.maintenanceMode ? "left-[26px]" : "left-0.5"
                  )} />
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50" 
                      value={settings.supportEmail}
                      onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "security" && (
            <GlassCard className="p-8 border-white/5 bg-white/[0.01] space-y-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                Security & Access Control
              </h3>

              <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Force 2FA for Admins</p>
                  <p className="text-xs text-muted-foreground italic">Require Google Authenticator for all staff logins.</p>
                </div>
                <button 
                  onClick={() => updateSettings({ twoFactorRequired: !settings.twoFactorRequired })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative border",
                    settings.twoFactorRequired ? "bg-emerald-500 border-emerald-500" : "bg-white/10 border-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all",
                    settings.twoFactorRequired ? "left-[26px]" : "left-0.5"
                  )} />
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Master API Key</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 font-mono" 
                      value={settings.apiKey}
                      onChange={(e) => updateSettings({ apiKey: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 bg-emerald-500/[0.03] border-emerald-500/10">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="h-5 w-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Auto-Deployment</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">Content changes are automatically synced to production servers upon saving.</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Live Connection</span>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 bg-blue-500/[0.03] border-blue-500/10">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-blue-400" />
                <h4 className="text-sm font-bold text-white">Cache Purge</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">Purge edge network cache to force immediate content updates globally.</p>
              <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-blue-400/20 px-3 py-1.5 rounded-lg hover:bg-blue-400/10 transition-colors">
                Purge Vercel CDN
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
