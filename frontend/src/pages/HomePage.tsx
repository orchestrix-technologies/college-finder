import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Star, ArrowRight, TrendingUp, Users, BookOpen,
  Award, ChevronRight, Zap, Shield, Clock, CheckCircle
} from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MOCK_COLLEGES, FEATURED_COLLEGES, searchColleges } from '@/data/mockData';

const STREAMS = [
  { name: 'Engineering', icon: '⚙️', count: '4,800+', color: 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100', textColor: 'text-blue-700' },
  { name: 'Medical', icon: '🏥', count: '1,200+', color: 'bg-red-50 border-red-200 hover:border-red-400 hover:bg-red-100', textColor: 'text-red-700' },
  { name: 'Management', icon: '💼', count: '3,600+', color: 'bg-amber-50 border-amber-200 hover:border-amber-400 hover:bg-amber-100', textColor: 'text-amber-700' },
  { name: 'Law', icon: '⚖️', count: '980+', color: 'bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100', textColor: 'text-purple-700' },
  { name: 'Design', icon: '🎨', count: '640+', color: 'bg-pink-50 border-pink-200 hover:border-pink-400 hover:bg-pink-100', textColor: 'text-pink-700' },
  { name: 'Science', icon: '🔬', count: '2,100+', color: 'bg-green-50 border-green-200 hover:border-green-400 hover:bg-green-100', textColor: 'text-green-700' },
  { name: 'Commerce', icon: '📊', count: '1,800+', color: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-100', textColor: 'text-cyan-700' },
  { name: 'Architecture', icon: '🏛️', count: '420+', color: 'bg-orange-50 border-orange-200 hover:border-orange-400 hover:bg-orange-100', textColor: 'text-orange-700' },
];

const TOP_EXAMS = [
  { name: 'JEE Main', desc: 'Engineering UG Admission', month: 'Jan & Apr 2025', applicants: '12 Lakh+', color: '#1d4ed8' },
  { name: 'NEET-UG', desc: 'Medical UG Admission', month: 'May 2025', applicants: '20 Lakh+', color: '#16a34a' },
  { name: 'CAT', desc: 'MBA Admission – IIMs', month: 'Nov 2025', applicants: '3 Lakh+', color: '#dc2626' },
  { name: 'JEE Advanced', desc: 'IIT Admission', month: 'May 2025', applicants: '1.8 Lakh+', color: '#7c3aed' },
  { name: 'GATE', desc: 'M.Tech / PSU Jobs', month: 'Feb 2025', applicants: '8 Lakh+', color: '#b45309' },
  { name: 'CLAT', desc: 'Law Admission – NLUs', month: 'Dec 2025', applicants: '70,000+', color: '#0e7490' },
];

const STATS = [
  { value: '35,000+', label: 'Colleges Listed', icon: <BookOpen size={22} /> },
  { value: '5M+', label: 'Students Guided', icon: <Users size={22} /> },
  { value: '500+', label: 'Entrance Exams', icon: <Award size={22} /> },
  { value: '98%', label: 'Satisfaction Rate', icon: <Star size={22} /> },
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

      {/* Header with logo bg */}
      <div className="relative h-32 overflow-hidden" style={{ background: `linear-gradient(135deg, ${college.logoColor}15 0%, ${college.logoColor}30 100%)` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            style={{ background: college.logoColor }}>
            {college.logoInitials}
          </div>
        </div>
        {college.nirfRanking <= 10 && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp size={10} /> NIRF #{college.nirfRanking}
          </div>
        )}
        {college.isPremium && (
          <div className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Premium
          </div>
        )}
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── HERO ── */}
      <section className="relative pt-16 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Trusted by 5 Million+ Students Across India
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Dream College
            </span>
          </h1>
          <p className="text-primary-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare 35,000+ colleges, explore courses, check cutoffs, and get expert guidance — all in one place.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by college name, course, or location..."
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                className="flex-1 py-4 pr-2 text-gray-800 outline-none text-base placeholder-gray-400 bg-transparent"
              />
              <button type="submit"
                className="m-1.5 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-semibold rounded-xl transition-colors text-sm">
                Search
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                {searchResults.map(c => (
                  <button key={c.id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                    onClick={() => navigate(`/colleges/${c.slug}`)}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: c.logoColor }}>{c.logoInitials.slice(0, 2)}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.city}, {c.state} · {c.collegeType}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 ml-auto" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm text-primary-200">
              <span>Popular:</span>
              {['IIT Bombay', 'IIM Ahmedabad', 'AIIMS Delhi', 'BITS Pilani'].map(s => (
                <button key={s}
                  onClick={() => navigate(`/colleges?q=${s}`)}
                  className="hover:text-white underline underline-offset-2 transition-colors">{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 10 0 20L0 80Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-4 -mt-2 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-700 mb-3">
                {s.icon}
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STREAMS ── */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse by Stream</h2>
            <p className="text-gray-500 text-sm mt-1">Find colleges in your field of interest</p>
          </div>
          <Link to="/colleges" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {STREAMS.map(stream => (
            <Link key={stream.name} to={`/colleges?type=${stream.name}`}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${stream.color}`}>
              <span className="text-3xl">{stream.icon}</span>
              <span className={`text-xs font-bold text-center ${stream.textColor}`}>{stream.name}</span>
              <span className="text-[10px] text-gray-500 font-medium">{stream.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLEGES ── */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Ranked Colleges</h2>
            <p className="text-gray-500 text-sm mt-1">Best institutions in India for 2024–25</p>
          </div>
          <Link to="/colleges" className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
            View All Colleges <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_COLLEGES.slice(0, 8).map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* ── TOP EXAMS ── */}
      <section className="bg-white border-y border-gray-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Entrance Exams</h2>
              <p className="text-gray-500 text-sm mt-1">Don't miss important dates – track all exams in one place</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_EXAMS.map(exam => (
              <div key={exam.name}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0"
                  style={{ background: exam.color }}>
                  {exam.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{exam.name}</p>
                  <p className="text-xs text-gray-500 truncate">{exam.desc}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-full">
                      📅 {exam.month}
                    </span>
                    <span className="text-[11px] text-gray-500">{exam.applicants} applicants</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Students Trust EduReach</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">We've helped millions of students make the most important decision of their life — choosing the right college.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 py-16 mb-0">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Students Who Found Their College Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Aryan Singh', college: 'IIT Bombay – CSE', year: 'Class of 2024', quote: 'EduReach showed me every detail about IIT Bombay – the placement records, faculty, hostel, everything. Made my decision so much easier.', rating: 5 },
              { name: 'Pooja Sharma', college: 'AIIMS Delhi – MBBS', year: 'Class of 2023', quote: 'The cutoff data and college comparison tool were invaluable. I could see exactly where I stood with my NEET score and plan accordingly.', rating: 5 },
              { name: 'Rahul Mehta', college: 'IIM Ahmedabad – PGP', year: 'Class of 2023', quote: 'The expert counselling session helped me craft my MBA application strategy. Got into my dream B-school on the first attempt!', rating: 5 },
            ].map(t => (
              <div key={t.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-primary-300 text-xs">{t.college} · {t.year}</p>
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
