import React, { useEffect, useState, useCallback } from "react";
import CollegeCard, { CollegeCardProps } from "./CollegeCard";
import LocationFilter from "../Filters/LocationFilter";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Shape returned by the API (snake_case) — map to CollegeCardProps in the adapter */
export interface CollegeApiResponse {
  id: string;
  logo_url: string;
  name: string;
  location: string;
  nirf_ranking: number;
  exams_accepted: string[];
  total_courses: number;
  brochure_url: string;
  accent_color?: string;
}

type FetchState = "idle" | "loading" | "success" | "error";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_COLLEGES: CollegeApiResponse[] = [
  {
    id: "1",
    logo_url:
      "https://images.seeklogo.com/logo-png/31/1/iit-madras-logo-png_seeklogo-310945.png",
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    nirf_ranking: 1,
    exams_accepted: ["JEE Advanced", "GATE", "JAM", "HSEE"],
    total_courses: 120,
    brochure_url: "https://www.iitm.ac.in/brochure.pdf",
    accent_color: "#1a56db",
  },
  {
    id: "2",
    logo_url:
      "https://iisc.ac.in/wp-content/uploads/2020/08/IISc_Master_Seal.jpg",
    name: "Indian Institute of Science",
    location: "Bengaluru, Karnataka",
    nirf_ranking: 2,
    exams_accepted: ["KVPY", "JEE Advanced", "GATE", "JEST"],
    total_courses: 85,
    brochure_url: "https://www.iisc.ac.in/brochure.pdf",
    accent_color: "#0d9488",
  },
  {
    id: "3",
    logo_url:
      "https://th.bing.com/th/id/OIP.HOvW2ZI6dLPmxpvFXKDhXAHaHa?w=108&h=108&c=1&bgcl=02aa23&r=0&o=7&dpr=1.3&pid=ImgRC&rm=3",
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    nirf_ranking: 4,
    exams_accepted: ["JEE Advanced", "GATE", "JAM"],
    total_courses: 110,
    brochure_url: "https://www.iitd.ac.in/brochure.pdf",
    accent_color: "#7c3aed",
  },
  {
    id: "4",
    logo_url:
      "https://th.bing.com/th/id/OIP.iiU6uJurMBhRyNLhF5N1JwHaHk?w=108&h=108&c=1&bgcl=fe896d&r=0&o=7&dpr=1.3&pid=ImgRC&rm=3",
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    nirf_ranking: 12,
    exams_accepted: ["WBJEE", "JEE Advanced", "GATE"],
    total_courses: 64,
    brochure_url: "https://www.jaduniv.edu.in/brochure.pdf",
    accent_color: "#b45309",
  },
  {
    id: "5",
    logo_url:
      "https://th.bing.com/th/id/ODF.GDxGriMzplQRKx0i2jk6Fg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    nirf_ranking: 27,
    exams_accepted: ["BITSAT"],
    total_courses: 72,
    brochure_url: "https://www.bits-pilani.ac.in/brochure.pdf",
    accent_color: "#0e7490",
  },
  {
    id: "6",
    logo_url:
      "https://th.bing.com/th/id/OIP.f80sZgEQaQgUJc4hu8R3VQHaHa?w=200&h=200&c=10&o=6&dpr=1.3&pid=genserp&rm=2",
    name: "NIT Tiruchirappalli",
    location: "Tiruchirappalli, Tamil Nadu",
    nirf_ranking: 9,
    exams_accepted: ["JEE Main", "GATE", "TANCET"],
    total_courses: 58,
    brochure_url: "https://www.nitt.edu/brochure.pdf",
    accent_color: "#be123c",
  },
];

// ─── API Layer ────────────────────────────────────────────────────────────────
// Swap MOCK_BASE_URL with your real endpoint when ready.
// The adapter fn normalises API shape → CollegeCardProps.

const USE_MOCK = true; // ← set false when real API is ready
const BASE_URL = "https://api.yourapp.com/v1"; // ← replace with real URL

/** Simulates network latency for mock mode */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchColleges(): Promise<CollegeApiResponse[]> {
  if (USE_MOCK) {
    await delay(1200); // simulate realistic latency
    return MOCK_COLLEGES;
  }

  const res = await fetch(`${BASE_URL}/colleges`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,  // ← add auth header when needed
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch colleges: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.colleges as CollegeApiResponse[]; // adjust key to match your API shape
}

/** Adapter: maps API response shape → CollegeCardProps */
function toCardProps(college: CollegeApiResponse): CollegeCardProps & { id: string } {
  return {
    id: college.id,
    logo: college.logo_url,
    collegeName: college.name,
    location: college.location,
    nirfRanking: college.nirf_ranking,
    examsAccepted: college.exams_accepted,
    numberOfCourses: college.total_courses,
    brochureUrl: college.brochure_url,
    accentColor: college.accent_color,
  };
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard: React.FC = () => (
  <>
    <style>{`
      @keyframes cl-shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .cl-skeleton {
        background: #fff;
        border-radius: 20px;
        width: 360px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07),
                    0 0 0 1px rgba(0,0,0,0.04);
        overflow: hidden;
        padding-bottom: 22px;
      }
      .cl-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 600px 100%;
        animation: cl-shimmer 1.4s infinite linear;
        border-radius: 8px;
      }
      .cl-sk-bar  { height: 5px; border-radius: 0; }
      .cl-sk-head { display: flex; gap: 14px; padding: 22px 24px 16px; }
      .cl-sk-logo { width: 64px; height: 64px; border-radius: 14px; flex-shrink: 0; }
      .cl-sk-title{ flex: 1; display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }
      .cl-sk-line { height: 14px; }
      .cl-sk-divider { height: 1px; margin: 0 24px 16px; border-radius: 2px; }
      .cl-sk-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 0 24px 16px; }
      .cl-sk-stat { height: 56px; border-radius: 12px; }
      .cl-sk-tags { display: flex; gap: 6px; padding: 0 24px 16px; }
      .cl-sk-tag { height: 26px; width: 72px; border-radius: 100px; }
      .cl-sk-btn { height: 44px; margin: 0 24px; border-radius: 12px; }
    `}</style>
    <div className="cl-skeleton">
      <div className="cl-shimmer cl-sk-bar" />
      <div className="cl-sk-head">
        <div className="cl-shimmer cl-sk-logo" />
        <div className="cl-sk-title">
          <div className="cl-shimmer cl-sk-line" style={{ width: "75%" }} />
          <div className="cl-shimmer cl-sk-line" style={{ width: "50%" }} />
        </div>
      </div>
      <div className="cl-shimmer cl-sk-divider" />
      <div className="cl-sk-stats">
        <div className="cl-shimmer cl-sk-stat" />
        <div className="cl-shimmer cl-sk-stat" />
      </div>
      <div className="cl-sk-tags">
        {[80, 64, 72, 56].map((w, i) => (
          <div key={i} className="cl-shimmer cl-sk-tag" style={{ width: w }} />
        ))}
      </div>
      <div className="cl-shimmer cl-sk-btn" />
    </div>
  </>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div style={{ textAlign: "center", padding: "64px 24px", color: "#64748b" }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginBottom: 16 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, margin: 0 }}>
      No colleges found
    </p>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, margin: "6px 0 0", color: "#94a3b8" }}>
      Try adjusting your filters or check back later.
    </p>
  </div>
);

// ─── Error State ──────────────────────────────────────────────────────────────

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div style={{ textAlign: "center", padding: "64px 24px" }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginBottom: 16 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
      color: "#0f172a", margin: "0 0 6px" }}>
      Something went wrong
    </p>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748b",
      margin: "0 0 20px" }}>
      {message}
    </p>
    <button
      onClick={onRetry}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 600,
        padding: "10px 24px",
        borderRadius: 10, border: "1px solid #e2e8f0",
        background: "#fff", color: "#0f172a",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
    >
      Try again
    </button>
  </div>
);

// ─── CollegeList ──────────────────────────────────────────────────────────────

const CollegeList: React.FC = () => {
  const [colleges, setColleges] = useState<(CollegeCardProps & { id: string })[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loadColleges = useCallback(async () => {
    setFetchState("loading");
    setErrorMessage("");
    try {
      const raw = await fetchColleges();
      setColleges(raw.map(toCardProps));
      setFetchState("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    loadColleges();
  }, [loadColleges]);

  // ── Render helpers ──

  const renderGrid = () => {
    if (fetchState === "loading") {
      return Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />);
    }
    if (fetchState === "error") {
      return (
        <div style={{ gridColumn: "1 / -1" }}>
          <ErrorState message={errorMessage} onRetry={loadColleges} />
        </div>
      );
    }
    if (fetchState === "success" && colleges.length === 0) {
      return (
        <div style={{ gridColumn: "1 / -1" }}>
          <EmptyState />
        </div>
      );
    }
    return colleges.map(({ id, ...props }) => (
      <CollegeCard key={id} {...props} />
    ));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cl-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 48px 32px;
          box-sizing: border-box;
        }
        .cl-header {
          max-width: 1200px;
          margin: 0 auto 36px;
        }
        .cl-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 700;
          color: #0f172a; margin: 0 0 8px;
        }
        .cl-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: #64748b; font-weight: 400;
          margin: 0;
        }
        .cl-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          color: #3b5bdb;
          background: #f0f4ff;
          border: 1px solid #dbe4ff;
          border-radius: 100px;
          padding: 4px 12px;
          margin-top: 14px;
        }
        .cl-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
          justify-items: center;
        }
      `}</style>

      <div className="cl-page">
        <div className="cl-header">
          <h1 className="cl-title">Explore Colleges</h1>
          <p className="cl-subtitle">
            Discover top institutions ranked by NIRF — compare exams, courses &amp; more.
          </p>

          <LocationFilter/>
          {fetchState === "success" && colleges.length > 0 && (
            <div className="cl-count-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              {colleges.length} college{colleges.length !== 1 ? "s" : ""} found
            </div>
          )}
        </div>

        <div className="cl-grid">{renderGrid()}</div>
      </div>
    </>
  );
};

export default CollegeList;
