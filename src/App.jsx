import React from 'react';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Playground from './components/Playground';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <NeuralBackground />
      
      {/* Sticky Header Nav */}
      <Navbar />
      
      {/* Main Sections Layout */}
      <main className="max-w-7xl mx-auto px-6">
        <Hero />
        <About />
        <Skills />
        <Playground />
        <Projects />
        <Experience />
        <Education />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer Nav */}
      <Footer />
      
    </div>
  );
}

export default App;
