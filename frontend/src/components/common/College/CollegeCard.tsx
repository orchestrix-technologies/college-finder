import React from "react";

export interface CollegeCardProps {
  logo: string; // URL or base64
  collegeName: string;
  location: string;
  nirfRanking: number;
  examsAccepted: string[];
  numberOfCourses: number;
  brochureUrl: string;
  accentColor?: string; // optional per-card accent
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  logo,
  collegeName,
  location,
  nirfRanking,
  examsAccepted,
  numberOfCourses,
  brochureUrl,
  accentColor = "#1a56db",
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = `${collegeName.replace(/\s+/g, "_")}_Brochure.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cc-card {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-radius: 20px;
          width: 360px;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.04),
            0 8px 32px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .cc-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 20px 48px rgba(0,0,0,0.13),
            0 0 0 1px rgba(0,0,0,0.04);
        }
        .cc-accent-bar { height: 5px; width: 100%; }

        .cc-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 24px 16px;
        }
        .cc-logo-wrap {
          width: 64px; height: 64px;
          border-radius: 14px;
          border: 1.5px solid #e8e8e8;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cc-logo-wrap img { width: 52px; height: 52px; object-fit: contain; }
        .cc-title-block { flex: 1; min-width: 0; }
        .cc-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700;
          color: #0f172a; line-height: 1.3;
          margin: 0 0 5px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cc-location {
          display: flex; align-items: center; gap: 4px;
          font-size: 12.5px; color: #64748b; font-weight: 400;
        }

        .cc-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
          margin: 0 24px;
        }

        .cc-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: #f1f5f9;
          margin: 16px 24px;
          border-radius: 14px; overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .cc-stat {
          background: #ffffff;
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 3px;
        }
        .cc-stat:first-child { border-radius: 13px 0 0 13px; }
        .cc-stat:last-child  { border-radius: 0 13px 13px 0; }
        .cc-stat-label {
          font-size: 10.5px; font-weight: 500;
          color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .cc-stat-value {
          font-size: 22px; font-weight: 600;
          color: #0f172a;
          font-family: 'Playfair Display', serif; line-height: 1;
        }
        .cc-stat-value span {
          font-size: 12px; font-weight: 500; color: #64748b;
          font-family: 'DM Sans', sans-serif; margin-left: 2px;
        }

        .cc-section { padding: 0 24px 16px; }
        .cc-section-label {
          font-size: 10.5px; font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.07em;
          margin-bottom: 8px;
        }
        .cc-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cc-tag {
          font-size: 11.5px; font-weight: 500;
          padding: 4px 10px; border-radius: 100px;
          background: #f0f4ff; color: #3b5bdb;
          border: 1px solid #dbe4ff;
        }
        .cc-tag-more {
          font-size: 11.5px; font-weight: 500;
          padding: 4px 10px; border-radius: 100px;
          background: #f8fafc; color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .cc-footer { padding: 0 24px 22px; }
        .cc-download-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px 0;
          border-radius: 12px; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 600;
          color: #ffffff; cursor: pointer;
          letter-spacing: 0.02em;
          transition: opacity 0.18s ease, transform 0.18s ease;
          position: relative; overflow: hidden;
        }
        .cc-download-btn::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.18s ease;
        }
        .cc-download-btn:hover::after { background: rgba(255,255,255,0.12); }
        .cc-download-btn:active { transform: scale(0.98); }
      `}</style>

      <div className="cc-card">
        <div className="cc-accent-bar" style={{ background: accentColor }} />

        <div className="cc-header">
          <div className="cc-logo-wrap">
            <img src={logo} alt={`${collegeName} logo`} />
          </div>
          <div className="cc-title-block">
            <h2 className="cc-name" title={collegeName}>{collegeName}</h2>
            <div className="cc-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {location}
            </div>
          </div>
        </div>

        <div className="cc-divider" />

        <div className="cc-stats">
          <div className="cc-stat">
            <span className="cc-stat-label">NIRF Ranking</span>
            <div className="cc-stat-value">#{nirfRanking}<span>India</span></div>
          </div>
          <div className="cc-stat">
            <span className="cc-stat-label">Courses</span>
            <div className="cc-stat-value">{numberOfCourses}<span>offered</span></div>
          </div>
        </div>

        <div className="cc-section">
          <div className="cc-section-label">Exams Accepted</div>
          <div className="cc-tags">
            {examsAccepted.slice(0, 4).map((exam) => (
              <span key={exam} className="cc-tag">{exam}</span>
            ))}
            {examsAccepted.length > 4 && (
              <span className="cc-tag-more">+{examsAccepted.length - 4} more</span>
            )}
          </div>
        </div>

        <div className="cc-footer">
          <button
            className="cc-download-btn"
            style={{ background: accentColor }}
            onClick={handleDownload}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Brochure
          </button>
        </div>
      </div>
    </>
  );
};

export default CollegeCard;


// ─── Demo usage (remove in production) ────────────────────────────────────────
export const CollegeCardDemo: React.FC = () => {
  const colleges: CollegeCardProps[] = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/150px-IIT_Madras_Logo.svg.png",
      collegeName: "IIT Madras",
      location: "Chennai, Tamil Nadu",
      nirfRanking: 1,
      examsAccepted: ["JEE Advanced", "GATE", "JAM", "HSEE"],
      numberOfCourses: 120,
      brochureUrl: "https://www.iitm.ac.in/brochure.pdf",
      accentColor: "#1a56db",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/IISc_master_seal_color.svg/150px-IISc_master_seal_color.svg.png",
      collegeName: "Indian Institute of Science",
      location: "Bengaluru, Karnataka",
      nirfRanking: 2,
      examsAccepted: ["KVPY", "JEE Advanced", "GATE", "JEST", "UGC NET", "CEED"],
      numberOfCourses: 85,
      brochureUrl: "https://www.iisc.ac.in/brochure.pdf",
      accentColor: "#0d9488",
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 60%, #f0fdf4 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexWrap: "wrap", gap: "28px", padding: "48px 24px",
    }}>
      {colleges.map((c) => (
        <CollegeCard key={c.collegeName} {...c} />
      ))}
    </div>
  );
};
