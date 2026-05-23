import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, ArrowRight, ChevronRight,
  Zap, Shield, Clock, CheckCircle,
  Cpu, Heart, Briefcase, Scale, Palette, FlaskConical, BarChart2, Building2,
  Calendar, Users, Star, Quote, TrendingUp, BookOpen, Award,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { APP_NAME } from '@/config';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MOCK_COLLEGES, FEATURED_COLLEGES } from '@/data/mockData';
import HeroSection from '@/components/home/HeroSection';

/* ── Data ── */
const STREAMS = [
  { name: 'Engineering', icon: Cpu,         count: '4,800+', topCollege: 'IIT Bombay',      color: '#4f46e5', light: '#eef2ff' },
  { name: 'Medical',     icon: Heart,        count: '1,200+', topCollege: 'AIIMS Delhi',      color: '#e11d48', light: '#fff1f2' },
  { name: 'Management',  icon: Briefcase,    count: '3,600+', topCollege: 'IIM Ahmedabad',    color: '#d97706', light: '#fffbeb' },
  { name: 'Law',         icon: Scale,        count: '980+',   topCollege: 'NLSIU Bangalore',  color: '#7c3aed', light: '#f5f3ff' },
  { name: 'Design',      icon: Palette,      count: '640+',   topCollege: 'NID Ahmedabad',    color: '#ec4899', light: '#fdf2f8' },
  { name: 'Science',     icon: FlaskConical, count: '2,100+', topCollege: 'IISc Bangalore',   color: '#059669', light: '#ecfdf5' },
  { name: 'Commerce',    icon: BarChart2,    count: '1,800+', topCollege: 'SRCC Delhi',       color: '#0284c7', light: '#f0f9ff' },
  { name: 'Architecture',icon: Building2,    count: '420+',   topCollege: 'SPA Delhi',        color: '#ea580c', light: '#fff7ed' },
];

const TOP_EXAMS = [
  { name: 'JEE Main',    desc: 'Engineering UG Admission',    month: 'Jan & Apr 2026', applicants: '12L+',  color: '#4f46e5' },
  { name: 'NEET-UG',     desc: 'Medical UG Admission',        month: 'May 2026',       applicants: '20L+',  color: '#059669' },
  { name: 'CAT',         desc: 'MBA Admission – IIMs',        month: 'Nov 2026',       applicants: '3L+',   color: '#dc2626' },
  { name: 'JEE Advanced',desc: 'IIT Admission',               month: 'May 2026',       applicants: '1.8L+', color: '#7c3aed' },
  { name: 'GATE',        desc: 'M.Tech / PSU Jobs',           month: 'Feb 2026',       applicants: '8L+',   color: '#b45309' },
  { name: 'CLAT',        desc: 'Law Admission – NLUs',        month: 'Dec 2026',       applicants: '70K+',  color: '#0284c7' },
];

const WHY_US = [
  { icon: Zap,         color: '#f59e0b', bg: '#fffbeb', title: 'Instant Personalization', desc: 'Tell us your marks and get a tailored list of colleges where you can actually get in.' },
  { icon: Shield,      color: '#4f46e5', bg: '#eef2ff', title: 'Verified Information',    desc: 'All data is verified by our team and updated every semester. No outdated or misleading info.' },
  { icon: Clock,       color: '#059669', bg: '#ecfdf5', title: 'Real-time Cutoffs',       desc: 'Live cutoff data for JEE, NEET, CAT across all categories as counselling proceeds.' },
  { icon: CheckCircle, color: '#7c3aed', bg: '#f5f3ff', title: 'Expert Counselling',      desc: 'Our counsellors are alumni of top colleges – they know exactly what you need.' },
];

const STATS_HERO = [
  { value: 5,   suffix: 'M+',  label: 'Students Helped',  icon: Users,      color: '#4f46e5' },
  { value: 50,  suffix: 'K+',  label: 'Colleges Listed',  icon: BookOpen,   color: '#7c3aed' },
  { value: 200, suffix: '+',   label: 'Entrance Exams',   icon: Award,      color: '#0ea5e9' },
  { value: 97,  suffix: '%',   label: 'Success Rate',     icon: TrendingUp, color: '#059669' },
];

const TESTIMONIALS = [
  { name: 'Aryan Singh',   college: 'IIT Bombay – CSE',       year: '2026', quote: `${APP_NAME} showed me every detail about IIT Bombay – placements, faculty, hostel life, everything. Made my decision so much easier.`,          img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80' },
  { name: 'Pooja Sharma',  college: 'AIIMS Delhi – MBBS',     year: '2023', quote: 'The cutoff tool was invaluable. I could see exactly where I stood with my NEET score and plan accordingly. Got into AIIMS on first attempt!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'Rahul Mehta',   college: 'IIM Ahmedabad – PGP',    year: '2023', quote: 'Expert counselling helped me craft my MBA strategy perfectly. The comparison tools saved me hours of research.',                               img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
];

/* ── Animation Variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariant = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/* ── Animated Counter ── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Star Rating ── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── College Card ── */
function CollegeCard({ college }: { college: typeof MOCK_COLLEGES[0] }) {
  return (
    <motion.div variants={cardVariant}>
      <Link to={`/colleges/${college.slug}`}
        className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-400"
        style={{ boxShadow: '0 2px 12px -4px rgba(67,56,202,0.06), 0 1px 3px rgba(0,0,0,0.04)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 48px -12px rgba(67,56,202,0.18), 0 8px 20px -4px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px -4px rgba(67,56,202,0.06), 0 1px 3px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>

        {/* Cover */}
        <div className="relative h-36 overflow-hidden bg-slate-100">
          {college.coverImage ? (
            <img src={college.coverImage} alt={college.name} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${college.logoColor}20, ${college.logoColor}40)` }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          {/* Logo chip */}
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black border-2 border-white/80 shadow-md"
            style={{ background: college.logoColor }}>
            {college.logoInitials.slice(0, 2)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-primary-700 transition-colors line-clamp-2 mb-1">
            {college.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
            <MapPin size={11} />
            <span>{college.city}, {college.state}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="badge bg-primary-50 text-primary-700 border border-primary-100 text-[10px]">{college.collegeType}</span>
            {college.naacGrade && (
              <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px]">NAAC {college.naacGrade}</span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-50 rounded-xl p-2 text-center">
              <p className="text-[10px] text-slate-400 mb-0.5 font-medium">Avg Package</p>
              <p className="text-sm font-black text-slate-900">₹{college.placements[0]?.avgPackageLpa ?? '–'} LPA</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-2 text-center">
              <p className="text-[10px] text-slate-400 mb-0.5 font-medium">Fees/Year</p>
              <p className="text-sm font-black text-slate-900">₹{(college.minFeePerYear / 100000).toFixed(1)}L</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Stars rating={college.avgRating} />
              <span className="text-xs font-bold text-slate-700">{college.avgRating}</span>
              <span className="text-xs text-slate-400">({college.totalReviews.toLocaleString()})</span>
            </div>
            <span className="text-[10px] text-slate-400">Est. {college.establishedYear}</span>
          </div>

          {/* Exams */}
          <div className="flex flex-wrap gap-1 mb-4">
            {college.entranceExams.slice(0, 3).map(e => (
              <span key={e} className="text-[9px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-bold border border-primary-100">{e}</span>
            ))}
            {college.entranceExams.length > 3 && (
              <span className="text-[9px] text-slate-400 font-medium">+{college.entranceExams.length - 3}</span>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-2 mt-auto">
            <Link to={`/colleges/${college.slug}`}
              className="flex-1 py-2 text-center text-xs font-bold text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all">
              Details
            </Link>
            <button
              onClick={e => { e.preventDefault(); alert('Apply feature coming soon!'); }}
              className="flex-1 py-2 text-center text-xs font-bold text-white rounded-xl transition-all hover:opacity-90 hover:shadow-md active:scale-95"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              Apply Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Section Header ── */
function SectionHeader({
  eyebrow, title, highlight, desc, linkTo, linkLabel, dark = false,
}: {
  eyebrow?: string; title: string; highlight?: string; desc?: string;
  linkTo?: string; linkLabel?: string; dark?: boolean;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
      <div>
        {eyebrow && (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border ${
            dark ? 'bg-primary-900/50 text-primary-300 border-primary-700/50' : 'bg-primary-50 text-primary-600 border-primary-100'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight flex flex-wrap items-center gap-3"
          style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", color: dark ? '#f8fafc' : '#0f172a' }}>
          {title}{highlight && (
            <span className="text-gradient" style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {highlight}
            </span>
          )}
        </h2>
        {desc && <p className={`mt-1.5 text-sm font-medium leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>}
      </div>
      {linkTo && linkLabel && (
        <Link to={linkTo}
          className={`hidden sm:flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:shadow-sm shrink-0 ${
            dark ? 'text-primary-300 bg-primary-900/40 hover:bg-primary-900/70' : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
          }`}>
          {linkLabel} <ArrowRight size={15} />
        </Link>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      <Header />
      <HeroSection />

      {/* ── STATS COUNTER ── */}
      <section className="relative z-10 py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-violet-50/20 to-sky-50/30 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS_HERO.map(({ value, suffix, label, icon: Icon, color }) => (
              <motion.div key={label} variants={cardVariant}
                className="flex flex-col items-center text-center py-6 px-4 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
                style={{ background: `${color}08` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                  style={{ background: `${color}15` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <p className="text-3xl lg:text-4xl font-display font-black tracking-tight"
                  style={{ color, fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                  <Counter target={value} suffix={suffix} />
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STREAMS ── */}
      <section className="relative py-20 lg:py-24">
        <div className="absolute inset-0 bg-[#f8f7ff] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Browse by Stream"
            title="Explore pathways to your"
            highlight=" dream career"
            desc="Find top institutions across every discipline in India"
            linkTo="/courses" linkLabel="View All Streams"
          />

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STREAMS.map(stream => (
              <motion.div key={stream.name} variants={cardVariant}>
                <Link to={`/colleges?type=${stream.name}`}
                  className="group relative flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300"
                  style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -12px ${stream.color}35, 0 4px 12px -4px rgba(0,0,0,0.06)`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.borderColor = `${stream.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px -4px rgba(0,0,0,0.04)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                  }}>

                  {/* BG accent */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${stream.light} 0%, transparent 60%)` }} />
                  {/* Color bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: stream.color }} />

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${stream.color}dd, ${stream.color})` }}>
                    <stream.icon size={22} color="white" />
                  </div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="font-bold text-slate-900 text-sm group-hover:text-slate-800 transition-colors truncate"
                      style={{ '--hover-color': stream.color } as React.CSSProperties}>
                      {stream.name}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{stream.count} colleges</p>
                    <p className="text-[10px] font-bold mt-1 truncate" style={{ color: stream.color }}>
                      Top: {stream.topCollege}
                    </p>
                  </div>

                  <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform shrink-0 relative z-10"
                    style={{ '--hover-color': stream.color } as React.CSSProperties} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED COLLEGES ── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Top Ranked"
            title="India's finest"
            highlight=" institutions"
            desc="Best colleges for 2026-27 admissions, ranked by NIRF & student reviews"
            linkTo="/rankings" linkLabel="View Full Rankings"
          />
          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COLLEGES.slice(0, 8).map(college => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXAMS ── */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f7ff]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-primary-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Stay Updated"
            title="Upcoming Entrance"
            highlight=" Exams"
            desc="Don't miss important dates – track all exams in one place"
            linkTo="/exams" linkLabel="All Exams"
          />

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_EXAMS.map(exam => (
              <motion.div key={exam.name} variants={cardVariant}>
                <Link
                  to={`/exams/${exam.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 transition-all duration-300 relative overflow-hidden"
                  style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -10px ${exam.color}30`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.borderColor = `${exam.color}25`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px -4px rgba(0,0,0,0.04)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                  }}>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: exam.color }} />

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-sm group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${exam.color}dd, ${exam.color})` }}>
                    {exam.name.split(' ').map(w => w[0]).join('')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-primary-700 transition-colors">{exam.name}</h3>
                    <p className="text-xs text-slate-500 font-medium truncate mb-2">{exam.desc}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold bg-primary-50 text-primary-700 px-2 py-1 rounded-lg flex items-center gap-1 border border-primary-100">
                        <Calendar size={10} /> {exam.month}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        <Users size={10} /> {exam.applicants}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={15} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-0.5 shrink-0 transition-all" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary-50 text-primary-600 border border-primary-100 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Why students trust{' '}
              <span style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {APP_NAME}
              </span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We've helped millions of students make the most important decision of their life — choosing the right college.
            </p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map(item => (
              <motion.div key={item.title} variants={cardVariant}
                className="group bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-300 relative overflow-hidden"
                style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px -12px ${item.color}25, 0 4px 12px -4px rgba(0,0,0,0.06)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px -4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>

                {/* BG decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${item.color}12` }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ background: item.bg }}>
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm mb-2 relative z-10"
                  style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Deep dark background */}
        <div className="absolute inset-0 bg-[#06072a]" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[60%] rounded-full bg-primary-600/15 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[55%] rounded-full bg-sky-500/15 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-primary-300 border border-primary-700/40 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              Student Stories
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Students who found their{' '}
              <span style={{ background:'linear-gradient(135deg,#818cf8,#c4b5fd,#7dd3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                dream college
              </span>
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Real stories from real students who used {APP_NAME} to make informed decisions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} variants={cardVariant}
                className="relative flex flex-col rounded-[1.75rem] p-6 border transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>

                {/* Quote icon */}
                <div className="absolute top-5 right-5 text-primary-500/20">
                  <Quote size={32} />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1 font-medium italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <img src={t.img} alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary-500/30" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-[10px] font-bold text-primary-400 uppercase tracking-wider mt-0.5">{t.college}</p>
                    <p className="text-[10px] text-slate-600 font-medium">Class of {t.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-violet-50/50 to-sky-50 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary-100 text-primary-600 border border-primary-200 mb-5">
                <Zap size={10} className="text-primary-500" />
                Free Counselling
              </div>
            </motion.div>
            <motion.h2 variants={itemVariants}
              className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Not sure which college is <br className="hidden sm:block" />
              <span style={{ background:'linear-gradient(135deg,#4f46e5,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                right for you?
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 text-base mb-8 leading-relaxed font-medium">
              Get a free personalised session with our expert counsellors. No sales pitch, just genuine guidance.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input type="tel" placeholder="Enter your mobile number"
                className="flex-1 w-full px-5 py-3.5 rounded-2xl text-slate-800 text-sm font-medium bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all shadow-sm" />
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 text-white text-sm font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                Get Free Session
              </motion.button>
            </motion.div>
            <motion.p variants={itemVariants} className="text-slate-400 text-xs mt-3 font-medium">
              Your information is safe. We never spam.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
