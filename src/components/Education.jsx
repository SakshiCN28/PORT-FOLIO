import React from 'react';
import { GraduationCap, Award, Landmark } from 'lucide-react';

export default function Education() {
  const educationData = [
    {
      degree: 'B.E. in Artificial Intelligence & Data Science',
      institution: 'Visvesvaraya Technological University affiliated Institution',
      duration: '2023 - Present',
      desc: 'Acquiring foundational training in Neural Networks, Machine Learning, Statistical Inference, Database Administration, and Natural Language Processing.',
    },
    {
      degree: 'Deep Learning Specialization',
      institution: 'Coursera (DeepLearning.AI)',
      duration: 'Completed 2025',
      desc: 'Focused on deep neural network optimization, CNNs for computer vision tasks, RNNs/LSTMs for sequence generation, and structuring machine learning pipelines.',
    },
    {
      degree: 'Pre-University College (PCMC)',
      institution: 'State Pre-University Board',
      duration: '2021 - 2023',
      desc: 'Advanced mathematics, computer science (C++ foundations), physics, and chemistry coursework.',
    }
  ];

  return (
    <section id="education" className="py-24 relative bg-darkSurface/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Education & Learning
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            My academic qualifications, certifications, and structural learning specializations.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/5 shadow-md flex flex-col justify-between group glass-card-hover"
            >
              <div>
                {/* Header Icon */}
                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {idx === 1 ? <Award className="w-5 h-5 text-accent" /> : <GraduationCap className="w-5 h-5 text-secondary" />}
                </div>

                {/* Duration */}
                <span className="text-xs font-mono font-semibold text-secondary block mb-2">{edu.duration}</span>

                {/* Degree title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-semibold">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{edu.institution}</span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {edu.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
