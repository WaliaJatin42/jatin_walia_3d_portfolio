import React from 'react';
import { FolderGit2, Sparkles, Check } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../shadcn/Card';
import { Badge } from '../shadcn/Badge';

export const ProjectsSection = () => {
  const { accent } = useTheme();

  return (
    <section id="projects" className="py-24 relative z-20 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="gap-2 px-3 py-1">
            <FolderGit2 size={14} />
            <span>FEATURED IMPACT</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Key Engineering Projects
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
            Scalable production systems built with React.js, Next.js, Stripe, Razorpay, Node.js, and MongoDB.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <Card
              key={project.id}
              onMouseEnter={() => audio.playHover()}
              className="p-8 space-y-6 flex flex-col justify-between hover:scale-[1.01] hover:border-cyan-500/50 group relative overflow-hidden"
            >
              {/* Subtle Gradient Glow Backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`}></div>

              <div className="relative z-10 space-y-4">
                {/* Category & Featured Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: accent.hex }}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <Badge variant="cyan" className="gap-1 shadow-md">
                      <Sparkles size={12} />
                      <span>FEATURED</span>
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:opacity-90 transition-opacity">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Highlight Box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100/90 border border-slate-800 light:border-slate-300 text-xs font-mono leading-relaxed space-y-1">
                  <span className="text-[10px] font-bold block uppercase tracking-wide opacity-80" style={{ color: accent.hex }}>
                    ENGINEERING IMPACT
                  </span>
                  <p className="text-slate-200 dark:text-slate-200 light:text-slate-800">{project.impact}</p>
                </div>

                {/* Key Features List */}
                <div className="space-y-2 pt-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills & Footer */}
              <div className="relative z-10 pt-4 border-t border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech, idx) => (
                    <Badge key={idx} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
