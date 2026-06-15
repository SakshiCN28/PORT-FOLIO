import React, { useState, useEffect } from 'react';
import { Brain, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Playground', href: '#playground' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky style
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll spy logic
      const scrollPosition = window.scrollY + 200;
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand logo */}
        <a href="#hero" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
          <Brain className="w-6 h-6 text-secondary animate-pulse" />
          <span>SAKSHI<span className="text-secondary">.AI</span></span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium relative py-1 transition-colors duration-200 hover:text-white ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0'}`} />
              </a>
            );
          })}
        </nav>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer menu */}
      <div className={`md:hidden absolute top-full left-0 w-full glass-nav transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen border-b border-white/10 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
        <nav className="flex flex-col px-6 gap-4">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold py-2 transition-colors border-l-2 pl-3 ${isActive ? 'border-primary text-white bg-primary/5' : 'border-transparent text-slate-400'}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
