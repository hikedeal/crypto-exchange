"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useRouter } from "@/i18n/routing";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent tracking-tight">
              CryptoP2P
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your account to continue</p>
        </div>

        <GlassCard className="p-8 border-white/10 shadow-2xl shadow-blue-900/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="email" placeholder="you@example.com"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-muted-foreground">Password</Label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="password" placeholder="••••••••"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-white/10 bg-black/40 text-primary focus:ring-primary focus:ring-offset-background"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                Remember for 30 days
              </Label>
            </div>

            <GradientButton type="submit" className="w-full py-6 flex justify-center items-center gap-2 text-lg">
              Sign In <ArrowRight className="h-5 w-5" />
            </GradientButton>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" className="text-white font-medium hover:text-primary transition-colors">
              Create an account
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
