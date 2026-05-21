"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactModal({ isOpen, onClose, email }: ContactModalProps) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderEmail.trim() || !message.trim()) return;
    setStatus("sending");

    try {
      // Web3Forms – get your FREE access key at https://web3forms.com
      // Enter your email there, they send you a key, paste it in .env.local as:
      //   NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

      const formData = {
        access_key: accessKey,
        name,
        email: senderEmail,
        message,
        subject: `Portfolio Contact from ${name}`,
        from_name: "Uthkarsh Portfolio",
        // Redirect to your own email (fallback if no key set)
        replyto: senderEmail,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setSenderEmail("");
        setMessage("");
        // Auto-close after 3s on success
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const displayEmail = email || "uthkarshmandloi@gmail.com";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[501] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <div
              className="relative w-full max-w-2xl rounded-3xl border border-[var(--theme-text-color)]/10 shadow-2xl overflow-hidden"
              style={{ background: "var(--theme-card-bg)", backdropFilter: "blur(24px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient accent blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--theme-text-color)]/8 hover:bg-[var(--theme-text-color)]/15 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-color)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
                {/* Left: Form */}
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/12 border border-purple-400/20 text-purple-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                      Available for work
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[var(--theme-text-color)] font-sans tracking-tight leading-tight">
                      Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">talk</span>
                    </h2>
                    <p className="mt-2 text-sm text-[var(--theme-text-muted)] leading-relaxed">
                      Got a project in mind? I&apos;d love to hear about it. Fill the form and I&apos;ll get back to you promptly.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text-muted)] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Johnson"
                        required
                        disabled={status === "sending" || status === "success"}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--theme-text-color)]/5 border border-[var(--theme-text-color)]/10 text-[var(--theme-text-color)] text-sm placeholder-[var(--theme-text-muted)]/50 focus:outline-none focus:border-purple-400/50 focus:bg-purple-500/5 transition-all duration-200 disabled:opacity-50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text-muted)] mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@company.com"
                        required
                        disabled={status === "sending" || status === "success"}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--theme-text-color)]/5 border border-[var(--theme-text-color)]/10 text-[var(--theme-text-color)] text-sm placeholder-[var(--theme-text-muted)]/50 focus:outline-none focus:border-purple-400/50 focus:bg-purple-500/5 transition-all duration-200 disabled:opacity-50"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-text-muted)] mb-1.5">
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project, timeline, and budget..."
                        required
                        rows={4}
                        disabled={status === "sending" || status === "success"}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--theme-text-color)]/5 border border-[var(--theme-text-color)]/10 text-[var(--theme-text-color)] text-sm placeholder-[var(--theme-text-muted)]/50 focus:outline-none focus:border-purple-400/50 focus:bg-purple-500/5 transition-all duration-200 resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "sending" || status === "success"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl font-sans font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          status === "success"
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : status === "error"
                            ? "linear-gradient(135deg, #ef4444, #dc2626)"
                            : "linear-gradient(135deg, #a855f7, #3b82f6)",
                        color: "white",
                        boxShadow:
                          status === "success"
                            ? "0 8px 32px rgba(34,197,94,0.25)"
                            : status === "error"
                            ? "0 8px 32px rgba(239,68,68,0.25)"
                            : "0 8px 32px rgba(168,85,247,0.25)",
                      }}
                    >
                      {status === "idle" && (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 19-7z" />
                          </svg>
                          Send Message
                        </>
                      )}
                      {status === "sending" && (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                          Sending...
                        </>
                      )}
                      {status === "success" && (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Message Sent!
                        </>
                      )}
                      {status === "error" && (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                          </svg>
                          Failed – Try Again
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>

                {/* Right: Info panel */}
                <div className="hidden md:flex flex-col justify-between p-8 border-l border-[var(--theme-text-color)]/8 min-w-[200px] bg-[var(--theme-text-color)]/3">
                  {/* Animated envelope illustration */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28">
                      {/* Envelope body */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
                          <rect x="2" y="12" width="86" height="56" rx="6" fill="url(#envGrad)" />
                          <path d="M2 18l43 28 43-28" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                          <path d="M2 68l28-24M88 68L60 44" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
                          {/* Paper plane */}
                          <g transform="translate(52 2)">
                            <path d="M28 0L0 16l10 4 18-20z" fill="#a855f7" />
                            <path d="M10 20l2 10 6-8-8-2z" fill="#7c3aed" />
                          </g>
                          <defs>
                            <linearGradient id="envGrad" x1="0" y1="0" x2="90" y2="70" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#7c3aed" />
                              <stop offset="1" stopColor="#2563eb" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>

                      {/* Floating dots */}
                      {[
                        { cx: 10, cy: 10, r: 4, color: "#f59e0b", delay: 0 },
                        { cx: 110, cy: 20, r: 3, color: "#ec4899", delay: 0.5 },
                        { cx: 20, cy: 100, r: 3, color: "#22c55e", delay: 1 },
                        { cx: 105, cy: 90, r: 4, color: "#38bdf8", delay: 1.5 },
                      ].map((dot, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            width: dot.r * 2,
                            height: dot.r * 2,
                            background: dot.color,
                            left: dot.cx,
                            top: dot.cy,
                          }}
                          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] mb-1">Email</p>
                      <a
                        href={`mailto:${displayEmail}`}
                        className="text-xs font-sans text-[var(--theme-text-color)] hover:text-purple-400 transition-colors break-all"
                      >
                        {displayEmail}
                      </a>
                    </div>

                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] mb-1">Based in</p>
                      <p className="text-xs font-sans text-[var(--theme-text-color)]">Indore, India 🇮🇳</p>
                    </div>

                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] mb-2">Socials</p>
                      <div className="flex gap-2">
                        {[
                          { href: "https://github.com/UthkarshMandloi", label: "GitHub",
                            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                          },
                          { href: "https://linkedin.com/in/uthkarshmandloi", label: "LinkedIn",
                            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                          },
                          { href: "https://instagram.com/uthkarshmandloi", label: "Instagram",
                            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                          },
                        ].map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.label}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--theme-text-color)]/6 hover:bg-purple-500/20 text-[var(--theme-text-muted)] hover:text-purple-400 transition-all duration-200 border border-[var(--theme-text-color)]/8 hover:border-purple-400/30"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Response time badge */}
                  <div className="mt-6 px-3 py-2 rounded-xl bg-green-500/8 border border-green-400/15 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-green-400">
                      Usually replies within 24h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
