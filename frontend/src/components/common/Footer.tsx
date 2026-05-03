import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-700 hover:text-white transition-all">
      {children}
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    'Popular Streams': [
      { label: 'Engineering', to: '/colleges?type=Engineering' },
      { label: 'Medical & Health Sciences', to: '/colleges?type=Medical' },
      { label: 'Management & MBA', to: '/colleges?type=Management' },
      { label: 'Law', to: '/colleges?type=Law' },
      { label: 'Design & Architecture', to: '/colleges?type=Design' },
      { label: 'Science', to: '/colleges?type=Science' },
    ],
    'Top Colleges': [
      { label: 'IIT Bombay', to: '/colleges/iit-bombay' },
      { label: 'IIT Delhi', to: '/colleges/iit-delhi' },
      { label: 'IISc Bangalore', to: '/colleges/iisc-bangalore' },
      { label: 'IIM Ahmedabad', to: '/colleges/iim-ahmedabad' },
      { label: 'AIIMS Delhi', to: '/colleges/aiims-delhi' },
      { label: 'BITS Pilani', to: '/colleges/bits-pilani' },
    ],
    'Entrance Exams': [
      { label: 'JEE Main 2025', to: '/exams/jee-main' },
      { label: 'JEE Advanced 2025', to: '/exams/jee-advanced' },
      { label: 'NEET 2025', to: '/exams/neet' },
      { label: 'CAT 2025', to: '/exams/cat' },
      { label: 'GATE 2025', to: '/exams/gate' },
      { label: 'CLAT 2025', to: '/exams/clat' },
    ],
    'Quick Links': [
      { label: 'College Predictor', to: '/tools/predictor' },
      { label: 'College Comparison', to: '/compare' },
      { label: 'Scholarship Finder', to: '/scholarships' },
      { label: 'Study Abroad', to: '/study-abroad' },
      { label: 'Career Guidance', to: '/careers' },
      { label: 'News & Articles', to: '/news' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Not sure which college is right for you?
          </h2>
          <p className="text-primary-200 mb-6 text-base">
            Get free personalised counselling from our experts
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="px-4 py-3 rounded-lg text-gray-900 text-sm w-full sm:w-64 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm">
              Get Free Counselling
            </button>
          </div>
          <p className="text-primary-300 text-xs mt-3">
            🔒 Your information is safe with us. We never spam.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">EduReach</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              India's most trusted college discovery platform. Helping 5 million+ students find their dream college every year.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-primary-400" />
                <span>hello@edureach.in</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-primary-400" />
                <span>1800-120-4567 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} className="text-primary-400" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} EduReach Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-300">Terms of Use</Link>
            <Link to="/sitemap" className="text-xs text-gray-500 hover:text-gray-300">Sitemap</Link>
          </div>
          <div className="flex items-center gap-3">
            <SocialIcon href="#" label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </SocialIcon>
            <SocialIcon href="#" label="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </SocialIcon>
            <SocialIcon href="#" label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
