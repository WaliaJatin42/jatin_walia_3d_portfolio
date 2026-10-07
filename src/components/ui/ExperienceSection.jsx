import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, ArrowUpDown } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { audio } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../shadcn/Card';
import { Badge } from '../shadcn/Badge';
import { Button } from '../shadcn/Button';

export const ExperienceSection = () => {
  const [isChronological, setIsChronological] = useState(false);
  const { accent } = useTheme();

  const toggleSortOrder = () => {
    audio.playClick();
    setIsChronological((prev) => !prev);
  };

  const displayedExperiences = isChronological
    ? [...EXPERIENCES].reverse()
    : EXPERIENCES;

  return (
    <section id="experience" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" className="neo-pill gap-2 px-3.5 py-1">
            <Briefcase size={14} />
            <span>CAREER TRAJECTORY</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Work Experience Timeline
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
            Detailed career timeline from initial entry at Mavizo to prior roles at Dynapt & Sarjen Systems, leading up to Senior Software Engineer I at Datacultr.
          </p>

          {/* Timeline Sort Order Toggle */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="neo-button h-9 px-4 text-xs font-mono gap-2 rounded-full shadow-md"
            >
              <ArrowUpDown size={14} style={{ color: accent.hex }} />
              <span>
                Order: {isChronological ? 'Career Entry → Current (Mavizo to Datacultr)' : 'Most Recent First (Datacultr to Mavizo)'}
              </span>
            </Button>
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-800/80 light:border-slate-300 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {displayedExperiences.map((exp) => {
            const isMavizo = exp.company.toLowerCase().includes('mavizo');
            const isDynapt = exp.company.toLowerCase().includes('dynapt');
            const isSarjen = exp.company.toLowerCase().includes('sarjen');

            return (
              <div
                key={exp.id}
                onMouseEnter={() => audio.playHover()}
                className="relative group"
              >
                {/* Timeline Node Point */}
                <div
                  className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-950 dark:bg-slate-950 light:bg-white border-2 flex items-center justify-center transition-transform group-hover:scale-125 shadow-md"
                  style={{ borderColor: exp.badgeColor || accent.hex }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: exp.badgeColor || accent.hex }}
                  ></div>
                </div>

                {/* Card Container */}
                <Card className="p-6 sm:p-8 space-y-6 hover:border-indigo-500/40 group-hover:scale-[1.01]">
                  
                  {/* Header Info */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 light:border-slate-200 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:opacity-90 transition-opacity">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <Badge variant="cyan" className="neo-pill text-[10px] animate-pulse">
                            CURRENT ROLE
                          </Badge>
                        )}
                        {isMavizo && (
                          <Badge variant="emerald" className="neo-pill text-[10px]">
                            FIRST PRIOR EXPERIENCE
                          </Badge>
                        )}
                        {isDynapt && (
                          <Badge variant="purple" className="neo-pill text-[10px]">
                            ENGINEERING ROLE
                          </Badge>
                        )}
                        {isSarjen && (
                          <Badge variant="amber" className="neo-pill text-[10px]">
                            PROJECT ROLE
                          </Badge>
                        )}
                      </div>
                      <div className="text-base font-semibold font-mono" style={{ color: exp.badgeColor || accent.hex }}>
                        {exp.company}
                      </div>
                    </div>

                    {/* Period & Location Badges */}
                    <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      <div className="flex items-center gap-1.5 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 px-3 py-1 rounded-lg border border-slate-800 light:border-slate-300">
                        <Calendar size={13} style={{ color: accent.hex }} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        <MapPin size={13} className="text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2.5">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        <ChevronRight size={16} className="shrink-0 mt-0.5" style={{ color: exp.badgeColor || accent.hex }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Tags */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {exp.skills.map((skill, idx) => (
                      <Badge key={idx} variant="default" className="neo-pill text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                </Card>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
