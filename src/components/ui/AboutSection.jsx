import React from 'react';
import { User, Award, Users, Bot, CreditCard, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../shadcn/Card';
import { Badge } from '../shadcn/Badge';

export const AboutSection = () => {
  const { accent } = useTheme();

  const pillars = [
    {
      icon: <CreditCard style={{ color: accent.hex }} size={22} />,
      title: 'Payment Systems Leader',
      description: 'Integrated Stripe & Razorpay payment gateways for seamless, high-converting checkout flows at Datacultr.',
    },
    {
      icon: <Cpu className="text-emerald-400" size={22} />,
      title: '+30% Database Optimization',
      description: 'Optimized MongoDB aggregation pipelines & backend queries to dramatically reduce latency and boost data retrieval speed.',
    },
    {
      icon: <Bot className="text-purple-400" size={22} />,
      title: 'AI-Native Development',
      description: 'Early adopter of AI coding platforms Cursor & Google Project IDX to streamline code delivery and feature iteration.',
    },
    {
      icon: <Users className="text-amber-400" size={22} />,
      title: 'Mentorship & Leadership',
      description: 'Mentored junior engineers through rigorous code reviews, agile sprint management, and technical documentation on Jira/Confluence.',
    },
  ];

  return (
    <section id="about" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="gap-2 px-3 py-1">
            <User size={14} />
            <span>BACKGROUND & PILLARS</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Engineering Excellence at Scale
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base leading-relaxed">
            From leading frontend initiatives at Datacultr to engineering AI recommendation engines and enterprise planning suites.
          </p>
        </div>

        {/* Bio Box & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Bio Card */}
          <Card className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                <Award style={{ color: accent.hex }} size={22} />
                <h3>Professional Profile</h3>
              </div>
              <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-base leading-relaxed">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Key Fact Badges */}
            <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 grid grid-cols-2 gap-4">
              <div className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-2xl border border-slate-800 light:border-slate-300">
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 block font-mono">CURRENT ROLE</span>
                <span className="text-sm font-bold" style={{ color: accent.hex }}>Senior Software Engineer I</span>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 block">@ Datacultr</span>
              </div>
              <div className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3.5 rounded-2xl border border-slate-800 light:border-slate-300">
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 block font-mono">LOCATION</span>
                <span className="text-sm font-bold" style={{ color: accent.hex }}>{PERSONAL_INFO.location}</span>
                <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 block">India</span>
              </div>
            </div>
          </Card>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => (
              <Card
                key={idx}
                onMouseEnter={() => audio.playHover()}
                className="p-6 space-y-3 hover:scale-[1.02] hover:border-cyan-500/40 group cursor-default"
              >
                <div className="p-3 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:opacity-80 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
