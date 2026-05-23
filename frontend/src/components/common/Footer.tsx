import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_NAME } from '@/config';

const LINKS = {
  'Popular Streams': [
    { label: 'Engineering',           to: '/colleges?type=Engineering' },
    { label: 'Medical & Health',      to: '/colleges?type=Medical' },
    { label: 'Management & MBA',      to: '/colleges?type=Management' },
    { label: 'Law',                   to: '/colleges?type=Law' },
    { label: 'Design & Architecture', to: '/colleges?type=Design' },
    { label: 'Science',               to: '/colleges?type=Science' },
  ],
  'Top Colleges': [
    { label: 'IIT Bombay',      to: '/colleges/iit-bombay' },
    { label: 'IIT Delhi',       to: '/colleges/iit-delhi' },
    { label: 'IISc Bangalore',  to: '/colleges/iisc-bangalore' },
    { label: 'IIM Ahmedabad',   to: '/colleges/iim-ahmedabad' },
    { label: 'AIIMS Delhi',     to: '/colleges/aiims-delhi' },
    { label: 'BITS Pilani',     to: '/colleges/bits-pilani' },
  ],
  'Entrance Exams': [
    { label: 'JEE Main 2026',     to: '/exams/jee-main',     soon: true },
    { label: 'JEE Advanced 2026', to: '/exams/jee-advanced',  soon: true },
    { label: 'NEET 2026',         to: '/exams/neet',          soon: true },
    { label: 'CAT 2026',          to: '/exams/cat',           soon: true },
    { label: 'GATE 2026',         to: '/exams/gate',          soon: true },
    { label: 'CLAT 2026',         to: '/exams/clat',          soon: true },
  ],
  'Quick Links': [
    { label: 'College Predictor',   to: '/tools/predictor', soon: true },
    { label: 'College Comparison',  to: '/compare',         soon: true },
    { label: 'Scholarship Finder',  to: '/scholarships',    soon: true },
    { label: 'Study Abroad',        to: '/study-abroad',    soon: true },
    { label: 'Career Guidance',     to: '/careers',         soon: true },
    { label: 'News & Articles',     to: '/news',            soon: true },
  ],
};

const SOCIALS = [
  {
    label: 'Facebook', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    color: '#1877F2',
  },
  {
    label: 'Twitter/X', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    color: '#1DA1F2',
  },
  {
    label: 'Instagram', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    color: '#E1306C',
  },
  {
    label: 'LinkedIn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    color: '#0A66C2',
  },
  {
    label: 'YouTube', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
    color: '#FF0000',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#06072a] text-slate-300 overflow-hidden">
      {/* Gradient top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #4f46e5, #7c3aed, #0ea5e9, transparent)' }} />

      {/* Background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

      {/* ── Newsletter CTA ── */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-lg">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                Get free college{' '}
                <span style={{ background: 'linear-gradient(135deg,#818cf8,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  counselling
                </span>
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Our experts will help you find the perfect college. No sales pitch, just honest guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto max-w-sm lg:max-w-none">
              <input type="tel" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your mobile number"
                className="flex-1 w-full sm:w-56 px-5 py-3.5 rounded-2xl text-slate-900 text-sm font-medium bg-white/90 border border-white/20 outline-none focus:ring-2 focus:ring-primary-400 transition-all" />
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl whitespace-nowrap transition-all"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                Get Free Session
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                <GraduationCap size={19} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                {APP_NAME}
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              India's most trusted college discovery platform. Helping 5 million+ students find their dream college every year.
            </p>

            <div className="space-y-2.5 text-sm mb-7">
              {[
                { icon: Mail,   text: 'hello@orchestrix.in' },
                { icon: Phone,  text: '1800-120-4567 (Toll-Free)' },
                { icon: MapPin, text: 'Bangalore, Karnataka, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-slate-400">
                  <Icon size={13} className="text-primary-400 shrink-0" />
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(s => (
                <motion.a key={s.label} href={s.href} aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}25`; (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`; (e.currentTarget as HTMLElement).style.color = s.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = ''; }}>
                  <span className="text-slate-400 transition-colors">{s.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title} className="lg:col-span-1">
              <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide"
                style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label} className="flex items-center gap-2">
                    <Link to={item.to}
                      className="text-xs text-slate-400 hover:text-white transition-colors font-medium hover:translate-x-0.5 inline-block transition-transform duration-150">
                      {item.label}
                    </Link>
                    {(item as { soon?: boolean }).soon && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary-900/60 text-primary-400 border border-primary-800/60 uppercase tracking-tight">
                        Soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            © {year} {APP_NAME} Technologies Pvt. Ltd.
            <span className="text-slate-700">·</span>
            Made with <Heart size={11} className="text-rose-500 fill-rose-500" /> in India
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(label => (
              <Link key={label} to={`/${label.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-slate-500 hover:text-white transition-colors font-medium">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
