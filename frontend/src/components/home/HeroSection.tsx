import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, MapPin, Award, Star, Sparkles, TrendingUp, Users, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchColleges, MOCK_COLLEGES } from '@/data/mockData';
import './HeroSection.css';

const TRENDING = ['IIT Bombay', 'IIM Ahmedabad', 'AIIMS Delhi', 'BITS Pilani'];

const STATS = [
  { icon: Users,    value: '5M+',   label: 'Students Helped',   color: '#4f46e5' },
  { icon: BookOpen, value: '50K+',  label: 'Colleges Listed',   color: '#7c3aed' },
  { icon: TrendingUp, value: '97%', label: 'Success Rate',      color: '#0ea5e9' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const rightVariants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' as const, delay: 0.2 } },
};

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof MOCK_COLLEGES | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/colleges?q=${encodeURIComponent(query)}`);
  };
  const handleChange = (val: string) => {
    setQuery(val);
    setResults(val.trim().length > 1 ? searchColleges(val) : null);
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">

      {/* ── Background Mesh ── */}
      <div className="absolute inset-0 bg-[#f8f7ff] pointer-events-none">
        {/* Orbs */}
        <div className="hero-orb animate-blob-shift w-[700px] h-[700px] top-[-20%] right-[-10%]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)' }} />
        <div className="hero-orb animate-blob-shift w-[800px] h-[800px] bottom-[-30%] left-[-15%]"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)', animationDelay: '8s' }} />
        <div className="hero-orb animate-pulse-glow w-[400px] h-[400px] top-[40%] left-[40%]"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-[22%] left-[6%] animate-float-soft opacity-60">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
        <div className="absolute top-[68%] right-[46%] animate-float-delayed opacity-50">
          <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_14px_rgba(99,102,241,0.6)]" />
        </div>
        <div className="absolute top-[14%] right-[36%] animate-pulse-glow opacity-70">
          <div className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(14,165,233,0.7)]" />
        </div>
        <div className="absolute bottom-[25%] left-[12%] animate-float-soft opacity-40" style={{ animationDelay: '1s' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
        </div>
        <div className="absolute top-[50%] right-[8%] animate-float-delayed opacity-50" style={{ animationDelay: '4s' }}>
          <Sparkles className="w-4 h-4 text-primary-400" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">

          {/* ── Left Column ── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible">

            {/* Live Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-7">
              <div className="frosted-pill cursor-pointer group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-2 bg-primary-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                  </span>
                  Live
                </div>
                <span className="text-slate-700 font-bold">Admissions Open 2026</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Find your{' '}
              <span className="relative inline-block">
                <span className="shimmer-text">dream college</span>
                <svg className="absolute w-full h-2.5 -bottom-1 left-0" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 6 Q 50 1 100 6 Q 150 11 200 6" stroke="url(#underline-grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />in seconds.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-lg sm:text-xl mb-10 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              Discover India's top institutions, compare placements & fees, and chart your path to success — all in one beautiful place.
            </motion.p>

            {/* Search */}
            <motion.div variants={itemVariants} className="relative z-50 max-w-2xl mx-auto lg:mx-0">
              <div className="search-glow-container rounded-[2rem]">
                <form onSubmit={handleSearch}
                  className="relative z-10 flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(67,56,202,0.15)] border border-slate-100 hover:shadow-[0_16px_60px_-12px_rgba(67,56,202,0.22)] transition-shadow duration-500">
                  <div className="flex-1 flex items-center w-full px-5 py-3 sm:py-2">
                    <Search size={20} className="text-primary-400 shrink-0 transition-all" />
                    <input type="text"
                      placeholder="Search colleges, courses, or exams..."
                      value={query} onChange={e => handleChange(e.target.value)}
                      className="w-full bg-transparent border-none outline-none px-4 py-2 text-slate-800 placeholder-slate-400 text-base font-medium" />
                  </div>
                  <motion.button type="submit"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-8 py-3.5 text-white text-base font-bold rounded-full transition-all duration-300 shadow-lg btn-sweep shrink-0 flex justify-center items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    Explore Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </form>

                {/* Dropdown */}
                <AnimatePresence>
                  {results && results.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white/96 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                      <div className="max-h-80 overflow-y-auto p-3">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2 flex items-center gap-1.5">
                          <Sparkles size={10} className="text-primary-400" /> Top Matches
                        </p>
                        {results.map(c => (
                          <motion.button key={c.id} whileHover={{ backgroundColor: 'rgba(248,247,255,0.8)' }}
                            className="w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-colors group"
                            onClick={() => navigate(`/colleges/${c.slug}`)}>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300"
                              style={{ background: c.logoColor }}>
                              {c.logoInitials.slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 truncate group-hover:text-primary-700 transition-colors">{c.name}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                                <MapPin size={11} />
                                <span className="truncate">{c.city}, {c.state}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded-md text-[10px]">{c.collegeType}</span>
                              </div>
                            </div>
                            <ChevronRight size={15} className="text-slate-300 group-hover:text-primary-500 shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </motion.button>
                        ))}
                      </div>
                      <div className="bg-slate-50/80 py-3 border-t border-slate-100 text-center">
                        <button onClick={handleSearch} className="text-sm text-primary-600 font-bold hover:text-primary-700 flex items-center justify-center gap-1.5 mx-auto">
                          See all results
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trending Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-5">
                <span className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  Trending:
                </span>
                {TRENDING.map((s, i) => (
                  <motion.button key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: 'easeOut' as const }}
                    whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/colleges?q=${encodeURIComponent(s)}`)}
                    className="chip-ghost text-xs font-semibold">
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6 mt-10 flex-wrap">
              {STATS.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 leading-tight">{value}</p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column – Image Collage ── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 relative mt-8 lg:mt-0"
            variants={rightVariants}
            initial="hidden"
            animate="visible">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">

              {/* Main Image */}
              <div className="absolute right-0 top-0 w-[86%] h-[82%] rounded-[2rem] overflow-hidden border-[5px] border-white image-mask-reveal group"
                style={{ boxShadow: '0 30px 80px -20px rgba(67,56,202,0.2), 0 10px 30px -10px rgba(0,0,0,0.12)' }}>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                  alt="Campus life"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[3s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-indigo-900/10" />
              </div>

              {/* Small Image */}
              <div className="absolute left-0 bottom-0 w-[52%] aspect-square rounded-[1.75rem] overflow-hidden border-[5px] border-white image-mask-reveal group"
                style={{ animationDelay: '0.3s', boxShadow: '0 40px 80px -20px rgba(15,23,42,0.2)' }}>
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85"
                  alt="Graduation"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3s] ease-out" />
              </div>

              {/* Floating Card 1 – Rankings */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' as const }}
                className="absolute top-10 -left-5 z-30 float-card p-4 rounded-2xl animate-float-soft cursor-default hover:-translate-y-2 transition-transform duration-300"
                style={{ minWidth: '170px', boxShadow: '0 20px 60px -10px rgba(67,56,202,0.2), 0 8px 20px -8px rgba(0,0,0,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">NIRF Rankings</p>
                    <p className="text-sm font-black text-slate-900">#1 Institutions</p>
                    <p className="text-[10px] text-primary-600 font-semibold mt-0.5">Updated 2026</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 – Students */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' as const }}
                className="absolute bottom-14 -right-5 z-30 float-card p-4 rounded-2xl animate-float-delayed cursor-default hover:-translate-y-2 transition-transform duration-300"
                style={{ boxShadow: '0 20px 60px -10px rgba(14,165,233,0.2), 0 8px 20px -8px rgba(0,0,0,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
                      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80',
                    ].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-md"
                      style={{ background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)' }}>5M+</div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Students</p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Trust {APP_NAME_SHORT}</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full border-2 border-dashed border-primary-200/60 animate-spin-slow pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border border-violet-200/50 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const APP_NAME_SHORT = 'EduFinder';
