import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { MOCK_COLLEGES, searchColleges } from '@/data/mockData';

const STATS = [
  { value: '35,000+', label: 'Colleges Listed', color: '#60a5fa' },
  { value: '5M+',     label: 'Students Guided', color: '#fbbf24' },
  { value: '500+',    label: 'Entrance Exams',  color: '#34d399' },
];

const POPULAR = ['IIT Bombay', 'IIM Ahmedabad', 'AIIMS Delhi', 'BITS Pilani'];

const AVATAR_COLORS   = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const AVATAR_INITIALS = ['A', 'P', 'R', 'S', 'M'];

/* Deterministic particle positions — no random() to keep SSR-safe */
const PARTICLES = [
  { left: '7%',  top: '18%', size: 2,   delay: 0,    dur: 9,  hue: '#60a5fa' },
  { left: '17%', top: '72%', size: 1.5, delay: 1.4,  dur: 13, hue: '#fbbf24' },
  { left: '30%', top: '38%', size: 2.5, delay: 0.5,  dur: 11, hue: '#a78bfa' },
  { left: '44%', top: '80%', size: 2,   delay: 2.2,  dur: 8,  hue: '#34d399' },
  { left: '57%', top: '22%', size: 3,   delay: 0.9,  dur: 15, hue: '#60a5fa' },
  { left: '68%', top: '64%', size: 1.5, delay: 1.8,  dur: 10, hue: '#fbbf24' },
  { left: '81%', top: '42%', size: 2,   delay: 0.3,  dur: 12, hue: '#a78bfa' },
  { left: '91%', top: '76%', size: 2.5, delay: 2.6,  dur: 9,  hue: '#34d399' },
  { left: '13%', top: '52%', size: 1,   delay: 3.1,  dur: 14, hue: '#60a5fa' },
  { left: '24%', top: '87%', size: 2,   delay: 1.1,  dur: 11, hue: '#fbbf24' },
  { left: '50%', top: '11%', size: 1.5, delay: 0.7,  dur: 13, hue: '#a78bfa' },
  { left: '63%', top: '46%', size: 2,   delay: 2.9,  dur: 10, hue: '#34d399' },
  { left: '76%', top: '20%', size: 2.5, delay: 1.6,  dur: 8,  hue: '#60a5fa' },
  { left: '87%', top: '57%', size: 1.5, delay: 1.0,  dur: 16, hue: '#fbbf24' },
  { left: '4%',  top: '91%', size: 2,   delay: 2.4,  dur: 12, hue: '#a78bfa' },
];

export default function HeroSection() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<typeof MOCK_COLLEGES | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/colleges?q=${encodeURIComponent(query.trim())}`);
  };

  const handleChange = (val: string) => {
    setQuery(val);
    setResults(val.trim().length > 1 ? searchColleges(val) : null);
  };

  return (
    <>
      <style>{`
        /* ── Entrance ─────────────────────────────── */
        @keyframes wordIn {
          from {
            opacity: 0;
            transform: perspective(500px) translateY(44px) rotateX(28deg);
            filter: blur(7px);
          }
          to {
            opacity: 1;
            transform: perspective(500px) translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Orbs ──────────────────────────────────── */
        @keyframes orbA {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(70px,-90px) scale(1.08); }
          66% { transform: translate(-50px,60px) scale(0.93); }
        }
        @keyframes orbB {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-80px,70px) scale(1.1); }
          75% { transform: translate(60px,-50px) scale(0.95); }
        }

        /* ── Floating particles ────────────────────── */
        @keyframes rise {
          0%   { transform: translateY(0) translateX(0)  scale(1);   opacity: 0; }
          10%  { opacity: 0.85; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-140px) translateX(18px) scale(0.5); opacity: 0; }
        }

        /* ── Headline gradient sweep ───────────────── */
        @keyframes gradSweep {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* ── One-time light beam ───────────────────── */
        @keyframes beamOnce {
          0%   { transform: translateX(-100%) skewX(-18deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.7; }
          100% { transform: translateX(400%) skewX(-18deg); opacity: 0; }
        }

        /* ── Live dot ──────────────────────────────── */
        @keyframes liveBlink {
          0%,100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.65); }
        }

        /* ── Search idle glow ──────────────────────── */
        @keyframes searchGlow {
          0%,100% { box-shadow: 0 22px 60px rgba(0,0,0,0.4), 0 0 0 0 rgba(99,102,241,0); }
          50%      { box-shadow: 0 22px 60px rgba(0,0,0,0.4), 0 0 52px 8px rgba(99,102,241,0.2); }
        }

        /* ── Button shimmer ────────────────────────── */
        @keyframes btnShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Scroll mouse ──────────────────────────── */
        @keyframes scrollBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }

        /* ─── Applied classes ──────────────────────── */
        .word-in {
          display: inline-block;
          animation: wordIn 0.85s cubic-bezier(0.22,1,0.36,1) both;
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-in  { animation: fadeIn 0.6s ease both; }

        .orb-a { animation: orbA 22s ease-in-out infinite; will-change: transform; }
        .orb-b { animation: orbB 28s ease-in-out infinite; will-change: transform; }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: rise linear infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .accent-text {
          background: linear-gradient(90deg,#fbbf24,#fb923c,#f472b6,#a78bfa,#60a5fa,#fbbf24);
          background-size: 280% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradSweep 5s ease-in-out infinite;
        }

        .beam {
          position: absolute; inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .beam-ray {
          position: absolute; top: 0; left: 0;
          width: 28%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 50%, transparent 100%);
          animation: beamOnce 2.8s ease-in-out 0.6s 1 both;
        }

        .live-dot { animation: liveBlink 1.6s ease-in-out infinite; }

        .search-wrap { animation: searchGlow 4s ease-in-out 2s infinite; }
        .search-wrap:focus-within {
          animation: none;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.55), 0 22px 60px rgba(0,0,0,0.42) !important;
        }

        .btn-cta {
          background: linear-gradient(90deg, #1d4ed8 0%, #4f46e5 50%, #1d4ed8 100%);
          background-size: 200% auto;
          animation: btnShimmer 3s linear infinite;
          box-shadow: 0 4px 22px rgba(37,99,235,0.55);
          transition: box-shadow 0.2s ease, transform 0.1s ease;
          color: #fff;
          font-weight: 700;
          font-size: 0.875rem;
        }
        .btn-cta:hover  { box-shadow: 0 6px 32px rgba(37,99,235,0.7); transform: translateY(-1px); }
        .btn-cta:active { transform: scale(0.97); }

        .scroll-bob { animation: scrollBob 2s ease-in-out infinite; }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px);
          background-size: 38px 38px;
        }

        /* Respect user motion preference */
        @media (prefers-reduced-motion: reduce) {
          .word-in, .fade-up, .fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .accent-text, .orb-a, .orb-b,
          .particle, .beam-ray, .btn-cta, .scroll-bob { animation: none !important; }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{ minHeight: '96vh', paddingTop: '4rem' }}
      >
        {/* ── Campus photo ── */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')` }}
        />

        {/* ── Solid dark overlay — guaranteed contrast ── */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(145deg, rgba(7,9,28,0.97) 0%, rgba(14,20,55,0.95) 50%, rgba(20,35,80,0.91) 100%)' }}
        />

        {/* ── Dot-grid texture ── */}
        <div className="absolute inset-0 dot-grid" />

        {/* ── Light beam (fires once on load) ── */}
        <div className="beam"><div className="beam-ray" /></div>

        {/* ── Ambient orbs ── */}
        <div
          className="absolute -top-40 -left-56 w-[780px] h-[780px] rounded-full orb-a"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 68%)' }}
        />
        <div
          className="absolute -bottom-56 -right-72 w-[900px] h-[900px] rounded-full orb-b"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 68%)' }}
        />

        {/* ── Floating particles ── */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left, top: p.top,
              width: `${p.size}px`, height: `${p.size}px`,
              background: p.hue,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* ── Main content ── */}
        <div
          className="relative flex flex-col items-center text-center max-w-5xl mx-auto px-4 sm:px-6"
          style={{ paddingTop: '6rem', paddingBottom: '5.5rem', zIndex: 2 }}
        >

          {/* Live pill */}
          <div
            className="fade-in relative inline-flex mb-8 cursor-pointer group"
            style={{ animationDelay: '0.05s' }}
          >
            {/* glow halo */}
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'rgba(245,158,11,0.35)' }}
            />
            <div
              className="relative flex items-stretch rounded-full overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span
                className="flex items-center gap-2 px-4 py-2.5 text-white text-[11px] font-black tracking-[0.14em]"
                style={{ background: '#f59e0b' }}
              >
                <span className="live-dot w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                LIVE
              </span>
              <span
                className="flex items-center px-4 py-2.5 text-sm font-medium"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                JEE Main 2026 cutoffs updated for all counselling rounds
              </span>
              <span
                className="flex items-center pr-4 transition-all duration-300 group-hover:translate-x-0.5"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <ChevronRight size={14} strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* ── Headline — word by word 3-D entrance ── */}
          <h1
            className="font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.2rem)' }}
          >
            {/* Line 1 */}
            {(['Find', 'Your', 'Perfect'] as const).map((word, i) => (
              <span
                key={word}
                className="word-in"
                style={{ animationDelay: `${0.15 + i * 0.11}s`, marginRight: '0.22em' }}
              >
                {word}
              </span>
            ))}

            {/* Line 2 — accent */}
            <br />
            <span
              className="word-in accent-text"
              style={{ animationDelay: '0.52s' }}
            >
              Dream College
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="fade-up max-w-xl mx-auto mb-10 leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.18rem)',
              color: 'rgba(193,212,255,0.88)',
              animationDelay: '0.72s',
            }}
          >
            Courses, cutoffs, rankings and expert guidance for{' '}
            <strong style={{ color: '#ffffff' }}>35,000+ colleges</strong>{' '}
            across India — everything to make the right call.
          </p>

          {/* ── Search box ── */}
          <div
            className="fade-up w-full max-w-2xl mx-auto relative"
            style={{ animationDelay: '0.88s' }}
          >
            <form
              onSubmit={handleSubmit}
              className="search-wrap flex items-center bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 22px 60px rgba(0,0,0,0.4)' }}
            >
              <span className="pl-5 pr-2 shrink-0" style={{ color: '#9ca3af' }}>
                <Search size={20} strokeWidth={2} />
              </span>
              <input
                type="text"
                placeholder="Search college, course, or city..."
                value={query}
                onChange={e => handleChange(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                style={{ padding: '1.05rem 0.5rem', fontSize: '0.95rem', color: '#111827' }}
              />
              <button
                type="submit"
                className="btn-cta m-2 px-7 rounded-xl"
                style={{ paddingTop: '0.72rem', paddingBottom: '0.72rem' }}
              >
                Search
              </button>
            </form>

            {/* Live dropdown */}
            {results && results.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden z-30"
                style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.18)', border: '1px solid #f3f4f6' }}
              >
                {results.slice(0, 5).map(c => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/colleges/${c.slug}`)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: c.logoColor }}
                    >
                      {c.logoInitials.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.city}, {c.state} · {c.collegeType}</p>
                    </div>
                    <ChevronRight size={15} className="text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Popular chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span style={{ fontSize: '0.75rem', color: 'rgba(147,197,253,0.72)', fontWeight: 500 }}>
                Popular:
              </span>
              {POPULAR.map(s => (
                <button
                  key={s}
                  onClick={() => navigate(`/colleges?q=${encodeURIComponent(s)}`)}
                  className="transition-all duration-200 hover:-translate-y-px"
                  style={{
                    padding: '0.22rem 0.85rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.16)';
                    el.style.color = '#fff';
                    el.style.borderColor = 'rgba(255,255,255,0.35)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.8)';
                    el.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Stats row ── */}
          <div
            className="fade-up flex items-stretch justify-center mt-16"
            style={{ animationDelay: '1.05s' }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center" style={{ padding: '0 2.8rem' }}>
                  <span
                    className="font-black"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: s.color, lineHeight: 1 }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-semibold tracking-widest uppercase mt-2"
                    style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em' }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="w-px h-12"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.24), transparent)' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Trust bar ── */}
          <div
            className="fade-up flex items-center justify-center gap-3 mt-8"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="flex -space-x-2.5">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    background: color,
                    fontSize: '0.65rem',
                    border: '2px solid rgba(7,9,28,0.75)',
                    zIndex: 5 - i,
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.14)',
                  }}
                >
                  {AVATAR_INITIALS[i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)' }}>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => (
                  <svg key={n} style={{ width: 14, height: 14, flexShrink: 0 }} fill="#fbbf24" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              Trusted by{' '}
              <strong style={{ color: '#fff', fontWeight: 700 }}>5M+ students</strong>
              {' '}across India
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-bob mt-14" style={{ opacity: 0.38 }}>
            <div
              style={{
                width: 22, height: 36,
                borderRadius: 11,
                border: '1.5px solid rgba(255,255,255,0.5)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 6,
              }}
            >
              <div style={{ width: 4, height: 10, borderRadius: 2, background: 'rgba(255,255,255,0.75)' }} />
            </div>
          </div>

        </div>{/* /content */}

        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 120, background: 'linear-gradient(to top, #f9fafb 0%, transparent 100%)' }}
        />
      </section>
    </>
  );
}
