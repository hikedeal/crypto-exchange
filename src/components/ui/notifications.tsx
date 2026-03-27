"use client";

import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export function Notifications() {
  const { user, clearNotifications } = useUserStore();
  
  if (!user || user.notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full animate-in fade-in slide-in-from-right-8 duration-500">
      {user.notifications.map((notif) => (
        <div 
          key={notif.id}
          className={cn(
            "p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex gap-3 group relative overflow-hidden",
            notif.type === "success" ? "bg-emerald-500/10 border-emerald-500/20" :
            notif.type === "error" ? "bg-rose-500/10 border-rose-500/20" :
            "bg-blue-500/10 border-blue-500/20"
          )}
        >
          <div className={cn(
            "shrink-0",
            notif.type === "success" ? "text-emerald-400" :
            notif.type === "error" ? "text-rose-400" :
            "text-blue-400"
          )}>
            {notif.type === "success" ? <CheckCircle2 className="h-5 w-5" /> :
             notif.type === "error" ? <AlertCircle className="h-5 w-5" /> :
             <Info className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white mb-1">{notif.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
          </div>
          <button 
            onClick={clearNotifications}
            className="shrink-0 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* Animated progress bar for auto-clear feel */}
          <div className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-current opacity-20 animate-[progress_5s_linear]",
            notif.type === "success" ? "text-emerald-400" :
            notif.type === "error" ? "text-rose-400" :
            "text-blue-400"
          )} style={{ width: '100%' }} />
        </div>
      ))}
    </div>
  );
}
