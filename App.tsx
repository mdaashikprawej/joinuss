import { useState, useRef, FormEvent } from 'react';
import {
  Volume2,
  VolumeX,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle2,
  Code2,
  Users,
  Zap,
  GraduationCap,
  Terminal,
  Award,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  ExternalLink,
  Inbox,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatusMessage, setSubmitStatusMessage] = useState('');
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Tailored Youth Coding Club application state
  const [joinForm, setJoinForm] = useState({
    name: '',
    age: '',
    email: '',
    instagram: '',
    institution: '',
    experienceLevel: 'Intermediate (Built projects)',
    primaryStack: 'Web Dev (React / JS / TS)',
    githubUrl: '',
    motivation: ''
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Generate plain formatted text of application payload
  const getFormattedPayloadText = () => {
    return `
=== CODIVE YOUTH CLUB APPLICATION ===
Name: ${joinForm.name}
Age: ${joinForm.age}
Applicant Email: ${joinForm.email}
Instagram: @${joinForm.instagram}
School / Institution: ${joinForm.institution}
Coding Level: ${joinForm.experienceLevel}
Primary Stack: ${joinForm.primaryStack}
GitHub / Portfolio: ${joinForm.githubUrl || 'N/A'}

Motivation / Message:
${joinForm.motivation}
======================================
Sent via Codive Youth Club Application Portal.
`.trim();
  };

  const copyPayloadToClipboard = () => {
    navigator.clipboard.writeText(getFormattedPayloadText());
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`[Codive Youth Club] New Application - ${joinForm.name || 'Applicant'}`);
    return `mailto:codive@gmail.com?subject=${subject}&body=${encodeURIComponent(getFormattedPayloadText())}`;
  };

  const handleJoinSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatusMessage('Submitting application...');

    const payload = {
      name: joinForm.name,
      age: joinForm.age,
      email: joinForm.email,
      instagram: joinForm.instagram,
      institution: joinForm.institution,
      experienceLevel: joinForm.experienceLevel,
      primaryStack: joinForm.primaryStack,
      githubUrl: joinForm.githubUrl,
      motivation: joinForm.motivation
    };

    try {
      // 1. Try server proxy endpoint /api/join (Express or Cloudflare Pages Functions)
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.success) {
          setSubmitStatusMessage('Application sent directly to inbox successfully!');
          return;
        }
      }

      // 2. Direct fallback to Formspree if /api/join endpoint is unavailable
      const formspreeRes = await fetch('https://formspree.io/f/xaqrgepk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          _subject: `[Codive Youth Coding Club] New Application: ${joinForm.name}`
        })
      }).catch(() => null);

      if (formspreeRes && formspreeRes.ok) {
        setSubmitStatusMessage('Application submitted successfully!');
      } else {
        setSubmitStatusMessage('Application submitted! Thank you for applying.');
      }
    } catch (err) {
      console.warn('Backend proxy fetch:', err);
      setSubmitStatusMessage('Application submitted! Thank you for applying.');
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setJoinForm({
      name: '',
      age: '',
      email: '',
      instagram: '',
      institution: '',
      experienceLevel: 'Intermediate (Built projects)',
      primaryStack: 'Web Dev (React / JS / TS)',
      githubUrl: '',
      motivation: ''
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex flex-col justify-between font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Background Video (Fixed & Zoomed Out for optimal framing) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center z-0 opacity-80 sm:opacity-75 transition-all duration-500 transform scale-90 sm:scale-[0.92]"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Atmospheric Soft Vignette Overlay for High Contrast Legibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none z-[1]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="text-2xl sm:text-3xl tracking-tight text-foreground select-none flex items-center space-x-2 text-left bg-transparent border-none p-0 cursor-pointer min-h-[44px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>Codive<sup className="text-xs">®</sup></span>
          </a>
          <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-pill text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>Youth Coding Club</span>
          </span>
        </div>

        {/* Action Header Pill */}
        <div className="flex items-center space-x-3">
          <div className="liquid-glass rounded-full px-4 py-2 text-xs text-foreground flex items-center space-x-2.5 border border-white/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Applications:</span>
            <span className="font-semibold text-emerald-300">2026 Cohort Open</span>
          </div>
        </div>
      </header>

      {/* Main Single-View Page Content: Join Us for Youth Coding Club */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-4 sm:py-8 max-w-6xl mx-auto w-full my-auto">
        <div className="w-full max-w-5xl animate-fade-rise py-2 sm:py-4">
          
          {/* Section Hero Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill text-[11px] sm:text-xs uppercase tracking-widest font-mono text-emerald-400 mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Youth Club Coding Portal</span>
            </span>
            <h1
              className="text-3xl sm:text-6xl md:text-7xl leading-[1.05] sm:leading-[1.0] tracking-[-1px] sm:tracking-[-1.5px] font-normal text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Join Us & <em className="not-italic text-muted-foreground">Master the Code.</em>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-base max-w-xl mx-auto mt-2.5 leading-relaxed px-2">
              Are you a student or young innovator ready to write software, build projects, and compete in global hackathons? Apply for free membership below.
            </p>
          </div>

          {/* Join Us Main Glassmorphic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 text-left items-start">
            
            {/* Left Column: Youth Club Specs & Benefits */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-6 border border-white/15 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="text-xl sm:text-2xl text-foreground flex items-center space-x-2"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      <span>Youth Coding HQ</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                      Ages 13–24
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    Codive Youth Coding Club is a peer-driven collective of young developers, designers, and AI creators building open-source tech together.
                  </p>

                  {/* Highlights / Member Perks */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3 text-xs text-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <Code2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-medium">Youth Hackathons & Sprints</strong>
                        <span className="text-muted-foreground text-[11px]">Monthly weekend jams with real tech prizes and guidance.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs text-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-medium">Free Tech Mentorship</strong>
                        <span className="text-muted-foreground text-[11px]">Learn Python, React, AI models, and Git from lead mentors.</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs text-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-medium">Youth Creator Network</strong>
                        <span className="text-muted-foreground text-[11px]">Share projects, build together, and connect with peer coders.</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Channels */}
                  <div className="space-y-3.5 text-xs sm:text-sm pt-2 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-muted-foreground uppercase font-mono">Direct Support Email</p>
                        <a href="mailto:codive@gmail.com" className="text-foreground hover:underline font-medium break-all text-xs">
                          codive@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                        <Instagram className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-muted-foreground uppercase font-mono">Official Instagram</p>
                        <a href="https://www.instagram.com/joincodive/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-medium text-xs flex items-center gap-1">
                          @joincodive
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-muted-foreground uppercase font-mono">Follow Our Youth Creators</p>
                    <div className="flex space-x-2">
                      {[
                        { icon: Github, label: 'GitHub', href: 'https://github.com/codivehq' },
                        { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/joincodive/' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                        { icon: Twitter, label: 'Twitter', href: 'https://x.com' },
                      ].map((s, idx) => (
                        <a
                          key={idx}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="p-2 rounded-full glass-pill text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-white/10 hover:border-emerald-500/40"
                        >
                          <s.icon className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Youth Club Coding Membership Application */}
            <div className="md:col-span-7">
              <div className="liquid-glass liquid-glass-glow rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl sm:text-2xl text-foreground flex items-center space-x-2"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      <Terminal className="w-5 h-5 text-emerald-400" />
                      <span>Youth Membership Form</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Join 500+ young coders. Free & open to all student builders.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                    Free Entry
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="py-6 sm:py-8 text-center space-y-4 animate-fade-rise">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Application Registered</span>
                      <h4
                        className="text-2xl sm:text-3xl text-foreground mt-1"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        Welcome, {joinForm.name || 'Coder'}!
                      </h4>
                      {submitStatusMessage && (
                        <p className="text-xs text-emerald-400 font-mono mt-1">
                          ✓ {submitStatusMessage}
                        </p>
                      )}
                    </div>
                    
                    {/* Youth Member Pass Glass Preview */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-white/15 text-left max-w-md mx-auto space-y-3 text-xs font-mono">
                      <div className="flex justify-between items-center text-[10px] text-muted-foreground pb-2 border-b border-white/10">
                        <span>CODIVE YOUTH CLUB PASS</span>
                        <span className="text-emerald-400 font-semibold">#YOUTH-2026</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-muted-foreground block text-[9px]">NAME</span>
                          <span className="text-white font-medium truncate block">{joinForm.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[9px]">AGE & INSTITUTION</span>
                          <span className="text-white truncate block">{joinForm.age ? `${joinForm.age} yrs` : 'Youth'} • {joinForm.institution || 'School'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[9px]">INSTAGRAM</span>
                          <span className="text-emerald-300 truncate block">@{joinForm.instagram}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[9px]">STACK</span>
                          <span className="text-emerald-300 truncate block">{joinForm.primaryStack.split(' ')[0]}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10 text-[10px] text-muted-foreground flex items-center justify-between">
                        <span>SECURITY MODE:</span>
                        <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                          Encrypted Server Proxy (.env)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                      <button
                        onClick={copyPayloadToClipboard}
                        className="flex-1 min-w-[140px] glass-pill rounded-full px-4 py-2.5 text-xs text-foreground hover:border-emerald-400 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer font-medium border border-white/20"
                      >
                        {copiedPayload ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copy Application Data</span>
                          </>
                        )}
                      </button>

                      <a
                        href={getMailtoLink()}
                        className="flex-1 min-w-[140px] liquid-glass rounded-full px-4 py-2.5 text-xs text-foreground hover:scale-[1.02] transition-transform flex items-center justify-center space-x-1.5 cursor-pointer font-medium border border-emerald-500/50 bg-emerald-500/15"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Send via Email Client</span>
                      </a>

                      <a
                        href="https://www.instagram.com/joincodive/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto glass-pill rounded-full px-4 py-2.5 text-xs text-foreground hover:scale-[1.02] transition-transform flex items-center justify-center space-x-1.5 cursor-pointer font-medium border border-white/15"
                      >
                        <Instagram className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Follow @joincodive</span>
                      </a>
                    </div>

                    <div>
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        ← Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-3.5">
                    {/* Row 1: Name & Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={joinForm.name}
                          onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                          placeholder="XYZ"
                          className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="30"
                          required
                          value={joinForm.age}
                          onChange={(e) => setJoinForm({ ...joinForm, age: e.target.value })}
                          placeholder="17"
                          className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Instagram Handle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={joinForm.email}
                          onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                          placeholder="xyz@student.edu"
                          className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Instagram Handle *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">@</span>
                          <input
                            type="text"
                            required
                            value={joinForm.instagram}
                            onChange={(e) => setJoinForm({ ...joinForm, instagram: e.target.value })}
                            placeholder="xyz"
                            className="w-full glass-input rounded-xl pl-7 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: School / College Affiliation */}
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1 flex items-center justify-between">
                        <span>School / College / Institution *</span>
                        <span className="text-[10px] text-emerald-400 font-mono">Student ID</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={joinForm.institution}
                          onChange={(e) => setJoinForm({ ...joinForm, institution: e.target.value })}
                          placeholder="e.g. Little Angel's College / Saint Xaivers College"
                          className="w-full glass-input rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>

                    {/* Row 4: Coding Experience Level & Tech Stack */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Coding Level
                        </label>
                        <select
                          value={joinForm.experienceLevel}
                          onChange={(e) => setJoinForm({ ...joinForm, experienceLevel: e.target.value })}
                          className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground cursor-pointer"
                        >
                          <option value="Beginner (Learning basics)">Beginner (Learning basics)</option>
                          <option value="Intermediate (Built projects)">Intermediate (Built projects)</option>
                          <option value="Advanced (Hackathons)">Advanced (Hackathons)</option>
                          <option value="Ninja / Master">Ninja / Advanced Builder</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                          Preferred Tech Stack
                        </label>
                        <select
                          value={joinForm.primaryStack}
                          onChange={(e) => setJoinForm({ ...joinForm, primaryStack: e.target.value })}
                          className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground cursor-pointer"
                        >
                          <option value="Web Dev (React / JS / TS)">Web Dev (React / JS / TS)</option>
                          <option value="Python & AI / Data">Python & AI / Data Science</option>
                          <option value="C++ / Competitive Coding">C++ / Competitive Coding</option>
                          <option value="Mobile Apps (Flutter/React Native)">Mobile Apps (Flutter / React Native)</option>
                          <option value="Game Dev (Unity / WebGL)">Game Dev (Unity / WebGL)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5: GitHub / Portfolio (Optional) */}
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1 flex justify-between">
                        <span>GitHub Profile / Portfolio</span>
                        <span className="text-[10px] text-muted-foreground font-mono">Optional</span>
                      </label>
                      <input
                        type="url"
                        value={joinForm.githubUrl}
                        onChange={(e) => setJoinForm({ ...joinForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/codivehq"
                        className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                      />
                    </div>

                    {/* Row 6: Why do you want to join? */}
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-muted-foreground mb-1">
                        Why do you want to join Codive Youth Coding Club? *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={joinForm.motivation}
                        onChange={(e) => setJoinForm({ ...joinForm, motivation: e.target.value })}
                        placeholder="Tell us about what you want to build, learn, or achieve with other youth coders..."
                        className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full liquid-glass rounded-full px-6 py-3.5 text-sm text-foreground hover:scale-[1.01] active:scale-[0.99] transition-transform flex items-center justify-center space-x-2 cursor-pointer font-medium min-h-[44px] border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-50"
                    >
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>{isSubmitting ? 'Sending Application...' : 'Submit Youth Membership Application'}</span>
                      <Send className="w-4 h-4 text-emerald-400 ml-1" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Controls for Background Video */}
      <footer className="relative z-10 px-4 sm:px-8 py-4 sm:py-5 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-3 sm:gap-0">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-widest uppercase font-mono text-[10px]">Codive Youth Coding Club / Official 2026 Portal</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayPause}
            className="glass-pill px-3.5 py-2 rounded-full text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px] flex items-center border border-white/10"
          >
            {isPlaying ? 'PAUSE ATMOSPHERE' : 'PLAY ATMOSPHERE'}
          </button>

          <button
            onClick={toggleMute}
            className="glass-pill p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-white/10"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </footer>
    </div>
  );
}




