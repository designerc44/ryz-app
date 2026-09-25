import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { Tag } from "../ds/components";
import { TextSubtitle, TextSubheading, TextHeading, TextCaption, TextSmall, TextStrong } from "../ds/Text";
import { IconPlay, IconCheck, IconMinus, IconHeart, IconMoon, IconSun, IconCalendar } from "../ds/Icon";
import { useAppState } from "../state/AppState";
import { SlotImage } from "../components/SlotImage";
import morningImage from "../assets/morning-breathing-reset.png";
import "./HomeDashboard.css";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NUMBERS = [7, 8, 9, 10, 11, 12, 13];
const TODAY_INDEX = 4;
const COMPLETED_DAYS = [true, true, false, true, false, false, false];

const MOVEMENT_OPTIONS = [
  { id: "strength", title: "Strength & conditioning", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)", suggested: true, path: "/movement/strength" },
  { id: "yoga", title: "Yoga & stretching", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-moss-700)", suggested: false, path: "/movement/yoga" },
  { id: "cardio", title: "Walking & cardio", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-clay-700)", suggested: false, path: "/movement/walking" },
  { id: "mindful", title: "Mindful movement", Icon: IconCalendar, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-sand-700)", suggested: false, path: "/movement/mindful" },
];

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const [dayMenuOpen, setDayMenuOpen] = useState(false);
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-shell">
      <div className="thryv-shell-inner">
        <div className="thryv-shell-scroll">
          <div className="thryv-shell-header">
            <AppHeader mode="home" userName="Jordan" favoritesCount={state.streak} />
          </div>

          <TextSubtitle className="thryv-on-clay" style={{ fontSize: 24, fontWeight: 300 }}>
            {coachName} thinks today is a good day for calm and movement.
          </TextSubtitle>

          <div style={{ width: "100%", flexShrink: 0, borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "relative", width: "100%", height: 170, flexShrink: 0, borderRadius: 16, overflow: "hidden", boxSizing: "border-box" }}>
              <img src={morningImage} alt="Today's session" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", borderRadius: 16, border: "1.5px solid #fff" }} />
              <div style={{ position: "absolute", left: 14, top: 14 }}>
                <Tag scheme="ochre">Today's session</Tag>
              </div>
              <div style={{ position: "absolute", left: 16, right: 60, bottom: 20, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextHeading className="thryv-text-cream">Morning breathing reset</TextHeading>
                <TextSmall style={{ color: "var(--thryv-color-clay-100)" }}>10 min · Guided audio</TextSmall>
              </div>
              <button
                type="button"
                aria-label="Start today's session"
                onClick={() => navigate("/session-player?session=morning-breathing")}
                style={{ position: "absolute", right: 14, bottom: 20, width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--thryv-color-cream-1000)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--thryv-color-clay-600)" }}
              >
                <IconPlay size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
            <TextSubheading className="thryv-on-clay">This week</TextSubheading>
            <div style={{ display: "flex", gap: 8, justifyContent: "space-between", border: "1px solid #fff", borderRadius: "var(--thryv-radius-200)", padding: 14 }}>
              {DAY_LABELS.map((label, i) => {
                const isToday = i === TODAY_INDEX;
                const done = COMPLETED_DAYS[i];
                const isFuture = i > TODAY_INDEX;
                let bg, color, border, content;
                if (done) {
                  bg = "var(--thryv-color-clay-800)"; color = "#fff"; border = "none";
                  content = <IconCheck size={14} className="thryv-icon-white" />;
                } else if (isToday) {
                  bg = "var(--thryv-color-background-default-secondary)"; color = "var(--thryv-color-ink-900)"; border = "none";
                  content = <TextSmall style={{ color: "var(--thryv-color-ink-900)", fontWeight: 600 }}>{DAY_NUMBERS[i]}</TextSmall>;
                } else if (isFuture) {
                  bg = "transparent"; color = "#fff"; border = "1px solid #fff";
                  content = <TextSmall style={{ color: "#fff", fontWeight: 600 }}>{DAY_NUMBERS[i]}</TextSmall>;
                } else {
                  bg = "var(--thryv-color-clay-400)"; color = "var(--thryv-color-ink-900)"; border = "none";
                  content = <IconMinus size={14} />;
                }
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, position: "relative" }}>
                    <TextCaption className="thryv-on-clay-soft">{label}</TextCaption>
                    <div
                      className={isToday ? "thryv-fri-circle" : ""}
                      data-testid={isToday ? "day-today" : undefined}
                      onClick={isToday ? () => setDayMenuOpen((v) => !v) : undefined}
                      style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: bg, border, boxSizing: "border-box", color, cursor: isToday ? "pointer" : "default" }}
                    >
                      {content}
                    </div>
                    {isToday && dayMenuOpen && (
                      <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 19, background: "transparent" }} onClick={() => setDayMenuOpen(false)} />
                        <div style={{ position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 14, boxShadow: "0 12px 28px rgba(0,0,0,0.35)", padding: 8, width: 230, zIndex: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                          {MOVEMENT_OPTIONS.map((opt) => (
                            <div
                              key={opt.id}
                              data-testid={`movement-${opt.id}`}
                              onClick={() => navigate(opt.path)}
                              style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 10, background: opt.suggested ? "var(--thryv-color-ochre-100)" : "transparent", cursor: "pointer" }}
                            >
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: opt.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: opt.iconColor }}>
                                <opt.Icon size={14} />
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <TextSmall style={{ color: "var(--thryv-color-ink-900)", fontWeight: opt.suggested ? 700 : 400 }}>{opt.title}</TextSmall>
                                {opt.suggested && <TextCaption style={{ color: "var(--thryv-color-text-brand-default)" }}>Coach suggested</TextCaption>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
            <TextSubheading className="thryv-on-clay">End your day</TextSubheading>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 16 }}>
              <button
                type="button"
                data-testid="card-body-scan"
                onClick={() => navigate("/session-player?session=body-scan")}
                style={{ textAlign: "left", background: "transparent", borderRadius: "var(--thryv-radius-200)", padding: 10, boxShadow: "none", border: "1px solid #fff", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 6, cursor: "pointer" }}
              >
                <SlotImage id="body-scan-image" alt="Body scan meditation" style={{ width: "100%", height: 120, borderRadius: 12 }} />
                <TextStrong className="thryv-text-cream">Body scan meditation</TextStrong>
                <TextCaption className="thryv-text-cream">15 min</TextCaption>
              </button>
              <button
                type="button"
                data-testid="card-deep-sleep"
                onClick={() => navigate("/session-player?session=deep-sleep")}
                style={{ textAlign: "left", background: "transparent", borderRadius: "var(--thryv-radius-200)", padding: 10, boxShadow: "none", border: "1px solid #fff", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 6, cursor: "pointer" }}
              >
                <SlotImage id="deep-sleep-image" alt="Deep sleep" style={{ width: "100%", height: 120, borderRadius: 12 }} />
                <TextStrong className="thryv-text-cream">Deep sleep</TextStrong>
                <TextCaption className="thryv-text-cream">20 min</TextCaption>
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
