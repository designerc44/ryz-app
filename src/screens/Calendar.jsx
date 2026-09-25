import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { IconButton } from "../ds/components";
import { TextHeading, TextSubheading, TextCaption, TextStrong } from "../ds/Text";
import { IconArrowLeft, IconArrowRight, IconCheck, IconMinus, IconHeart, IconMoon, IconSun, IconCalendar } from "../ds/Icon";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const COMPLETED_DAYS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12]);
const TODAY_DAY = 9;
const DAYS_IN_MONTH = 30;
const LEADING_BLANKS = 1;

const MOVEMENT_OPTIONS = [
  { id: "strength", title: "Strength & conditioning", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)", suggested: true, path: "/movement/strength" },
  { id: "yoga", title: "Yoga & stretching", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-moss-700)", suggested: false, path: "/movement/yoga" },
  { id: "cardio", title: "Walking & cardio", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-clay-700)", suggested: false, path: "/movement/walking" },
  { id: "mindful", title: "Mindful movement", Icon: IconCalendar, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-sand-700)", suggested: false, path: "/movement/mindful" },
];

const BADGES = [
  { title: "7-day streak", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { title: "Early riser", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)" },
  { title: "Consistency star", Icon: IconCheck, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
  { title: "First month complete", Icon: IconCalendar, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-text-default-secondary)" },
];

export default function CalendarScreen() {
  const navigate = useNavigate();
  const [dayMenuOpen, setDayMenuOpen] = useState(false);

  const cells = [];
  for (let i = 0; i < LEADING_BLANKS; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    const completed = COMPLETED_DAYS.has(d);
    const offset = d - TODAY_DAY;
    let bg = "transparent", textColor = "var(--thryv-color-clay-100)", ring = "none", icon = null, showNumber = true, cursor = "default", clickable = false;
    if (d < TODAY_DAY) {
      if (completed) { bg = "var(--thryv-color-clay-800)"; icon = IconCheck; showNumber = false; }
    } else if (offset === 0) {
      bg = "var(--thryv-color-clay-400)"; icon = IconMinus; showNumber = false;
    } else if (offset === 2) {
      bg = "var(--thryv-color-cream-1000)"; textColor = "var(--thryv-color-clay-800)"; cursor = "pointer"; clickable = true;
    } else if (offset === 3 || offset === 4) {
      bg = "transparent"; ring = "inset 0 0 0 1px #ffffff"; textColor = "#ffffff";
    } else if (completed) {
      bg = "var(--thryv-color-clay-800)"; icon = IconCheck; showNumber = false;
    }
    cells.push({ d, bg, textColor, ring, icon, showNumber, cursor, clickable });
  }

  return (
    <div className="thryv-shell">
      <div className="thryv-shell-inner">
        <div className="thryv-shell-scroll">
          <div className="thryv-shell-header">
            <AppHeader mode="back" backHref="/dashboard" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <TextHeading className="thryv-on-clay">Calendar</TextHeading>
            <button
              type="button"
              data-testid="your-progress-link"
              onClick={() => navigate("/progress")}
              style={{ background: "var(--thryv-color-ochre-200)", color: "var(--thryv-color-text-warning-default)", borderRadius: 200, padding: "6px 14px", fontWeight: 700, border: "none", cursor: "pointer" }}
            >
              Your progress
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <IconButton aria-label="Previous month" variant="neutral"><IconArrowLeft size={16} /></IconButton>
              <TextSubheading className="thryv-on-clay">September 2026</TextSubheading>
              <IconButton aria-label="Next month" variant="neutral"><IconArrowRight size={16} /></IconButton>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: 4 }}>
              {WEEKDAYS.map((wd) => (
                <div key={wd} style={{ textAlign: "center", padding: "4px 0" }}>
                  <TextCaption className="thryv-on-clay-soft">{wd}</TextCaption>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: 4 }}>
              {cells.map((cell, i) => (
                <div key={i} style={{ aspectRatio: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {cell && (
                    <>
                      <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: cell.bg, boxShadow: cell.ring, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, boxSizing: "border-box" }}>
                        {cell.icon && <cell.icon size={16} className="thryv-icon-white" />}
                        {cell.showNumber && (
                          <span
                            data-testid={cell.clickable ? "calendar-today" : undefined}
                            style={{ font: "var(--thryv-font-body-small)", color: cell.textColor, cursor: cell.cursor }}
                            onClick={cell.clickable ? () => setDayMenuOpen((v) => !v) : undefined}
                          >
                            {cell.d}
                          </span>
                        )}
                      </div>
                      {cell.clickable && dayMenuOpen && (
                        <>
                          <div style={{ position: "fixed", inset: 0, zIndex: 19, background: "transparent" }} onClick={() => setDayMenuOpen(false)} />
                          <div style={{ position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 14, boxShadow: "0 12px 28px rgba(0,0,0,0.35)", padding: 8, width: 230, zIndex: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                            {MOVEMENT_OPTIONS.map((opt) => (
                              <div
                                key={opt.id}
                                onClick={() => navigate(opt.path)}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 10, background: opt.suggested ? "var(--thryv-color-ochre-100)" : "transparent", cursor: "pointer" }}
                              >
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: opt.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: opt.iconColor }}>
                                  <opt.Icon size={14} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                  <TextCaption style={{ color: "var(--thryv-color-ink-900)", fontWeight: opt.suggested ? 700 : 400, textTransform: "none", letterSpacing: 0 }}>{opt.title}</TextCaption>
                                  {opt.suggested && <TextCaption style={{ color: "var(--thryv-color-text-brand-default)" }}>Coach suggested</TextCaption>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
            <TextSubheading className="thryv-on-clay">Milestones</TextSubheading>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {BADGES.map((b) => (
                <div key={b.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: b.iconBg, color: b.iconColor, flexShrink: 0 }}>
                    <b.Icon size={22} />
                  </div>
                  <TextStrong style={{ flex: 1 }}>{b.title}</TextStrong>
                  <TextCaption style={{ textAlign: "right", textTransform: "none", letterSpacing: 0, color: "var(--thryv-color-clay-500)", fontWeight: 500 }}>Earned</TextCaption>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="calendar" />
    </div>
  );
}
