import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, GraduationCap, BookOpen, Building2, Award } from 'lucide-react';
import { searchColleges } from '@/data/mockData';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchColleges>>([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setSearchResults(searchColleges(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { label: 'Colleges', to: '/colleges', icon: <Building2 size={15} /> },
    { label: 'Courses', to: '/courses', icon: <BookOpen size={15} /> },
    { label: 'Rankings', to: '/colleges', icon: <Award size={15} /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center shadow-sm">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-gray-900 tracking-tight">EduReach</span>
              <span className="block text-[9px] text-primary-600 font-medium -mt-1 tracking-widest uppercase">Find Your College</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.label} to={l.to}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150">
                {l.icon} {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-all">
                <Search size={18} />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search colleges, courses..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {searchResults.length > 0 && (
                    <div className="max-h-72 overflow-y-auto">
                      {searchResults.map(c => (
                        <button
                          key={c.id}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => { navigate(`/colleges/${c.slug}`); setShowSearch(false); setSearchQuery(''); }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ background: c.logoColor }}>
                            {c.logoInitials.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                            <p className="text-xs text-gray-500">{c.city}, {c.state}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 1 && searchResults.length === 0 && (
                    <p className="px-4 py-4 text-sm text-gray-500">No colleges found for "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>

            <Link to="/colleges"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-all">
              Explore
            </Link>
            <Link to="/apply"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-all shadow-sm">
              Get Counselling
            </Link>

            <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map(l => (
              <Link key={l.label} to={l.to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                onClick={() => setMobileOpen(false)}>
                {l.icon} {l.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-gray-100">
              <Link to="/colleges" className="btn-outline w-full justify-center" onClick={() => setMobileOpen(false)}>Explore Colleges</Link>
              <Link to="/apply" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>Get Free Counselling</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}