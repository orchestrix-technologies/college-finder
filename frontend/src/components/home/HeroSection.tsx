import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, MapPin, Award, Star, Sparkles } from 'lucide-react';
import { searchColleges, MOCK_COLLEGES } from '@/data/mockData';
import './HeroSection.css';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof MOCK_COLLEGES | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 1) {
      setSearchResults(searchColleges(val));
    } else {
      setSearchResults(null);
    }
  };

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden bg-[#fafafc]">
      {/* Epic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-br from-indigo-300/40 via-violet-200/30 to-fuchsia-100/40 blur-[100px] animate-blob-shift mix-blend-multiply opacity-80" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-tr from-cyan-200/40 via-blue-200/30 to-indigo-100/40 blur-[120px] animate-blob-shift mix-blend-multiply opacity-80" style={{ animationDelay: '7s' }} />
        
        {/* Intricate Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGMtMS4xIDAtMi0uOS0yLTIgMC0xLjEuOS0yIDItMiAxLjEgMCAyIC45IDIgMiAwIDEuMS0uOSAyLTIgMnoiIGZpbGw9InJnYmEoMTUsIDIzLCA0MiwgMC4wMykiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-50" />

        {/* Floating Decorative Particles */}
        <div className="absolute top-[25%] left-[5%] animate-float-delayed opacity-50 hidden lg:block">
          <Star className="text-amber-400 w-6 h-6 fill-amber-400" />
        </div>
        <div className="absolute top-[65%] right-[48%] animate-float opacity-40 hidden lg:block">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        </div>
        <div className="absolute top-[15%] right-[38%] animate-pulse-glow opacity-60 hidden lg:block">
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center lg:items-start">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left z-20 lg:pt-8">
            {/* Ultra-Premium Live Badge */}
            <div className="animate-fade-up flex justify-center lg:justify-start" style={{ animationDelay: '0ms' }}>
              <div className="inline-flex items-center gap-3 p-1 pr-4 rounded-full glass-panel text-sm font-semibold text-slate-800 mb-8 cursor-pointer group hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] transition-all duration-300 relative overflow-hidden border-indigo-200/50">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-pulse-glow"></div>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  <span className="relative z-10">Live</span>
                </div>
                <span className="tracking-tight text-slate-700 font-bold group-hover:text-indigo-800 transition-colors">Admissions Open 2026</span>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Your future starts <br className="hidden sm:block" />
              with the <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 text-gradient-shine pb-1 drop-shadow-sm">
                  perfect match.
                </span>
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-400/40 z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-lg sm:text-xl mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Discover elite institutions, compare vital stats, and chart your course to success. Join over 5 million students shaping their destiny.
            </p>

            {/* Epic Search Component */}
            <div className="relative z-50 animate-fade-up max-w-2xl mx-auto lg:mx-0" style={{ animationDelay: '300ms' }}>
              <div className="search-glow-container rounded-full">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center p-2 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10 transition-shadow duration-500 hover:shadow-[0_16px_60px_-15px_rgba(79,70,229,0.2)]">
                  <div className="flex-1 flex items-center w-full px-5 py-3 sm:py-2 group/input">
                    <Search size={22} className="text-indigo-400 group-focus-within/input:text-indigo-600 group-focus-within/input:scale-110 transition-all shrink-0" />
                    <input
                      type="text"
                      placeholder="Search colleges, courses, or exams..."
                      value={searchQuery}
                      onChange={e => handleSearchChange(e.target.value)}
                      className="w-full bg-transparent border-none outline-none px-4 py-2 text-slate-800 placeholder-slate-400 text-base lg:text-lg font-medium"
                    />
                  </div>
                  <button type="submit"
                    className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-slate-900 text-white text-base font-bold rounded-full transition-all duration-300 shadow-lg shrink-0 flex justify-center items-center gap-2 group relative btn-sweep hover:scale-105 hover:shadow-indigo-500/30">
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Now
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>

                {/* Search Results Dropdown */}
                {searchResults && searchResults.length > 0 && (
                  <div className="absolute top-[calc(100%+16px)] left-0 right-0 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-scale-up-fade origin-top">
                    <div className="max-h-[360px] overflow-y-auto p-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3 flex items-center gap-2">
                        <Sparkles size={14} className="text-indigo-400" /> Top Matches
                      </div>
                      {searchResults.map(c => (
                        <button key={c.id}
                          className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl text-left transition-colors group"
                          onClick={() => navigate(`/colleges/${c.slug}`)}>
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                            style={{ background: c.logoColor }}>
                            {c.logoInitials.slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{c.name}</p>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1 font-medium">
                              <MapPin size={14} className="text-slate-400" />
                              <span className="truncate">{c.city}, {c.state}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="truncate text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{c.collegeType}</span>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-50/80 p-4 border-t border-slate-100 text-center backdrop-blur-md">
                      <button onClick={handleSearch} className="text-sm text-indigo-600 font-bold hover:text-indigo-700 flex items-center justify-center gap-1.5 mx-auto group">
                        See all results <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6 text-sm">
                <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  Trending:
                </span>
                {['IIT Bombay', 'IIM Ahmedabad', 'AIIMS Delhi', 'BITS Pilani'].map((s, i) => (
                  <button key={s}
                    onClick={() => navigate(`/colleges?q=${encodeURIComponent(s)}`)}
                    className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-bold transition-all animate-fade-up shadow-sm hover:shadow hover:-translate-y-0.5"
                    style={{ animationDelay: `${400 + i * 50}ms` }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Premium Visual Collage */}
          <div className="lg:col-span-6 xl:col-span-5 relative mt-12 lg:mt-0 animate-fade-left" style={{ animationDelay: '200ms' }}>
            {/* Aspect container tightly fits the images */}
            <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
              
              {/* Main Large Image */}
              <div className="absolute right-0 top-0 w-[85%] h-[85%] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.15)] border-[6px] border-white z-10 image-mask-reveal group">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Campus life" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Overlapping Smaller Image */}
              <div className="absolute left-0 bottom-0 w-[55%] aspect-square rounded-[2rem] overflow-hidden shadow-[0_40px_70px_rgba(15,23,42,0.2)] border-[6px] border-white z-20 image-mask-reveal group" style={{ animationDelay: '300ms' }}>
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Graduation" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                />
              </div>
              
              {/* Floating Element 1: Rankings */}
              <div className="absolute top-12 -left-6 z-30 glass-panel p-3.5 rounded-2xl animate-float-soft pointer-events-auto hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(79,70,229,0.3)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/40">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Rankings</p>
                    <p className="text-base font-black text-slate-900">#1 Institutions</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: Users */}
              <div className="absolute bottom-16 -right-6 z-30 glass-panel p-3.5 rounded-2xl animate-float-delayed pointer-events-auto hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(14,165,233,0.3)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="User 1" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="User 2" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-black shadow-md">
                      5M+
                    </div>
                  </div>
                  <div className="pr-1">
                    <p className="text-sm font-bold text-slate-900">Students</p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Trust us</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
