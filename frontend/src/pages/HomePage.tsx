import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search, MapPin, ArrowRight, TrendingUp,
  ChevronRight, Zap, Shield, Clock, CheckCircle,
  Cpu, Heart, Briefcase, Scale, Palette, FlaskConical, BarChart2, Building2,
  Calendar, Users
} from 'lucide-react';
import { APP_NAME } from '@/config';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MOCK_COLLEGES, FEATURED_COLLEGES } from '@/data/mockData';
import HeroSection from '@/components/home/HeroSection';

const STREAMS = [
  { name: 'Engineering', icon: Cpu, count: '4,800+', topCollege: 'IIT Bombay', color: '#2563eb' },
  { name: 'Medical', icon: Heart, count: '1,200+', topCollege: 'AIIMS Delhi', color: '#e11d48' },
  { name: 'Management', icon: Briefcase, count: '3,600+', topCollege: 'IIM Ahmedabad', color: '#f59e0b' },
  { name: 'Law', icon: Scale, count: '980+', topCollege: 'NLSIU Bangalore', color: '#7c3aed' },
  { name: 'Design', icon: Palette, count: '640+', topCollege: 'NID Ahmedabad', color: '#ec4899' },
  { name: 'Science', icon: FlaskConical, count: '2,100+', topCollege: 'IISc Bangalore', color: '#10b981' },
  { name: 'Commerce', icon: BarChart2, count: '1,800+', topCollege: 'SRCC Delhi', color: '#06b6d4' },
  { name: 'Architecture', icon: Building2, count: '420+', topCollege: 'SPA Delhi', color: '#f97316' },
];

const TOP_EXAMS = [
  { name: 'JEE Main', desc: 'Engineering UG Admission', month: 'Jan & Apr 2026', applicants: '12 Lakh+', color: '#1d4ed8' },
  { name: 'NEET-UG', desc: 'Medical UG Admission', month: 'May 2026', applicants: '20 Lakh+', color: '#16a34a' },
  { name: 'CAT', desc: 'MBA Admission – IIMs', month: 'Nov 2026', applicants: '3 Lakh+', color: '#dc2626' },
  { name: 'JEE Advanced', desc: 'IIT Admission', month: 'May 2026', applicants: '1.8 Lakh+', color: '#7c3aed' },
  { name: 'GATE', desc: 'M.Tech / PSU Jobs', month: 'Feb 2026', applicants: '8 Lakh+', color: '#b45309' },
  { name: 'CLAT', desc: 'Law Admission – NLUs', month: 'Dec 2026', applicants: '70,000+', color: '#0e7490' },
];



const WHY_US = [
  { icon: <Zap size={24} className="text-orange-500" />, title: 'Instant Personalization', desc: 'Tell us your marks and preferences – get a tailored list of colleges where you can actually get in.' },
  { icon: <Shield size={24} className="text-primary-600" />, title: 'Verified Information', desc: 'All college data is verified by our team and updated every semester. No outdated, misleading info.' },
  { icon: <Clock size={24} className="text-green-600" />, title: 'Real-time Cutoffs', desc: 'Live cutoff data for JEE, NEET, CAT across all categories, updated as counselling proceeds.' },
  { icon: <CheckCircle size={24} className="text-purple-600" />, title: 'Expert Counselling', desc: 'Our counsellors are alumni of top colleges – they\'ve been through it and know exactly what you need.' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CollegeCard({ college }: { college: typeof MOCK_COLLEGES[0] }) {
  return (
    <Link to={`/colleges/${college.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">

      {/* Header with cover image */}
      <div className="relative h-32 overflow-hidden bg-gray-100">
        {college.coverImage ? (
          <img src={college.coverImage} alt={college.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${college.logoColor}15 0%, ${college.logoColor}30 100%)` }} />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-primary-700 transition-colors line-clamp-2 mb-1">
            {college.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <MapPin size={11} />
            <span>{college.city}, {college.state}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge bg-blue-50 text-blue-700 border border-blue-100">{college.collegeType}</span>
          <span className="badge bg-gray-50 text-gray-600 border border-gray-100">{college.ownershipType}</span>
          {college.naacGrade && (
            <span className="badge bg-green-50 text-green-700 border border-green-100">NAAC {college.naacGrade}</span>
          )}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-[11px] text-gray-500 mb-0.5">Avg Package</p>
            <p className="text-sm font-bold text-gray-900">
              ₹{college.placements[0]?.avgPackageLpa ?? '–'} LPA
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-[11px] text-gray-500 mb-0.5">Fees/Year</p>
            <p className="text-sm font-bold text-gray-900">
              ₹{(college.minFeePerYear / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <StarRating rating={college.avgRating} />
            <span className="text-xs font-medium text-gray-700">{college.avgRating}</span>
            <span className="text-xs text-gray-400">({college.totalReviews.toLocaleString()})</span>
          </div>
          <div className="text-xs text-gray-500">Est. {college.establishedYear}</div>
        </div>

        {/* Exams */}
        <div className="flex flex-wrap gap-1 mb-4">
          {college.entranceExams.slice(0, 3).map(e => (
            <span key={e} className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium border border-primary-100">
              {e}
            </span>
          ))}
          {college.entranceExams.length > 3 && (
            <span className="text-[10px] text-gray-500">+{college.entranceExams.length - 3} more</span>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/colleges/${college.slug}`}
            className="flex-1 py-2 text-center text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
            View Details
          </Link>
          <button className="flex-1 py-2 text-center text-xs font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafc]">
      <Header />

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── STREAMS ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Stream</span></h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">Explore pathways to your dream career</p>
          </div>
          <Link to="/colleges" className="hidden sm:flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-5 py-2.5 rounded-full transition-all hover:shadow-sm">
            View All Streams <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STREAMS.map(stream => (
            <Link key={stream.name} to={`/colleges?type=${stream.name}`}
              className="group relative flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${stream.color}dd, ${stream.color})` }}>
                <stream.icon size={22} color="white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">{stream.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-bold text-slate-500">{stream.count} colleges</span>
                </div>
                <p className="text-[10px] font-bold mt-1 truncate" style={{ color: stream.color }}>Top: {stream.topCollege}</p>
              </div>
              
              <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLEGES ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Top Ranked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Colleges</span></h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">Best institutions in India for 2026-27</p>
          </div>
          <Link to="/colleges" className="hidden sm:flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-5 py-2.5 rounded-full transition-all hover:shadow-sm">
            View All Colleges <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COLLEGES.slice(0, 8).map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* ── TOP EXAMS ── */}
      <section className="relative py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-3 border border-indigo-100">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Stay Updated
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Entrance Exams</span></h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">Don't miss important dates – track all exams in one place</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_EXAMS.map(exam => (
              <div key={exam.name}
                className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:border-indigo-100 hover:shadow-[0_15px_30px_-15px_rgba(79,70,229,0.12)] transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: exam.color }} />
                
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-sm transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${exam.color}dd, ${exam.color})` }}>
                  {exam.name.split(' ').map(w => w[0]).join('')}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">{exam.name}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate mb-1.5">{exam.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Calendar size={10} /> {exam.month}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Users size={10} /> {exam.applicants}
                    </span>
                  </div>
                </div>
                
                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 shrink-0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="relative py-16 bg-[#fafafc] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Why Students Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">{APP_NAME}</span></h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">We've helped millions of students make the most important decision of their life — choosing the right college.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-15px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 relative group flex flex-col">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity duration-300 scale-150 transform -translate-y-2 translate-x-2 pointer-events-none text-indigo-600">
                  {item.icon}
                </div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-indigo-50/50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-indigo-100/50 shrink-0">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "text-indigo-600" })}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm flex-1 leading-tight">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-medium relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGMtMS4xIDAtMi0uOS0yLTIgMC0xLjEuOS0yIDItMiAxLjEgMCAyIC45IDIgMiAwIDEuMS0uOSAyLTIgMnoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSLCAwLjAzKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Students Who Found Their <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Dream College</span></h2>
            <p className="text-slate-400 text-sm font-medium">Real stories from real students who used {APP_NAME} to make informed decisions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Aryan Singh', college: 'IIT Bombay – CSE', year: 'Class of 2024', quote: `${APP_NAME} showed me every detail about IIT Bombay – the placement records, faculty, hostel, everything. Made my decision so much easier.`, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
              { name: 'Pooja Sharma', college: 'AIIMS Delhi – MBBS', year: 'Class of 2023', quote: 'The cutoff data and college comparison tool were invaluable. I could see exactly where I stood with my NEET score and plan accordingly.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
              { name: 'Rahul Mehta', college: 'IIM Ahmedabad – PGP', year: 'Class of 2023', quote: 'The expert counselling session helped me craft my MBA application strategy. Got into my dream B-school on the first attempt!', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
            ].map(t => (
              <div key={t.name} className="bg-slate-800/40 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-700/50 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 relative shadow-2xl flex flex-col">
                <div className="absolute top-4 right-4 text-indigo-500/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 mb-4 relative z-10">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10 font-medium italic flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 relative z-10 mt-auto pt-4 border-t border-slate-700/50">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">{t.college} <span className="text-slate-600 mx-1">·</span> {t.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
