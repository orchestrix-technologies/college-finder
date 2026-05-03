import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin, Star, Phone, Globe, Mail, Award, TrendingUp, Users, BookOpen,
  Building2, ChevronRight, Download, Heart, GitCompare, Share2,
  CheckCircle, ExternalLink, Calendar, BarChart2, Shield, Zap,
  Home, UserCheck, ThumbsUp, AlertCircle
} from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getCollegeBySlug } from '@/data/mockData';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses & Fees' },
  { id: 'admission', label: 'Admission' },
  { id: 'placements', label: 'Placements' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rankings', label: 'Rankings' },
  { id: 'scholarships', label: 'Scholarships' },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-36 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-8 text-right">{value}</span>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-card">
      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-700 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-bold text-gray-900 text-sm">{value}</p>
        {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// ── TABS ─────────────────────────────────────────────────────────────────────

function OverviewTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  return (
    <div className="space-y-8">
      {/* About */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-primary-600" /> About {college.shortName}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">{college.description}</p>
      </div>

      {/* Key Highlights */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Key Highlights</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={<Users size={18} />} label="Total Students" value={college.totalStudents.toLocaleString()} />
          <StatCard icon={<UserCheck size={18} />} label="Total Faculty" value={college.totalFaculty} sub={`${college.phdFacultyPercent}% with Ph.D`} />
          <StatCard icon={<BarChart2 size={18} />} label="Student: Faculty" value={college.studentFacultyRatio} />
          <StatCard icon={<Home size={18} />} label="Campus Size" value={`${college.campusSizeAcres} Acres`} />
          <StatCard icon={<BookOpen size={18} />} label="Departments" value={college.totalDepartments} />
          <StatCard icon={<Globe size={18} />} label="International Students" value={college.internationalStudents} />
          <StatCard icon={<Award size={18} />} label="NAAC Grade" value={`${college.naacGrade} (${college.naacCgpa})`} sub={`${college.naacYear}`} />
          <StatCard icon={<TrendingUp size={18} />} label="NIRF Ranking" value={`#${college.nirfRanking}`} sub={college.nirfCategory} />
        </div>
      </div>

      {/* Accreditations */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-primary-600" /> Approvals & Accreditations
        </h2>
        <div className="flex flex-wrap gap-3">
          {college.naacGrade && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle size={16} className="text-green-600" />
              <div>
                <p className="text-xs font-bold text-green-800">NAAC {college.naacGrade}</p>
                <p className="text-[10px] text-green-600">CGPA {college.naacCgpa} · {college.naacYear}</p>
              </div>
            </div>
          )}
          {college.isAicte && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl">
              <CheckCircle size={16} className="text-blue-600" />
              <div>
                <p className="text-xs font-bold text-blue-800">AICTE Approved</p>
                <p className="text-[10px] text-blue-600">All India Council</p>
              </div>
            </div>
          )}
          {college.isUgc && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl">
              <CheckCircle size={16} className="text-purple-600" />
              <div>
                <p className="text-xs font-bold text-purple-800">UGC Recognized</p>
                <p className="text-[10px] text-purple-600">University Grants Commission</p>
              </div>
            </div>
          )}
          {college.isNba && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
              <CheckCircle size={16} className="text-amber-600" />
              <div>
                <p className="text-xs font-bold text-amber-800">NBA Accredited</p>
                <p className="text-[10px] text-amber-600">National Board</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Vision
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed italic">"{college.vision}"</p>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> Mission
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed italic">"{college.mission}"</p>
        </div>
      </div>

      {/* Notable Alumni */}
      {college.notableAlumni.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star size={18} className="text-amber-500" /> Notable Alumni
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {college.notableAlumni.map(a => (
              <div key={a.name} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.achievement}</p>
                  <p className="text-[11px] text-primary-600 mt-1">Class of {a.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-primary-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm text-gray-800">{college.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-primary-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <a href={`tel:${college.phone}`} className="text-sm text-gray-800 hover:text-primary-700">{college.phone}</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <a href={`mailto:${college.email}`} className="text-sm text-gray-800 hover:text-primary-700">{college.email}</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-primary-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Website</p>
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-700 hover:underline flex items-center gap-1">
                Visit Website <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
        {/* Social Links */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          {college.linkedin && (
            <a href={college.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-700 transition-all" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          )}
          {college.youtube && (
            <a href={college.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-700 transition-all" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            </a>
          )}
          <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-sky-100 hover:text-sky-600 transition-all" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function CoursesTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const [filter, setFilter] = useState<string>('All');
  const levels = ['All', ...Array.from(new Set(college.courses.map(c => c.degreeLevel)))];
  const shown = filter === 'All' ? college.courses : college.courses.filter(c => c.degreeLevel === filter);

  return (
    <div className="space-y-6">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {levels.map(l => (
          <button key={l} onClick={() => setFilter(l)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === l ? 'bg-primary-700 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {shown.map(course => (
          <div key={course.id} className="card p-5 hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`badge text-xs font-semibold ${course.degreeLevel === 'UG' ? 'bg-blue-50 text-blue-700 border border-blue-200' : course.degreeLevel === 'PG' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {course.degreeLevel}
                  </span>
                  <span className="badge bg-gray-50 text-gray-600 border border-gray-200 text-xs">{course.degreeType}</span>
                  <span className="badge bg-green-50 text-green-700 border border-green-200 text-xs">{course.mode}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{course.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {course.totalSeats} Seats</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Fees</p>
                  <p className="font-bold text-gray-900">₹{(course.totalFee / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-500">₹{(course.feePerYear / 100000).toFixed(1)}L/yr</p>
                </div>
                <button className="btn-primary text-xs px-4 py-2">Apply Now</button>
              </div>
            </div>

            {/* Placement */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-[11px] text-gray-500">Avg Package</p>
                  <p className="font-bold text-green-700 text-sm">₹{course.avgPackageLpa} LPA</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-[11px] text-gray-500">Highest Package</p>
                  <p className="font-bold text-blue-700 text-sm">₹{course.highestPackageLpa} Cr</p>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <p className="text-[11px] text-gray-500">Placement %</p>
                  <p className="font-bold text-amber-700 text-sm">{course.placementPercentage}%</p>
                </div>
              </div>
            </div>

            {/* Exams */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 font-medium">Accepts:</span>
              {course.examsAccepted.map(e => (
                <span key={e} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-100">{e}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdmissionTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  return (
    <div className="space-y-6">
      {/* Admission Process */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle size={18} className="text-primary-600" /> Admission Process
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-6">
            {college.admissionProcess.map((step, i) => (
              <div key={step.step} className="relative flex gap-4 pl-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 ${i === 0 ? 'bg-primary-700 text-white' : 'bg-white border-2 border-primary-200 text-primary-700'}`}>
                  {step.step}
                </div>
                <div className="flex-1 pb-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Entrance Exams */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award size={18} className="text-primary-600" /> Entrance Exams Accepted
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {college.entranceExams.map(exam => (
            <div key={exam} className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl border border-primary-100">
              <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {exam.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{exam}</p>
                <p className="text-[10px] text-gray-500">Accepted</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Cutoffs Sample */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <BarChart2 size={18} className="text-primary-600" /> Expected Cutoff 2024
        </h2>
        <p className="text-xs text-gray-500 mb-4">Illustrative cutoff ranges based on previous year data</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2.5 font-semibold text-gray-700 rounded-l-lg">Program</th>
                <th className="text-center px-3 py-2.5 font-semibold text-gray-700">General</th>
                <th className="text-center px-3 py-2.5 font-semibold text-gray-700">OBC</th>
                <th className="text-center px-3 py-2.5 font-semibold text-gray-700">SC</th>
                <th className="text-center px-3 py-2.5 font-semibold text-gray-700 rounded-r-lg">ST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {college.courses.slice(0, 4).map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-gray-800 font-medium max-w-[200px] truncate">{c.name}</td>
                  <td className="px-3 py-3 text-center text-gray-700">
                    {c.examsAccepted[0] === 'JEE Advanced' ? `${Math.floor(Math.random() * 200 + 100)}–${Math.floor(Math.random() * 300 + 400)}` :
                      c.examsAccepted[0] === 'NEET-UG' ? `${Math.floor(Math.random() * 100 + 650)}–720` : '90–99%ile'}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {c.examsAccepted[0] === 'JEE Advanced' ? `${Math.floor(Math.random() * 400 + 600)}–${Math.floor(Math.random() * 300 + 900)}` :
                      c.examsAccepted[0] === 'NEET-UG' ? `${Math.floor(Math.random() * 80 + 600)}–680` : '80–90%ile'}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {c.examsAccepted[0] === 'JEE Advanced' ? `${Math.floor(Math.random() * 500 + 1200)}–${Math.floor(Math.random() * 500 + 1700)}` :
                      c.examsAccepted[0] === 'NEET-UG' ? `${Math.floor(Math.random() * 100 + 550)}–640` : '70–80%ile'}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {c.examsAccepted[0] === 'JEE Advanced' ? `${Math.floor(Math.random() * 1000 + 2500)}–${Math.floor(Math.random() * 1000 + 3500)}` :
                      c.examsAccepted[0] === 'NEET-UG' ? `${Math.floor(Math.random() * 100 + 500)}–580` : '60–70%ile'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-amber-600 mt-3 flex items-center gap-1">
          <AlertCircle size={12} /> This is illustrative data. Always refer to official counselling portals for exact cutoffs.
        </p>
      </div>
    </div>
  );
}

function PlacementsTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const latest = college.placements[0];
  if (!latest) return <div className="card p-8 text-center text-gray-500">Placement data not available</div>;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Average Package', value: `₹${latest.avgPackageLpa} LPA`, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'Highest Package', value: `₹${latest.highestPackageLpa} LPA`, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Placement Rate', value: `${latest.placementPercentage}%`, color: 'text-primary-700', bg: 'bg-primary-50 border-primary-200' },
          { label: 'Companies Visited', value: latest.totalCompanies.toString(), color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
        ].map(s => (
          <div key={s.label} className={`card p-5 border ${s.bg} text-center`}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">Batch of {latest.year}</p>
          </div>
        ))}
      </div>

      {/* International Placements */}
      {latest.internationalOffers > 0 && (
        <div className="card p-5 flex items-center gap-4 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center text-white text-xl shrink-0">🌍</div>
          <div>
            <p className="font-bold text-gray-900">{latest.internationalOffers} International Offers</p>
            <p className="text-sm text-gray-600">Highest International Package: <span className="font-semibold text-primary-700">₹{latest.highestIntlPackageLpa} LPA</span></p>
          </div>
        </div>
      )}

      {/* Year-wise Trend */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary-600" /> Year-wise Placement Trend
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 rounded-lg">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Year</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Placed</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Placement %</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Avg Package</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Median</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Highest</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">Companies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {college.placements.map(p => (
                <tr key={p.year} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{p.year}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{p.totalPlaced.toLocaleString()} / {p.totalEligible.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${p.placementPercentage}%` }} />
                      </div>
                      <span className="font-medium text-primary-700">{p.placementPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">₹{p.avgPackageLpa} LPA</td>
                  <td className="px-4 py-3 text-center text-gray-600">₹{p.medianPackageLpa} LPA</td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-700">₹{p.highestPackageLpa} LPA</td>
                  <td className="px-4 py-3 text-center text-gray-700">{p.totalCompanies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Recruiters */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-primary-600" /> Top Recruiters
        </h2>
        <div className="flex flex-wrap gap-3">
          {college.topRecruiters.map(company => (
            <div key={company}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all cursor-pointer">
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const avgRatings = {
    placement: college.reviews.reduce((s, r) => s + r.placementRating, 0) / college.reviews.length,
    faculty: college.reviews.reduce((s, r) => s + r.facultyRating, 0) / college.reviews.length,
    infrastructure: college.reviews.reduce((s, r) => s + r.infrastructureRating, 0) / college.reviews.length,
    campusLife: college.reviews.reduce((s, r) => s + r.campusLifeRating, 0) / college.reviews.length,
    valueForMoney: college.reviews.reduce((s, r) => s + r.valueForMoneyRating, 0) / college.reviews.length,
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall */}
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-6xl font-extrabold text-gray-900 mb-2">{college.avgRating}</p>
            <StarRating rating={college.avgRating} size="lg" />
            <p className="text-gray-500 text-sm mt-2">{college.totalReviews.toLocaleString()} student reviews</p>
            <div className="mt-4 flex flex-col gap-1 w-full max-w-xs">
              {[5, 4, 3, 2, 1].map(star => {
                const pct = Math.round((college.reviews.filter(r => Math.round(r.overallRating) === star).length / Math.max(college.reviews.length, 1)) * 100) || (star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 3);
                return (
                  <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-3 text-right">{star}</span>
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-7">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3 py-4">
            <RatingBar label="Placements & Salary" value={Number(avgRatings.placement.toFixed(1))} />
            <RatingBar label="Faculty & Teaching" value={Number(avgRatings.faculty.toFixed(1))} />
            <RatingBar label="Infrastructure" value={Number(avgRatings.infrastructure.toFixed(1))} />
            <RatingBar label="Campus Life" value={Number(avgRatings.campusLife.toFixed(1))} />
            <RatingBar label="Value for Money" value={Number(avgRatings.valueForMoney.toFixed(1))} />
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {college.reviews.map(review => (
          <div key={review.id} className="card p-6">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                    {review.isVerified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-200">
                        <UserCheck size={9} /> Verified
                      </span>
                    )}
                    {review.isCurrentStudent && (
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">Current Student</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{review.program} · Batch {review.batch}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-gray-900">{review.overallRating}</span>
                  <StarRating rating={review.overallRating} />
                </div>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-3">{review.title}</h4>

            {/* Sub-ratings */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              {[
                { label: 'Placements', val: review.placementRating },
                { label: 'Faculty', val: review.facultyRating },
                { label: 'Infrastructure', val: review.infrastructureRating },
                { label: 'Campus Life', val: review.campusLifeRating },
                { label: 'Value for Money', val: review.valueForMoneyRating },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 w-24 shrink-0">{r.label}</span>
                  <StarRating rating={r.val} />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                  <ThumbsUp size={11} /> Pros
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{review.pros}</p>
              </div>
              {review.cons && (
                <div>
                  <p className="text-xs font-semibold text-red-500 mb-1">Cons</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.cons}</p>
                </div>
              )}
              {review.advice && (
                <div>
                  <p className="text-xs font-semibold text-blue-600 mb-1">Advice to Students</p>
                  <p className="text-sm text-gray-600 leading-relaxed italic">"{review.advice}"</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-700 transition-colors">
                <ThumbsUp size={14} /> Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const categories = Array.from(new Set(college.facilities.map(f => f.category)));

  return (
    <div className="space-y-6">
      {/* Facilities by Category */}
      {categories.map(cat => (
        <div key={cat} className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide text-gray-500">
            {cat}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {college.facilities.filter(f => f.category === cat).map(f => (
              <div key={f.name} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-primary-50 hover:border-primary-200 transition-all">
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-medium text-gray-700">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Hostel Section */}
      {college.hostels.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Home size={18} className="text-primary-600" /> Hostel Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college.hostels.map((hostel, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{hostel.name}</h3>
                  <span className={`badge text-xs font-semibold ${hostel.type === 'Boys' ? 'bg-blue-50 text-blue-700 border border-blue-200' : hostel.type === 'Girls' ? 'bg-pink-50 text-pink-700 border border-pink-200' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
                    {hostel.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Total Seats</p>
                    <p className="font-bold text-gray-900">{hostel.totalSeats.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Fee/Month</p>
                    <p className="font-bold text-gray-900">₹{hostel.feeMonthly.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hostel.amenities.map(a => (
                    <span key={a} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                      <CheckCircle size={9} /> {a}
                    </span>
                  ))}
                </div>
                {hostel.isOnCampus && (
                  <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
                    <MapPin size={10} /> On-campus hostel
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const GALLERY_IMAGES = [
    { url: `https://picsum.photos/seed/${college.slug}1/600/400`, label: 'Main Campus' },
    { url: `https://picsum.photos/seed/${college.slug}2/600/400`, label: 'Library' },
    { url: `https://picsum.photos/seed/${college.slug}3/600/400`, label: 'Research Lab' },
    { url: `https://picsum.photos/seed/${college.slug}4/600/400`, label: 'Hostel Block' },
    { url: `https://picsum.photos/seed/${college.slug}5/600/400`, label: 'Sports Complex' },
    { url: `https://picsum.photos/seed/${college.slug}6/600/400`, label: 'Auditorium' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {GALLERY_IMAGES.map(img => (
        <div key={img.label} className="group relative overflow-hidden rounded-xl aspect-video bg-gray-100 cursor-pointer hover:shadow-lg transition-all">
          <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-white text-sm font-medium">{img.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RankingsTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const allRankings = [
    { body: 'NIRF', category: college.nirfCategory, rank: college.nirfRanking, year: college.nirfYear, type: 'National' },
    ...college.otherRankings.map(r => ({ ...r, type: r.body.includes('QS') || r.body.includes('THE') ? 'Global' : 'National' })),
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allRankings.map((r, i) => (
          <div key={i} className="card p-5 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${r.type === 'Global' ? 'bg-blue-50 border border-blue-200' : 'bg-amber-50 border border-amber-200'}`}>
              <span className={`text-xl font-extrabold ${r.type === 'Global' ? 'text-blue-700' : 'text-amber-700'}`}>#{r.rank}</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{r.body}</p>
              <p className="text-xs text-gray-500">{r.category} · {r.year}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${r.type === 'Global' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                {r.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipsTab({ college }: { college: NonNullable<ReturnType<typeof getCollegeBySlug>> }) {
  const colors: Record<string, string> = {
    'Merit': 'bg-amber-50 border-amber-200',
    'Need': 'bg-green-50 border-green-200',
    'Merit + Need': 'bg-blue-50 border-blue-200',
    'Category': 'bg-purple-50 border-purple-200',
    'Sports': 'bg-orange-50 border-orange-200',
  };

  return (
    <div className="space-y-4">
      {college.scholarships.map((s, i) => (
        <div key={i} className={`card p-5 border ${colors[s.type] || 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 bg-white rounded-full border border-current text-gray-600">{s.type}</span>
                {s.renewable && <span className="text-xs font-semibold text-green-600 bg-white px-2 py-0.5 rounded-full border border-green-300">🔄 Renewable</span>}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{s.eligibility}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-extrabold text-primary-700">{s.amountDesc}</p>
              <p className="text-xs text-gray-500">per year</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CollegeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [stickyHeader, setStickyHeader] = useState(false);
  const [saved, setSaved] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const college = getCollegeBySlug(slug || '');

  useEffect(() => {
    const onScroll = () => setStickyHeader(window.scrollY > 350);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 flex flex-col items-center justify-center">
          <p className="text-6xl mb-4">🎓</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">College not found</h1>
          <p className="text-gray-500 mb-6">The college you're looking for doesn't exist</p>
          <Link to="/colleges" className="btn-primary">Browse All Colleges</Link>
        </div>
      </div>
    );
  }

  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const tabContent: Record<string, React.ReactNode> = {
    overview: <OverviewTab college={college} />,
    courses: <CoursesTab college={college} />,
    admission: <AdmissionTab college={college} />,
    placements: <PlacementsTab college={college} />,
    reviews: <ReviewsTab college={college} />,
    facilities: <FacilitiesTab college={college} />,
    gallery: <GalleryTab college={college} />,
    rankings: <RankingsTab college={college} />,
    scholarships: <ScholarshipsTab college={college} />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── HERO / COVER ── */}
      <div className="pt-16">
        {/* Cover Image */}
        <div className="relative h-52 sm:h-72 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${college.logoColor} 0%, ${college.logoColor}aa 60%, ${college.logoColor}55 100%)` }}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* College Info Banner */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link to="/" className="hover:text-primary-700">Home</Link>
              <ChevronRight size={12} />
              <Link to="/colleges" className="hover:text-primary-700">Colleges</Link>
              <ChevronRight size={12} />
              <span className="text-gray-800">{college.shortName}</span>
            </nav>

            <div className="flex items-start gap-5 flex-wrap">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white shrink-0"
                style={{ background: college.logoColor, marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
                {college.logoInitials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {college.nirfRanking && (
                        <span className="badge bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                          <TrendingUp size={10} className="mr-1" /> NIRF #{college.nirfRanking} · {college.nirfCategory}
                        </span>
                      )}
                      {college.naacGrade && (
                        <span className="badge bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                          NAAC {college.naacGrade}
                        </span>
                      )}
                      {college.isPremium && (
                        <span className="badge bg-primary-50 text-primary-700 border border-primary-200 text-xs font-semibold">
                          ⭐ Premium
                        </span>
                      )}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{college.name}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {college.address}</span>
                      <span className="text-gray-300">·</span>
                      <span>{college.collegeType}</span>
                      <span className="text-gray-300">·</span>
                      <span>Est. {college.establishedYear}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSaved(!saved)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${saved ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:border-red-200'}`}>
                      <Heart size={14} fill={saved ? 'currentColor' : 'none'} />
                      {saved ? 'Saved' : 'Save'}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-primary-300 bg-white transition-all">
                      <GitCompare size={14} /> Compare
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-gray-300 bg-white transition-all">
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>

                {/* Rating + Quick Stats */}
                <div className="flex items-center gap-6 mt-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-gray-900">{college.avgRating}</span>
                    <StarRating rating={college.avgRating} size="md" />
                    <span className="text-sm text-gray-500">({college.totalReviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users size={14} /> {college.totalStudents.toLocaleString()} Students
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <BookOpen size={14} /> {college.courses.length} Courses
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <TrendingUp size={14} /> ₹{college.placements[0]?.avgPackageLpa} LPA Avg Package
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY TABS ── */}
      <div
        ref={tabsRef}
        className={`bg-white border-b border-gray-100 z-40 transition-all duration-300 ${stickyHeader ? 'sticky top-16 shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToTab(tab.id)}
                className={activeTab === tab.id ? 'tab-btn-active' : 'tab-btn'}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-7">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {tabContent[activeTab]}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Apply CTA */}
              <div className="card p-5 bg-gradient-to-br from-primary-700 to-primary-900 border-0 text-white">
                <h3 className="font-bold text-lg mb-1">Apply for Admission</h3>
                <p className="text-primary-200 text-sm mb-4">Get personalized guidance and apply to {college.shortName}</p>
                <button className="w-full py-2.5 bg-white text-primary-800 font-bold rounded-xl text-sm hover:bg-primary-50 transition-colors mb-2">
                  Apply Now
                </button>
                <button className="w-full py-2.5 bg-primary-600/50 text-white font-semibold rounded-xl text-sm hover:bg-primary-600 transition-colors border border-primary-500 flex items-center justify-center gap-2">
                  <Download size={14} /> Download Brochure
                </button>
              </div>

              {/* Quick Info */}
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Quick Info</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Type', value: `${college.ownershipType} · ${college.collegeType}` },
                    { label: 'Established', value: college.establishedYear },
                    { label: 'Location', value: `${college.city}, ${college.state}` },
                    { label: 'Fee Range', value: `₹${(college.minFeePerYear / 100000).toFixed(1)}L – ₹${(college.maxFeePerYear / 100000).toFixed(1)}L/yr` },
                    { label: 'Avg Package', value: `₹${college.placements[0]?.avgPackageLpa ?? '–'} LPA` },
                    { label: 'NIRF Rank', value: `#${college.nirfRanking} (${college.nirfCategory})` },
                    { label: 'NAAC', value: `${college.naacGrade} · ${college.naacCgpa} CGPA` },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-900 text-right max-w-[55%]">{String(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquire Form */}
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Get Free Counselling</h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Your Name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-300" />
                  <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-300" />
                  <input type="tel" placeholder="Mobile Number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-300" />
                  <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition-colors">
                    Get Free Guidance
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-3 text-center">
                  🔒 No spam. We respect your privacy.
                </p>
              </div>

              {/* Website Link */}
              <a href={college.website} target="_blank" rel="noopener noreferrer"
                className="card p-4 flex items-center gap-3 hover:shadow-card-hover transition-all group">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                  <Globe size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-700">Official Website</p>
                  <p className="text-xs text-gray-500 truncate">{college.website}</p>
                </div>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-primary-600" />
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
