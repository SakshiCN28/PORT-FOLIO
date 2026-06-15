import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Sakshi's ability to take complex machine learning datasets and hook them directly into our real-time React analytics dashboard was a game-changer for our collaborative project. Her attention to detail is outstanding.",
      author: "Sarah Jenkins",
      role: "Lead Project Manager, Neural Dynamics Labs"
    },
    {
      quote: "Her PostgreSQL database optimizations reduced our lookup queries bottlenecks by nearly 20%. She is a highly enthusiastic, fast-learning developer who communicates complex mathematical ideas clearly.",
      author: "David Chen",
      role: "Senior Data Scientist, Data Analytics Group"
    },
    {
      quote: "Sakshi has a rare combination of structural AI/Data Science understanding and visual frontend capability. She refactored our open-source neural dashboards, providing clean React components and fast layouts.",
      author: "Elena Rostova",
      role: "Open-Source Coordinator, GitHub ML Devs"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Testimonials
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            Feedback and recommendations from team leads, supervisors, and development collaborators.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/5 shadow-md flex flex-col justify-between relative group glass-card-hover"
            >
              
              {/* Quotation icon backdrop */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                
                {/* Text quote */}
                <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">
                  "{test.quote}"
                </p>

                {/* Author profile */}
                <div className="border-t border-white/5 pt-4">
                  <div className="font-bold text-white text-sm">
                    {test.author}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {test.role}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
