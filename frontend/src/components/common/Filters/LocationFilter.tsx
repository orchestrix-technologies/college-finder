import { useState, useRef, useEffect, CSSProperties } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────

const THEME = {
  primary: "#1E3A8A",
  primaryLight: "#EFF4FF",
  primaryMid: "#BFCFEF",
  primaryActive: "#D6E3FF",
  primaryActiveBorder: "#93B0E8",
  primaryDark: "#162D6E",
  border: "#D1D5DB",
  borderHover: "#9CA3AF",
  text: "#111827",
  textMuted: "#6B7280",
  divider: "#E5E7EB",
  white: "#FFFFFF",
  shadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)",
  shadowHover: "0 2px 8px rgba(0,0,0,0.10)",
  shadowOpen: "0 0 0 3px rgba(30,58,138,0.12), 0 4px 16px rgba(0,0,0,0.09)",
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Location {
  id: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LOCATIONS: Location[] = [
  { id: "bangalore", label: "Bangalore" },
  { id: "mysore",    label: "Mysore"    },
  { id: "mangalore", label: "Mangalore" },
  { id: "chennai",   label: "Chennai"   },
];

// ─── Widths ───────────────────────────────────────────────────────────────────

const COLLAPSED_W     = 130;
const COLLAPSED_W_SEL = 152;
const OPTION_W        = 96;
const EXPANDED_EXTRA  = 16;

// ─── Base Styles ──────────────────────────────────────────────────────────────

const BASE: Record<string, CSSProperties> = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    fontFamily: "'Inter', 'DM Sans', 'Segoe UI', sans-serif",
  },
  capsule: {
    display: "flex",
    alignItems: "center",
    height: "38px",
    borderRadius: "999px",
    border: `1.5px solid ${THEME.border}`,
    backgroundColor: THEME.white,
    boxShadow: THEME.shadow,
    cursor: "pointer",
    overflow: "hidden",
    transition:
      "width 0.36s cubic-bezier(0.4,0,0.2,1), border-color 0.2s ease, box-shadow 0.2s ease",
    userSelect: "none" as CSSProperties["userSelect"],
    WebkitUserSelect: "none" as CSSProperties["WebkitUserSelect"],
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "0 13px 0 11px",
    whiteSpace: "nowrap" as CSSProperties["whiteSpace"],
    flexShrink: 0,
  },
  iconWrap: {
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: THEME.text,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    transition: "color 0.15s ease",
  },
  divider: {
    width: "1px",
    height: "20px",
    backgroundColor: THEME.divider,
    flexShrink: 0,
    transition: "opacity 0.2s ease",
  },
  optsList: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "0 8px",
    flexShrink: 0,
    whiteSpace: "nowrap" as CSSProperties["whiteSpace"],
    transition: "opacity 0.25s ease 0.07s",
  },
  optsListHidden: {
    opacity: 0,
    pointerEvents: "none" as CSSProperties["pointerEvents"],
    transition: "opacity 0.1s ease",
  },
  optBtn: {
    display: "flex",
    alignItems: "center",
    padding: "4px 11px",
    borderRadius: "999px",
    border: "1px solid transparent",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "inherit",
    fontWeight: 500,
    color: THEME.textMuted,
    whiteSpace: "nowrap" as CSSProperties["whiteSpace"],
    letterSpacing: "0.01em",
    outline: "none",
    transition:
      "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapPinIcon({ active }: { active: boolean }) {
  const fill = active ? THEME.primary : THEME.textMuted;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.5A3.5 3.5 0 0 0 3.5 5c0 2.625 3.5 7 3.5 7s3.5-4.375 3.5-7A3.5 3.5 0 0 0 7 1.5z"
        fill={fill}
        opacity={active ? 1 : 0.65}
      />
      <circle cx="7" cy="5" r="1.3" fill={THEME.white} />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        flexShrink: 0,
      }}
    >
      <path
        d="M1.5 3.5L5 6.5L8.5 3.5"
        stroke={open ? THEME.primary : THEME.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M8 2L2 8M2 2l6 6"
        stroke={THEME.primary}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Option Button ────────────────────────────────────────────────────────────

interface OptionButtonProps {
  loc: Location;
  isSelected: boolean;
  onSelect: (loc: Location) => void;
}

function OptionButton({ loc, isSelected, onSelect }: OptionButtonProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  const style: CSSProperties = {
    ...BASE.optBtn,
    ...(hovered && !isSelected
      ? {
          backgroundColor: THEME.primaryLight,
          color: THEME.primary,
          borderColor: THEME.primaryMid,
        }
      : {}),
    ...(isSelected
      ? {
          backgroundColor: THEME.primaryActive,
          color: THEME.primaryDark,
          borderColor: THEME.primaryActiveBorder,
          fontWeight: 600,
        }
      : {}),
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(loc);
      }}
      role="option"
      aria-selected={isSelected}
    >
      {loc.label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LocationFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Location | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const collapsedW = selected ? COLLAPSED_W_SEL : COLLAPSED_W;
  const expandedW  = collapsedW + EXPANDED_EXTRA + LOCATIONS.length * OPTION_W;

  // Click outside to close
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Cleanup timer
  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

  function handleToggle() {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpen((v) => !v);
  }

  function handleSelect(loc: Location) {
    setSelected(loc);
    closeTimerRef.current = setTimeout(() => { setOpen(false); closeTimerRef.current = null; }, 170);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    setSelected(null);
  }

  const capsuleStyle: CSSProperties = {
    ...BASE.capsule,
    width: `${open ? expandedW : collapsedW}px`,
    ...(open
      ? { borderColor: THEME.primary, boxShadow: THEME.shadowOpen }
      : hovered
      ? { borderColor: THEME.borderHover, boxShadow: THEME.shadowHover }
      : {}),
  };

  return (
    <div style={BASE.wrapper} ref={containerRef}>
      <div
        style={capsuleStyle}
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Location filter"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleToggle(); }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {/* Trigger */}
        <div style={BASE.trigger}>
          <span style={BASE.iconWrap}>
            <MapPinIcon active={!!selected || open} />
          </span>

          <span
            style={{
              ...BASE.label,
              ...(selected || open ? { color: THEME.primary, fontWeight: 600 } : {}),
            }}
          >
            {selected ? selected.label : "Location"}
          </span>

          {selected && (
            <span
              onClick={handleClear}
              role="button"
              aria-label="Clear selection"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") handleClear(e as unknown as React.MouseEvent);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
            >
              <XIcon />
            </span>
          )}

          <ChevronIcon open={open} />
        </div>

        {/* Divider */}
        <div style={{ ...BASE.divider, opacity: open ? 1 : 0 }} />

        {/* Options */}
        <div
          style={{ ...BASE.optsList, ...(open ? {} : BASE.optsListHidden) }}
          role="listbox"
          aria-label="Select a location"
          aria-hidden={!open}
        >
          {LOCATIONS.map((loc) => (
            <OptionButton
              key={loc.id}
              loc={loc}
              isSelected={selected?.id === loc.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
