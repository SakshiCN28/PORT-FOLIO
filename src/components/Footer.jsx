import React from 'react';
import { Github, Linkedin, Twitter, Brain } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkSurface/90 border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand logo */}
        <a href="#hero" className="flex items-center gap-2 text-lg font-bold text-white">
          <Brain className="w-5 h-5 text-secondary" />
          <span>SAKSHI<span className="text-secondary">.AI</span></span>
        </a>

        {/* Copyright notice */}
        <p className="text-sm text-slate-500 text-center md:order-none">
          &copy; {currentYear} SakshiCN28. Artificial Intelligence & Machine Learning Developer. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-primary hover:bg-primary/5 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-accent hover:bg-accent/5 transition-all duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
