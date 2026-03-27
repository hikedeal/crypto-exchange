"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { useUserStore } from "@/store/useUserStore";

export default function RegisterPage() {
  const router = useRouter();
  const addUser = useAdminStore((state) => state.addUser);
  const login = useUserStore((state) => state.login);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const newUserId = `u_${Math.random().toString(36).substring(7)}`;
    const now = new Date().toISOString().split('T')[0];

    // 1. Save to Admin "Database"
    const joinedDate = new Date().toISOString().split('T')[0];
    console.log(`Registering new user: ${email} at ${joinedDate}`);
    
    addUser({
      id: newUserId,
      name,
      email,
      status: "Active",
      level: 1,
      balance: "$0",
      joined: joinedDate,
    });

    // 2. Login the current session
    login({
      id: newUserId,
      name,
      email,
      phone: "",
      country: "United States",
      balances: { USDT: 0, BTC: 0, ETH: 0, BNB: 0 },
      notifications: [],
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent tracking-tight">
              CryptoP2P
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create an Account</h1>
          <p className="text-muted-foreground">Join the fastest growing P2P crypto exchange.</p>
        </div>

        <GlassCard className="p-8 border-white/10 shadow-2xl shadow-indigo-900/20">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="text" placeholder="John Doe"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="email" placeholder="you@example.com"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="password" placeholder="••••••••"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  required type="password" placeholder="••••••••"
                  className="bg-black/40 border-white/10 pl-10 text-white focus-visible:ring-primary/50" 
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input 
                required
                type="checkbox" 
                id="terms" 
                className="w-4 h-4 rounded border-white/10 bg-black/40 text-primary focus:ring-primary focus:ring-offset-background"
              />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                I agree to the <Link href="#" className="text-white hover:underline">Terms of Service</Link> and <Link href="#" className="text-white hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <div className="pt-4">
              <GradientButton type="submit" className="w-full py-6 flex justify-center items-center gap-2 text-lg">
                Register <ArrowRight className="h-5 w-5" />
              </GradientButton>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-white font-medium hover:text-primary transition-colors">
              Sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
