import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Code, Brain, Cpu, Database, Network } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 'tumor-classifier',
      title: 'Neurolink Brain Tumor Classifier',
      category: 'ai-ml',
      categoryLabel: 'AI & Machine Learning',
      shortDesc: 'A convolutional neural network (CNN) model built with PyTorch to classify magnetic resonance imaging scans of brain structures with high accuracy.',
      longDesc: 'This project utilizes deep convolutional neural networks based on ResNet architectures to analyze magnetic resonance imaging scans. It is trained to perform semantic classification tasks to identify brain tumor locations and shapes. Standard preprocessing filters are implemented using NumPy and OpenCV to normalize MRI variations.',
      tech: ['PyTorch', 'ResNet-50', 'OpenCV', 'NumPy', 'Scikit-Learn'],
      icon: <Brain className="w-8 h-8 text-primary" />,
      glowColor: 'rgba(139, 92, 246, 0.4)',
      github: 'https://github.com/SakshiCN28/neurolink-mri',
      demo: '#',
    },
    {
      id: 'demand-forecast',
      title: 'Predictive Demand Forecast Engine',
      category: 'ai-ml',
      categoryLabel: 'AI & Machine Learning',
      shortDesc: 'Designed an analytical SQL engine coupled with a machine learning model to predict store supply inventory demand spikes up to 30 days in advance.',
      longDesc: 'Developed a robust time-series forecasting model to address supply chain storage inefficiencies. The algorithm leverages XGBoost and Facebook Prophet libraries to forecast stock requirements 30 days into the future. Incorporates automated Python ETL workers running on PostgreSQL.',
      tech: ['Python', 'XGBoost', 'Prophet', 'Pandas', 'PostgreSQL'],
      icon: <Database className="w-8 h-8 text-secondary" />,
      glowColor: 'rgba(6, 182, 212, 0.4)',
      github: 'https://github.com/SakshiCN28/demand-forecast',
      demo: '#',
    },
    {
      id: 'opinion-analytics',
      title: 'SentiNet: Opinion Analytics Tool',
      category: 'ai-ml',
      categoryLabel: 'AI & Machine Learning',
      shortDesc: 'Built a modular text-processing sentiment analytics tool, utilizing recurrent LSTM neural architectures to map feedback vectors on digital interfaces.',
      longDesc: 'Designed an advanced text-processing application that parses large feedback datasets. Using Long Short-Term Memory (LSTM) recurrent networks built on TensorFlow, SentiNet maps complex grammatical dependencies to evaluate semantic feedback vectors with a high precision matrix.',
      tech: ['TensorFlow', 'Keras', 'LSTM', 'NLTK', 'Flask'],
      icon: <Network className="w-8 h-8 text-accent" />,
      glowColor: 'rgba(236, 72, 153, 0.4)',
      github: 'https://github.com/SakshiCN28/sentinet-nlp',
      demo: '#',
    },
    {
      id: 'auto-car',
      title: 'Autonomous Navigation Car Model',
      category: 'ai-ml',
      categoryLabel: 'AI & Machine Learning',
      shortDesc: 'Developed an autonomous virtual agent modeled using Q-learning algorithms capable of successfully traversing dynamic procedural obstacle routes.',
      longDesc: 'A simulation study focusing on Reinforcement Learning (RL). The agent learns to traverse a complex maze path without collision. Constructed with a deep Q-learning algorithm that maps continuous coordinate inputs into localized direction decisions using canvas-based animation nodes.',
      tech: ['JavaScript', 'HTML5 Canvas', 'Q-Learning', 'Neural Approximation'],
      icon: <Cpu className="w-8 h-8 text-emerald-400" />,
      glowColor: 'rgba(16, 185, 129, 0.4)',
      github: 'https://github.com/SakshiCN28/rl-self-driving',
      demo: '#',
    },
    {
      id: 'devconnect',
      title: 'DevConnect Platform',
      category: 'full-stack',
      categoryLabel: 'Full-Stack Web',
      shortDesc: 'A social network and collaboration platform for developers featuring project showcases, real-time messaging, and interactive team portals.',
      longDesc: 'Built a responsive developer portal using the MERN stack. Integrates WebSocket connections to support real-time chat rooms and dashboard status updates. Features custom portfolio editors, GitHub profile fetchers, and clean JSON Web Token authorization cookies.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      icon: <Layers className="w-8 h-8 text-indigo-400" />,
      glowColor: 'rgba(99, 102, 241, 0.4)',
      github: 'https://github.com/SakshiCN28/devconnect',
      demo: '#',
    },
    {
      id: 'iot-analytics',
      title: 'Real-Time IoT Analytics Dashboard',
      category: 'full-stack',
      categoryLabel: 'Full-Stack Web',
      shortDesc: 'A SaaS telemetry dashboard tracking metrics streams from remote IoT hardware nodes, utilizing responsive charts and alert states.',
      longDesc: 'Designed a real-time IoT visualization client that displays hardware data feeds (temperature, memory load, throughput). Features interactive Chart.js line updates, responsive sidebar routing, customized alarm alerts, and a secure REST API admin layout.',
      tech: ['React', 'Tailwind CSS', 'Chart.js', 'WebSockets', 'AWS IoT'],
      icon: <Code className="w-8 h-8 text-sky-400" />,
      glowColor: 'rgba(14, 165, 233, 0.4)',
      github: 'https://github.com/SakshiCN28/iot-telemetry',
      demo: '#',
    }
  ];

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative bg-darkSurface/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Featured Projects
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            A curated collection of deep learning research, analytics systems, and modular full-stack applications.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${filter === 'all' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('ai-ml')}
            className={`px-5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${filter === 'ai-ml' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
          >
            AI & ML Models
          </button>
          <button
            onClick={() => setFilter('full-stack')}
            className={`px-5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${filter === 'full-stack' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
          >
            Full-Stack Web
          </button>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-2xl p-6 border border-white/5 shadow-md flex flex-col justify-between group glass-card-hover"
            >
              <div>
                {/* Visual Header */}
                <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-2xl blur-lg scale-90"
                    style={{ background: project.glowColor }}
                  />
                  <div className="relative z-10">{project.icon}</div>
                </div>

                {/* Tags */}
                <span className="text-[10px] uppercase font-bold tracking-wider text-secondary mb-2 block">
                  {project.categoryLabel}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech badging */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-semibold font-mono bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors duration-200"
                >
                  View Case Study &rarr;
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-white/10 hover:border-white hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-white hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Case Study details */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-md">
            {/* Modal Box */}
            <div
              className="glass-card w-full max-w-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Closing trigger */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-white"
              >
                &times;
              </button>

              <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                {selectedProject.icon}
              </div>

              <span className="text-xs uppercase font-extrabold text-secondary tracking-widest block mb-1">
                {selectedProject.categoryLabel}
              </span>
              
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedProject.longDesc}
              </p>

              <div className="mb-8">
                <h5 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">Technical Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-xs font-mono font-semibold bg-white/5 border border-white/10 text-slate-100 px-3 py-1 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-btn text-white font-bold text-sm bg-gradient-btn-hover transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-sm transition-all"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
