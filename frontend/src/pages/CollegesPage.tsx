import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, MapPin, TrendingUp, SlidersHorizontal, X,
  ChevronDown, ChevronUp, ArrowUpDown, LayoutGrid, List, Filter
} from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MOCK_COLLEGES, COLLEGE_TYPES, OWNERSHIP_TYPES, STATES, ENTRANCE_EXAMS } from '@/data/mockData';

type SortOption = 'rank' | 'rating' | 'fees_low' | 'fees_high' | 'name';

interface Filters {
  query: string;
  types: string[];
  ownership: string[];
  states: string[];
  exams: string[];
  minRating: number;
  maxFee: number;
  degreeLevel: string[];
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 mb-3 hover:text-primary-700 transition-colors">
        {title}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange, count }: { label: string; checked: boolean; onChange: () => void; count?: number }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${checked ? 'bg-primary-700 border-primary-700' : 'border-gray-300 group-hover:border-primary-400'}`}
        onClick={onChange}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-gray-400">({count})</span>}
    </label>
  );
}

function CollegeListCard({ college, view }: { college: typeof MOCK_COLLEGES[0]; view: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <Link to={`/colleges/${college.slug}`}
        className="group flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200 p-5 hover:-translate-y-0.5">
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md"
          style={{ background: college.logoColor }}>
          {college.logoInitials}
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {college.nirfRanking && (
                  <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                    NIRF #{college.nirfRanking}
                  </span>
                )}
                {college.naacGrade && (
                  <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                    NAAC {college.naacGrade}
                  </span>
                )}
                {college.isPremium && (
                  <span className="text-[11px] bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded-full font-semibold">
                    Premium
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 text-base group-hover:text-primary-700 transition-colors">
                {college.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
                <MapPin size={12} />
                <span>{college.city}, {college.state}</span>
                <span className="mx-1 text-gray-300">·</span>
                <span>{college.collegeType}</span>
                <span className="mx-1 text-gray-300">·</span>
                <span>{college.ownershipType}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Avg Package</p>
                <p className="font-bold text-gray-900 text-base">₹{college.placements[0]?.avgPackageLpa ?? '–'} LPA</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Fee/Year</p>
                <p className="font-bold text-gray-900 text-base">₹{(college.minFeePerYear / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <StarRating rating={college.avgRating} />
              <span className="text-sm font-medium text-gray-700">{college.avgRating}</span>
              <span className="text-sm text-gray-400">({college.totalReviews.toLocaleString()} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {college.entranceExams.slice(0, 3).map(e => (
                <span key={e} className="text-[11px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-100">
                  {e}
                </span>
              ))}
              {college.entranceExams.length > 3 && (
                <span className="text-[11px] text-gray-500">+{college.entranceExams.length - 3}</span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{college.aboutShort}</p>

          <div className="flex items-center gap-2 mt-3">
            <Link to={`/colleges/${college.slug}`}
              className="px-4 py-1.5 text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
              View Details
            </Link>
            <button className="px-4 py-1.5 text-xs font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors">
              Apply Now
            </button>
            <button className="px-4 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Grid Card
  return (
    <Link to={`/colleges/${college.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${college.logoColor}15 0%, ${college.logoColor}30 100%)` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ background: college.logoColor }}>
            {college.logoInitials}
          </div>
        </div>
        {college.nirfRanking && college.nirfRanking <= 25 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp size={9} /> NIRF #{college.nirfRanking}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-primary-700 transition-colors line-clamp-2 mb-1">
          {college.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={10} /><span>{college.city}, {college.state}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <span className="badge bg-blue-50 text-blue-700 border border-blue-100 text-[10px]">{college.collegeType}</span>
          {college.naacGrade && <span className="badge bg-green-50 text-green-700 border border-green-100 text-[10px]">NAAC {college.naacGrade}</span>}
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-3">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-[10px] text-gray-500">Avg Package</p>
            <p className="text-xs font-bold text-gray-900">₹{college.placements[0]?.avgPackageLpa ?? '–'} LPA</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-[10px] text-gray-500">Fee/Year</p>
            <p className="text-xs font-bold text-gray-900">₹{(college.minFeePerYear / 100000).toFixed(1)}L</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <StarRating rating={college.avgRating} />
          <span className="text-xs font-medium text-gray-700">{college.avgRating}</span>
          <span className="text-xs text-gray-400">({college.totalReviews.toLocaleString()})</span>
        </div>

        <div className="flex gap-1.5 mt-auto">
          <button className="flex-1 py-1.5 text-center text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
            Details
          </button>
          <button className="flex-1 py-1.5 text-center text-xs font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors">
            Apply
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function CollegesPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';

  const [filters, setFilters] = useState<Filters>({
    query: initialQuery,
    types: initialType ? [initialType] : [],
    ownership: [],
    states: [],
    exams: [],
    minRating: 0,
    maxFee: 10000000,
    degreeLevel: [],
  });
  const [sort, setSort] = useState<SortOption>('rank');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggle = (field: keyof Pick<Filters, 'types' | 'ownership' | 'states' | 'exams' | 'degreeLevel'>, val: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter((v: string) => v !== val)
        : [...prev[field], val],
    }));
  };

  const filtered = useMemo(() => {
    let result = MOCK_COLLEGES.filter(c => {
      if (filters.query && !c.name.toLowerCase().includes(filters.query.toLowerCase())
        && !c.city.toLowerCase().includes(filters.query.toLowerCase())
        && !c.state.toLowerCase().includes(filters.query.toLowerCase())) return false;
      if (filters.types.length > 0 && !filters.types.some(t => c.collegeType.includes(t))) return false;
      if (filters.ownership.length > 0 && !filters.ownership.some(o => c.ownershipType.includes(o))) return false;
      if (filters.states.length > 0 && !filters.states.includes(c.state)) return false;
      if (filters.exams.length > 0 && !filters.exams.some(e => c.entranceExams.includes(e))) return false;
      if (c.avgRating < filters.minRating) return false;
      if (c.minFeePerYear > filters.maxFee) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sort === 'rank') return (a.nirfRanking || 999) - (b.nirfRanking || 999);
      if (sort === 'rating') return b.avgRating - a.avgRating;
      if (sort === 'fees_low') return a.minFeePerYear - b.minFeePerYear;
      if (sort === 'fees_high') return b.minFeePerYear - a.minFeePerYear;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [filters, sort]);

  const activeFilterCount = filters.types.length + filters.ownership.length + filters.states.length + filters.exams.length;

  const clearAll = () => setFilters({ query: '', types: [], ownership: [], states: [], exams: [], minRating: 0, maxFee: 10000000, degreeLevel: [] });

  const Sidebar = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <Filter size={15} /> Filters
        </h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs text-primary-700 font-semibold hover:underline flex items-center gap-1">
            <X size={12} /> Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search colleges..."
          value={filters.query}
          onChange={e => setFilters(p => ({ ...p, query: e.target.value }))}
          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
        />
      </div>

      <FilterSection title="College Type">
        {COLLEGE_TYPES.slice(0, 8).map(t => (
          <CheckboxItem key={t} label={t} checked={filters.types.includes(t)} onChange={() => toggle('types', t)} />
        ))}
      </FilterSection>

      <FilterSection title="Ownership">
        {OWNERSHIP_TYPES.map(o => (
          <CheckboxItem key={o} label={o} checked={filters.ownership.includes(o)} onChange={() => toggle('ownership', o)} />
        ))}
      </FilterSection>

      <FilterSection title="State / City">
        {STATES.slice(0, 8).map(s => (
          <CheckboxItem key={s} label={s} checked={filters.states.includes(s)} onChange={() => toggle('states', s)} />
        ))}
      </FilterSection>

      <FilterSection title="Entrance Exam">
        {ENTRANCE_EXAMS.slice(0, 8).map(e => (
          <CheckboxItem key={e} label={e} checked={filters.exams.includes(e)} onChange={() => toggle('exams', e)} />
        ))}
      </FilterSection>

      <FilterSection title="Minimum Rating">
        <div className="flex gap-2">
          {[3, 3.5, 4, 4.5].map(r => (
            <button key={r}
              onClick={() => setFilters(p => ({ ...p, minRating: p.minRating === r ? 0 : r }))}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${filters.minRating === r ? 'bg-primary-700 text-white border-primary-700' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}>
              {r}+⭐
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Annual Fee Range" defaultOpen={false}>
        <div className="space-y-2">
          {[
            { label: 'Up to ₹1 Lakh', val: 100000 },
            { label: '₹1–5 Lakh', val: 500000 },
            { label: '₹5–10 Lakh', val: 1000000 },
            { label: '₹10–25 Lakh', val: 2500000 },
            { label: '₹25 Lakh+', val: 10000000 },
          ].map(({ label, val }) => (
            <button key={val}
              onClick={() => setFilters(p => ({ ...p, maxFee: p.maxFee === val ? 10000000 : val }))}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition-all ${filters.maxFee === val ? 'bg-primary-50 border-primary-300 text-primary-700 font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary-700">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Colleges</span>
            {filters.types.length > 0 && <><span>/</span><span className="text-gray-800 font-medium">{filters.types[0]}</span></>}
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {filters.types.length > 0 ? `Top ${filters.types[0]} Colleges in India` : 'Top Colleges in India'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} colleges found · 2024–25 Admission Open
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-gray-500">Active:</span>
            {[...filters.types, ...filters.ownership, ...filters.states, ...filters.exams].map(f => (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-200">
                {f}
                <button onClick={() => {
                  toggle('types', f);
                  toggle('ownership', f);
                  toggle('states', f);
                  toggle('exams', f);
                }}><X size={11} /></button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-red-500 hover:underline">Clear all</button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-card">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-primary-300">
                  <SlidersHorizontal size={14} /> Filters
                  {activeFilterCount > 0 && <span className="w-4 h-4 bg-primary-700 text-white rounded-full text-[10px] flex items-center justify-center">{activeFilterCount}</span>}
                </button>
                <p className="text-sm text-gray-600 hidden sm:block">
                  <span className="font-semibold text-gray-900">{filtered.length}</span> colleges
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown size={14} className="text-gray-400" />
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-primary-300 bg-white cursor-pointer">
                    <option value="rank">Sort by NIRF Rank</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="fees_low">Fee: Low to High</option>
                    <option value="fees_high">Fee: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                  <button onClick={() => setView('list')}
                    className={`p-1 rounded ${view === 'list' ? 'bg-primary-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                    <List size={15} />
                  </button>
                  <button onClick={() => setView('grid')}
                    className={`p-1 rounded ${view === 'grid' ? 'bg-primary-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                    <LayoutGrid size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🎓</p>
                <h3 className="font-bold text-gray-900 text-lg mb-2">No colleges match your filters</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting or clearing your filters</p>
                <button onClick={clearAll} className="btn-primary">Clear All Filters</button>
              </div>
            ) : (
              <div className={view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'}>
                {filtered.map(college => (
                  <CollegeListCard key={college.id} college={college} view={view} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <Sidebar />
            </div>
            <div className="p-4 border-t">
              <button onClick={() => setShowMobileFilters(false)} className="w-full btn-primary justify-center">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
