import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, GraduationCap, BookOpen, Building2, Award, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchColleges } from '@/data/mockData';
import { APP_NAME } from '@/config';

const NAV_LINKS = [
  { label: 'Colleges', to: '/colleges', icon: Building2 },
  { label: 'Courses',  to: '/courses',  icon: BookOpen },
  { label: 'Exams',    to: '/exams',    icon: GraduationCap },
  { label: 'Rankings', to: '/rankings', icon: Award },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchColleges>>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setResults(query.trim().length > 1 ? searchColleges(query) : []);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_32px_-8px_rgba(67,56,202,0.08)]'
        : 'bg-white/70 backdrop-blur-xl'
    } border-b border-white/60`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              <GraduationCap size={19} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-[17px] text-slate-900 tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                {APP_NAME}
              </span>
              <span className="block text-[9px] text-primary-600 font-semibold -mt-0.5 tracking-[0.12em] uppercase">
                Find Your College
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, to, icon: Icon }) => {
              const active = isActive(to);
              return (
                <Link key={label} to={to}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-700 hover:bg-slate-50'
                  }`}>
                  <Icon size={14} className={active ? 'text-primary-500' : 'text-slate-400'} />
                  {label}
                  {active && (
                    <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-primary-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => document.getElementById('header-search')?.focus(), 50); }}
                className="p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Search size={18} />
              </motion.button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' as const }}
                    className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
                      <Search size={15} className="text-primary-400 shrink-0" />
                      <input id="header-search" autoFocus type="text"
                        placeholder="Search colleges, courses..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        className="flex-1 text-sm outline-none text-slate-800 placeholder-slate-400 font-medium bg-transparent" />
                      {query && (
                        <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                          <X size={13} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {results.length > 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-h-72 overflow-y-auto py-2">
                          <p className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Sparkles size={10} className="text-primary-400" /> Results
                          </p>
                          {results.map(c => (
                            <button key={c.id}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left group"
                              onClick={() => { navigate(`/colleges/${c.slug}`); setSearchOpen(false); setQuery(''); }}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 group-hover:scale-105 transition-transform"
                                style={{ background: c.logoColor }}>
                                {c.logoInitials.slice(0, 2)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-primary-700 transition-colors">{c.name}</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} /> {c.city}, {c.state}
                                </p>
                              </div>
                              <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                      {query.length > 1 && results.length === 0 && (
                        <p className="px-4 py-5 text-sm text-slate-500 text-center">No results for "{query}"</p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/colleges"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all">
              Browse
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Login coming soon!')}
              className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              Login
            </motion.button>

            <button className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="md:hidden overflow-hidden border-t border-slate-100">
              <div className="py-3 space-y-0.5">
                {NAV_LINKS.map(({ label, to, icon: Icon }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <Link to={to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive(to)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-primary-700'
                      }`}>
                      <Icon size={16} className={isActive(to) ? 'text-primary-500' : 'text-slate-400'} />
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 pb-1 px-1 flex flex-col gap-2.5 border-t border-slate-100 mt-2">
                  <Link to="/colleges"
                    className="w-full py-3 text-sm font-semibold text-center text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-50 transition-all">
                    Browse Colleges
                  </Link>
                  <button
                    onClick={() => alert('Login coming soon!')}
                    className="w-full py-3 text-sm font-bold text-white rounded-xl shadow-md"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                    Login / Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
