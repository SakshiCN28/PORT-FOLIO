import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, AlertCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' }); // type can be 'success', 'error', or 'loading'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    // Validate fields
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus({ type: 'error', msg: 'All form fields are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus({ type: 'error', msg: 'Please provide a valid email format.' });
      return;
    }

    // Set loading state
    setStatus({ type: 'loading', msg: 'Processing message transmission...' });

    // Simulate database submission
    setTimeout(() => {
      setStatus({
        type: 'success',
        msg: 'Connection established! Your message has been sent successfully to Sakshi.'
      });
      // Clear fields
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-t from-darkBg to-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Get In Touch
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            Let's discuss training models, processing pipelines, or collaborating on innovative AI solutions.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            <div className="flex flex-col gap-6">
              
              {/* Email Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 flex items-center gap-4 hover:border-primary/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Email</h4>
                  <a href="mailto:22sakshinagonde@gmail.com" className="text-white text-sm font-semibold hover:text-primary transition-colors">
                    22sakshinagonde@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 flex items-center gap-4 hover:border-secondary/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Location</h4>
                  <p className="text-white text-sm font-semibold">Karnataka, India</p>
                </div>
              </div>

            </div>

            {/* Social card section */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h4 className="text-sm font-bold text-white mb-4">Connect on Social Media</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:text-primary transition-all duration-300 text-slate-400"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-secondary hover:text-secondary transition-all duration-300 text-slate-400"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:text-accent transition-all duration-300 text-slate-400"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden">
              
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6" noValidate>
                
                {/* Status messages */}
                {status.msg && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${status.type === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-secondary/10 border-secondary/30 text-secondary'}`}>
                    {status.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
                    {status.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
                    {status.type === 'loading' && (
                      <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin shrink-0 block" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-slate-400 text-xs font-bold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alex Mercer"
                      className="bg-black/25 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@domain.com"
                      className="bg-black/25 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-slate-400 text-xs font-bold uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Collaboration / Job Opportunity"
                    className="bg-black/25 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-slate-400 text-xs font-bold uppercase tracking-wider">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Hi Sakshi, I was impressed by your AI & Machine Learning portfolio..."
                    className="bg-black/25 border border-white/10 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="bg-gradient-btn text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/10 bg-gradient-btn-hover hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
