import React from 'react';
import { Calendar, Briefcase, Award } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'AI Developer Intern',
      company: 'Neural Dynamics Research',
      duration: 'Jun 2025 - Present',
      achievements: [
        'Developed automation scripts in Python to preprocess large structured CSV/JSON telemetry databases.',
        'Accelerated deep CNN model training setups by optimizing validation dataset loaders in PyTorch.',
        'Collaborated with frontend teams to link model inferences with React dashboards via WebSocket feeds.',
      ]
    },
    {
      role: 'Data Analyst Assistant',
      company: 'Departmental Data Science Lab',
      duration: 'Oct 2024 - Apr 2025',
      achievements: [
        'Cleaned, structured, and loaded over 50,000+ data records using Pandas and PostgreSQL.',
        'Constructed custom visual analytics charts in Tableau and Matplotlib for research publications.',
        'Wrote complex SQL subqueries to reduce data extraction request latencies by 20%.'
      ]
    },
    {
      role: 'Open-Source Contributor',
      company: 'GitHub Machine Learning Community',
      duration: 'Jan 2024 - Sep 2024',
      achievements: [
        'Contributed modular React components to open-source model visualization dashboards.',
        'Refactored documentation scripts and translated neural networking code tutorials for beginners.',
        'Fixed critical responsive UI rendering issues in web interfaces on mobile browsers.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Professional Experience
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            A chronological timeline of my technical internships, contributions, and lab research.
          </p>
        </div>

        {/* Timeline Column */}
        <div className="max-w-3xl mx-auto relative border-l border-white/10 pl-6 sm:pl-8">
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative mb-12 last:mb-0 group">
              
              {/* Chronological bullet marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-secondary border border-darkBg shadow-[0_0_10px_rgba(6,182,212,0.7)] group-hover:scale-125 transition-transform duration-300" />
              
              {/* Event Container */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 shadow-sm hover:border-white/10 transition-all duration-300">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-secondary font-semibold mt-0.5">{exp.company}</div>
                  </div>
                  
                  {/* Calendar Duration */}
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="flex flex-col gap-2.5">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                      <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
