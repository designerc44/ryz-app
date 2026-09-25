import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button } from "../ds/components";
import { TextTitlePage, TextSubtitle, TextHeading, TextStrong } from "../ds/Text";
import { IconSun, IconMoon, IconMinus } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";

const MOODS = [
  { id: "energized", label: "Energized", Icon: IconSun, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { id: "calm", label: "Calm", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
  { id: "same", label: "About the same", Icon: IconMinus, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-text-default-secondary)" },
];

export default function SessionComplete() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionMinutes = Number(params.get("minutes")) || 15;
  const [moodId, setMoodId] = useState(null);
  const [showSameNote, setShowSameNote] = useState(false);

  const selectMood = (id) => {
    setMoodId(id);
    setShowSameNote(id === "same");
  };

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen">
        <div style={{ position: "sticky", top: 0, zIndex: 40 }}>
          <AppHeader mode="back" backHref="/dashboard" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "clamp(28px,6vw,48px) 24px 40px", gap: "clamp(28px,5vw,40px)", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
            <SlotImage id="session-complete-coach-avatar" alt="Coach avatar" style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--thryv-color-clay-200)", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <TextTitlePage className="thryv-on-clay">Nice work</TextTitlePage>
              <TextSubtitle className="thryv-on-clay-soft">You gave yourself {sessionMinutes} minutes today. That matters.</TextSubtitle>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <TextHeading className="thryv-on-clay">How do you feel?</TextHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MOODS.map((m) => {
                const selected = moodId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectMood(m.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                      borderRadius: "var(--thryv-radius-200)", border: "none", textAlign: "left", cursor: "pointer",
                      background: selected ? "var(--thryv-color-background-brand-tertiary)" : "var(--thryv-color-background-default-default)",
                      boxShadow: selected ? "inset 0 0 0 2px var(--thryv-color-border-brand-default)" : "var(--thryv-shadow-100)",
                    }}
                  >
                    <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: m.iconBg, color: m.iconColor }}>
                      <m.Icon size={16} />
                    </div>
                    <TextStrong style={{ color: selected ? "var(--thryv-color-text-brand-default)" : undefined }}>{m.label}</TextStrong>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <Button variant="primary" className="thryv-btn-full thryv-btn-invert" onClick={() => navigate("/dashboard")}>
            Done
          </Button>
        </div>

        {showSameNote && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box" }}
            onClick={() => setShowSameNote(false)}
          >
            <div
              style={{ background: "var(--thryv-color-background-default-default)", borderRadius: "var(--thryv-radius-400)", padding: "28px 24px", maxWidth: 340, width: "100%", boxShadow: "var(--thryv-shadow-300)", textAlign: "center", display: "flex", flexDirection: "column", gap: 16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextStrong>Don't worry, keep going with sessions and we'll see how you feel then.</TextStrong>
              <Button variant="primary" onClick={() => setShowSameNote(false)}>Okay</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
