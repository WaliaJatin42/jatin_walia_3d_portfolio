import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION_INFO } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../shadcn/Card';
import { Badge } from '../shadcn/Badge';

export const EducationSection = () => {
  const { accent } = useTheme();

  return (
    <section id="education" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="gap-2 px-3 py-1">
            <GraduationCap size={14} />
            <span>ACADEMIC FOUNDATION</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Education & Qualifications
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
            Formal engineering degree grounding technical expertise in algorithms, web development, and software architecture.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-3xl mx-auto">
          <Card
            onMouseEnter={() => audio.playHover()}
            className="p-8 space-y-6 hover:scale-[1.01] hover:border-cyan-500/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 light:border-slate-200 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {EDUCATION_INFO.degree}
                </h3>
                <p className="text-base font-semibold font-mono" style={{ color: accent.hex }}>
                  {EDUCATION_INFO.institution}
                </p>
              </div>

              <Badge variant="cyan" className="gap-2 px-3.5 py-1.5 text-xs">
                <Calendar size={14} />
                <span>{EDUCATION_INFO.year}</span>
              </Badge>
            </div>

            <div className="space-y-3">
              {EDUCATION_INFO.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accent.hex }} />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {['Computer Science', 'Data Structures', 'Web Engineering', 'Software Architecture', 'Algorithms'].map((item, idx) => (
                <Badge key={idx} variant="default" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>

          </Card>
        </div>

      </div>
    </section>
  );
};
