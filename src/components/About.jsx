import React from 'react';
import { Download, Brain, Code2, Database } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Academic Year', val: 'Final Year (B.E.)' },
    { label: 'Projects Built', val: '12+ Completed' },
    { label: 'ML Model Precision', val: '95%+ Accuracy' },
    { label: 'Core Focus', val: 'NLP & Full-Stack' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            About Me
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            Bridging mathematical models and structural computational pipelines to build next-generation smart systems.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Glass Card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-secondary to-accent" />
              
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-6 flex items-center justify-center text-white font-black text-3xl shadow-lg">
                SN
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Sakshi Nagonde</h3>
              <p className="text-secondary font-semibold text-sm mb-6">AI & Machine Learning Student / Software Developer</p>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I design pipelines to preprocess massive data streams, train neural architectures, and integrate AI models into high-performance web systems. My passion lies at the intersection of deep learning algorithms and responsive React frontends.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider block">Branch</span>
                  <span className="text-white text-sm font-semibold">AI & Machine Learning</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wider block">Location</span>
                  <span className="text-white text-sm font-semibold">Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Metrics */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8">
            <h3 className="text-2xl font-bold text-white leading-tight">My Journey & Expertise</h3>
            
            <p className="text-slate-400 leading-relaxed text-base">
              During my academic journey in the **Artificial Intelligence & Machine Learning** branch, I have focused on the mathematical foundations of statistical learning and the architectural scale of modern databases. Over time, I discovered a love for creating beautiful, accessible, and fast frontends to expose these models to the world.
            </p>
            
            <p className="text-slate-400 leading-relaxed text-base">
              I aim to solve challenging, real-world problems in predictive modeling, computer vision, and NLP, utilizing production-grade frameworks like React, Next.js, PyTorch, and cloud platforms.
            </p>

            {/* Metrics List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full py-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-secondary font-extrabold text-lg sm:text-xl block mb-1">{stat.val}</span>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Resume button */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Resume download initiated (placeholder file).');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
