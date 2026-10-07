import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Send, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../shadcn/Card';
import { Button } from '../shadcn/Button';
import { Input } from '../shadcn/Input';
import { Textarea } from '../shadcn/Textarea';
import { Badge } from '../shadcn/Badge';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { accent } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text, type) => {
    audio.playClick();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    audio.playSuccess();
    setSubmitted(true);

    // Confetti celebration effect!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: [accent.hex, '#8a2be2', '#10b981', '#ffffff'],
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative z-20 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="gap-2 px-3 py-1">
            <Mail size={14} />
            <span>LET'S CONNECT</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
            Whether you have an exciting career opportunity, a project proposal, or just want to connect — feel free to reach out directly!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <Card
              onMouseEnter={() => audio.playHover()}
              className="p-6 flex items-center justify-between hover:border-cyan-500/40 group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 group-hover:scale-110 transition-transform" style={{ color: accent.hex }}>
                  <Phone size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block">PHONE / WHATSAPP</span>
                  <span className="text-base font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900">{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                title="Copy phone number"
              >
                {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </Button>
            </Card>

            {/* Email Card */}
            <Card
              onMouseEnter={() => audio.playHover()}
              className="p-6 flex items-center justify-between hover:border-cyan-500/40 group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-purple-400 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block">EMAIL ADDRESS</span>
                  <span className="text-base font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900">{PERSONAL_INFO.email}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                title="Copy email address"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </Button>
            </Card>

            {/* Location & LinkedIn Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5 space-y-1">
                <MapPin size={20} className="text-emerald-400 mb-2" />
                <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block">LOCATION</span>
                <span className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 block">{PERSONAL_INFO.location}</span>
              </Card>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick()}
              >
                <Card className="p-5 space-y-1 hover:border-cyan-500/40 hover:scale-105 transition-all group">
                  <Globe size={20} className="mb-2 group-hover:scale-110 transition-transform" style={{ color: accent.hex }} />
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block">LINKEDIN</span>
                  <span className="text-sm font-bold block" style={{ color: accent.hex }}>View Profile →</span>
                </Card>
              </a>
            </div>

          </div>

          {/* Contact Form Column */}
          <Card className="lg:col-span-7 p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-emerald-500/40 text-center space-y-3 animate-pulse">
                <Sparkles size={36} className="text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-300 dark:text-emerald-300 light:text-emerald-600">Message Delivered!</h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 font-mono">
                  Thank you for reaching out! Jatin will get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">Your Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">Your Email</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">Subject</label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Senior Frontend Role Opportunity"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">Message</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                  />
                </div>

                <Button type="submit" variant="neon" size="lg" className="w-full">
                  <Send size={16} />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </Card>

        </div>

      </div>
    </section>
  );
};
