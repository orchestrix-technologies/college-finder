import { Link } from 'react-router-dom';
import { Rocket, ArrowLeft, Sparkles, Bell } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 pt-16 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-indigo-300/30 to-violet-200/20 blur-[80px] animate-blob-shift" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-cyan-200/30 to-blue-100/20 blur-[80px] animate-blob-shift" style={{ animationDelay: '5s' }} />

        <div className="max-w-2xl w-full text-center relative z-10">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white shadow-[0_20px_50px_rgba(79,70,229,0.15)] border border-indigo-50 mb-8 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 relative group">
              <Rocket size={32} className="text-white group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1">
                <Sparkles size={16} className="text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Coming Soon</span>
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto animate-fade-up font-medium" style={{ animationDelay: '200ms' }}>
            {description} We're building something extraordinary to help you navigate your educational journey.
          </p>

          {/* Interactive Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link to="/" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300">
              <ArrowLeft size={18} /> Back to Home
            </Link>
            
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300 group shadow-sm">
              <Bell size={18} className="group-hover:rotate-12 transition-transform" /> Notify Me
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-16 max-w-sm mx-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Development Progress</span>
              <span className="text-indigo-600">85%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full animate-progress-glow" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
