import React, { useState } from 'react';
import { Code, Layout, Server, Zap, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Tabs, TabsList, TabsTrigger } from '../shadcn/Tabs';
import { Card } from '../shadcn/Card';
import { Badge } from '../shadcn/Badge';

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { accent } = useTheme();

  const getIcon = (title) => {
    switch (title) {
      case 'Frontend Architecture':
        return <Code size={16} style={{ color: accent.hex }} />;
      case 'UI Design & Frameworks':
        return <Layout size={16} className="text-purple-400" />;
      case 'Backend & Databases':
        return <Server size={16} className="text-emerald-400" />;
      case 'Integrations & AI Workflows':
        return <Zap size={16} className="text-amber-400" />;
      default:
        return <Code size={16} style={{ color: accent.hex }} />;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-20 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="neo-pill gap-2 px-3.5 py-1">
            <Zap size={14} />
            <span>TECHNICAL CAPABILITIES</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Skills & Expertise Matrix
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
            Comprehensive tech stack spanning modern frontend frameworks, backend APIs, payment integrations, and AI tooling.
          </p>
        </div>

        {/* Perfectly Centered Category Tabs */}
        <div className="flex justify-center w-full">
          <Tabs value={String(activeCategory)} onValueChange={(val) => setActiveCategory(Number(val))}>
            <TabsList className="mx-auto flex flex-wrap items-center justify-center gap-1.5 h-auto p-1.5 rounded-full shadow-xl">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <TabsTrigger
                  key={idx}
                  value={String(idx)}
                  className="gap-2 text-xs"
                  activeStyle={{ color: accent.hex, borderColor: `${accent.hex}80` }}
                >
                  {getIcon(cat.title)}
                  <span>{cat.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {SKILL_CATEGORIES[activeCategory].skills.map((skill, idx) => (
            <Card
              key={idx}
              onMouseEnter={() => audio.playHover()}
              className="p-5 space-y-3 hover:scale-[1.01] hover:border-cyan-500/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    style={{ color: skill.highlight ? accent.hex : '#64748b' }}
                  />
                  <span className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <Badge variant="cyan" className="neo-pill text-[10px] py-0 px-2">
                      Core Stack
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: accent.hex }}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress Meter Bar */}
              <div className="h-2 w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-200 rounded-full overflow-hidden p-[1px] border border-slate-800 light:border-slate-300">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${accent.hex}, #3b82f6, #a855f7)`,
                  }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Technology Badges Cloud */}
        <div className="pt-8 text-center space-y-4 border-t border-slate-800/80 light:border-slate-200">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 block uppercase tracking-wider">
            ALL TECHNOLOGIES & TOOLS IN PRODUCTION
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              'React.js', 'Next.js', 'TypeScript', 'ES6 JavaScript', 'Node.js', 'Express.js',
              'REST APIs', 'MongoDB', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI',
              'Redux / Redux Toolkit', 'Stripe', 'Razorpay', 'Cursor AI', 'Google Project IDX',
              'Jira', 'Confluence', 'Responsive Design', 'Cross-Browser Support', 'Web Accessibility', 'Performance Optimization'
            ].map((tech, idx) => (
              <Badge
                key={idx}
                onMouseEnter={() => audio.playHover()}
                className="neo-pill px-3.5 py-1.5 cursor-default hover:scale-105 transition-transform"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
