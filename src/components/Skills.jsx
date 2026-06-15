import React, { useEffect, useState } from 'react';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after component mounting
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-5 h-5 text-primary" />,
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 80 },
        { name: 'JavaScript / TypeScript', level: 88 },
        { name: 'HTML & CSS / Tailwind', level: 92 },
      ]
    },
    {
      title: 'Backend Systems',
      icon: <Server className="w-5 h-5 text-secondary" />,
      skills: [
        { name: 'Node.js', level: 82 },
        { name: 'Express', level: 85 },
        { name: 'Python Programming', level: 90 },
      ]
    },
    {
      title: 'Databases & Science',
      icon: <Database className="w-5 h-5 text-accent" />,
      skills: [
        { name: 'PostgreSQL / SQL', level: 85 },
        { name: 'MongoDB / NoSQL', level: 80 },
        { name: 'Data Wrangling (Pandas/NumPy)', level: 88 },
      ]
    },
    {
      title: 'AI Frameworks & DevOps',
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'PyTorch & TensorFlow', level: 82 },
        { name: 'Git & GitHub Workflows', level: 85 },
        { name: 'Docker & AWS', level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative bg-darkSurface/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Expertise & Skills
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            My cognitive stack of tools, frameworks, and technologies related to Web Engineering and AI Systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="glass-card rounded-2xl p-6 border border-white/5 shadow-md glass-card-hover"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skill Bars List */}
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-300">{skill.name}</span>
                      <span className="font-mono text-secondary text-xs">{skill.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: animate ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
