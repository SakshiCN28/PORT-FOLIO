import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Hero Copywriting */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-secondary mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Available for AI R&D & Full-Stack Projects</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Hi, I'm <span className="text-gradient-primary">Sakshi</span>.<br />
            Shaping the Future <br />
            with <span className="text-gradient-cyber">AI & Web Tech.</span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Developing advanced machine learning architectures, designing visual data pipelines, and engineering high-performance responsive web applications. Specializing in AI & Machine Learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="bg-gradient-btn text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 transition-all duration-300 bg-gradient-btn-hover group"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Hero Visual Avatar */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            
            {/* Spinning decorative orbits */}
            <div className="absolute w-[95%] h-[95%] border border-dashed border-white/10 rounded-full animate-orbit-1" />
            <div className="absolute w-[80%] h-[80%] border border-dashed border-white/10 rounded-full animate-orbit-2" />
            <div className="absolute w-[65%] h-[65%] border border-dashed border-white/15 rounded-full animate-orbit-3" />
            
            {/* Ambient core light */}
            <div className="absolute w-44 h-44 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />

            {/* Glowing avatar frame */}
            <div className="relative w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-primary to-secondary p-[3px] shadow-[0_0_50px_rgba(139,92,246,0.25)] animate-heartbeat overflow-hidden">
              <div className="w-full h-full rounded-full bg-darkBg overflow-hidden">
                <img
                  src="/developer-avatar.png"
                  alt="Sakshi Nagonde"
                  className="w-full h-full object-cover scale-105"
                  onError={(e) => {
                    // Fallback to visual icon if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 items-center justify-center">
                  <Terminal className="w-12 h-12 text-slate-300" />
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
