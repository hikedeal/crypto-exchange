"use client";

import { useState } from "react";
import { Send, MessageSquare, AlertCircle, LifeBuoy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";
import { useTicketStore } from "@/store/useTicketStore";

export default function SupportTicketPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const addTicket = useTicketStore((state) => state.addTicket);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const newId = `TKT-${Math.floor(Math.random() * 900000) + 100000}`;
    
    setTimeout(() => {
      setTicketId(newId);
      addTicket({
        id: newId,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        category: formData.get("category") as string,
        subject: formData.get("subject") as string,
        description: formData.get("message") as string,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col relative w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <LandingNavbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-20 w-full relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-primary mb-6 shadow-xl shadow-primary/10">
            <LifeBuoy className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Submit a Request
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Need help with your account, a transaction, or have a general inquiry? Fill out the form below and our support team will get back to you shortly.
          </p>
        </div>

        {isSubmitted ? (
          <GlassCard className="p-12 text-center border-emerald-500/20 bg-emerald-500/5">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
              <Send className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ticket Submitted Successfully</h2>
            <p className="text-muted-foreground mb-8">
              We've received your request. A support agent will review your ticket and respond via email within 24 hours. Your ticket ID is #{ticketId}.
            </p>
            <GradientButton onClick={() => setIsSubmitted(false)} className="px-8">
              Submit Another Request
            </GradientButton>
          </GlassCard>
        ) : (
          <GlassCard className="p-6 md:p-8 bg-black/40 border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Full Name</label>
                  <input 
                    id="name"
                    name="name"
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Email Address</label>
                  <input 
                    id="email"
                    name="email"
                    required
                    type="email" 
                    placeholder="Enter your registered email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-white/80">Issue Category</label>
                <div className="relative">
                  <select 
                    id="category"
                    name="category"
                    required
                    className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>Select an issue category</option>
                    <option value="account" className="bg-[#050505]">Account & Security</option>
                    <option value="deposit" className="bg-[#050505]">Deposits & Withdrawals</option>
                    <option value="trading" className="bg-[#050505]">Spot/Margin Trading</option>
                    <option value="p2p" className="bg-[#050505]">P2P Marketplace Dispute</option>
                    <option value="other" className="bg-[#050505]">Other Interruption</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
                <input 
                  id="subject"
                  name="subject"
                  required
                  type="text" 
                  placeholder="Brief summary of the issue"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Description</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Please describe your issue in detail. Include any relevant transaction IDs, error messages, or steps to reproduce the problem."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-y"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground hidden sm:flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  We respond to 95% of queries within 2 hours.
                </p>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "px-8 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="h-4 w-4" />
                      Submit Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </GlassCard>
        )}
      </main>
      
      <LandingFooter />
    </div>
  );
}
