import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { Slider, IconButton } from "../ds/components";
import { TextHeading, TextCaption } from "../ds/Text";
import { IconMic, IconPlay, IconPause } from "../ds/Icon";
import { useAppState } from "../state/AppState";
import { SlotImage } from "../components/SlotImage";
import "./SessionPlayer.css";

const THEMES = {
  "morning-breathing": { title: "Morning breathing reset", minutes: 10, imageId: "session-art-morning-breathing" },
  "body-scan": { title: "Body scan meditation", minutes: 15, imageId: "session-art-body-scan" },
  "deep-sleep": { title: "Deep sleep", minutes: 20, imageId: "session-art-deep-sleep" },
};

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SessionPlayer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { state } = useAppState();
  const session = params.get("session") || "body-scan";
  const theme = THEMES[session] || THEMES["body-scan"];
  const durationSeconds = theme.minutes * 60;
  const coachName = state.coach.name || "Sage";

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const togglePlay = () => {
    setPlaying((wasPlaying) => {
      const next = !wasPlaying;
      if (next) {
        timerRef.current = setInterval(() => {
          setProgress((p) => {
            const nextP = Math.min(p + 1, durationSeconds);
            if (nextP >= durationSeconds) {
              clearInterval(timerRef.current);
              navigate(`/session-complete?minutes=${Math.round(durationSeconds / 60)}`);
            }
            return nextP;
          });
        }, 1000);
      } else {
        clearInterval(timerRef.current);
      }
      return next;
    });
  };

  return (
    <div className="thryv-shell" style={{ background: "linear-gradient(180deg, var(--thryv-color-clay-600), var(--thryv-color-clay-500))" }}>
      <div className="thryv-shell-inner">
        <div className="thryv-shell-header" style={{ margin: 0 }}>
          <AppHeader mode="back" backHref="/dashboard" />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 20, overflowY: "auto", minHeight: 0 }}>
          <SlotImage
            id={theme.imageId}
            alt={theme.title}
            className={playing ? "thryv-pulse-ring" : ""}
            style={{ width: 220, height: 220, flexShrink: 0, borderRadius: 999, boxShadow: "var(--thryv-shadow-300)", background: "var(--thryv-color-clay-700)" }}
          />
          <div style={{ marginTop: 24, textAlign: "center", flexShrink: 0 }}>
            <TextHeading className="thryv-on-clay">{theme.title}</TextHeading>
          </div>
          <TextCaption className="thryv-on-clay-soft">Guided by {coachName}</TextCaption>
        </div>

        <div style={{ padding: "0 28px 12px" }}>
          <Slider value={progress} min={0} max={durationSeconds} onChange={setProgress} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <TextCaption className="thryv-on-clay-soft">{formatTime(progress)}</TextCaption>
            <TextCaption className="thryv-on-clay-soft">{formatTime(durationSeconds)}</TextCaption>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "8px 20px 24px" }}>
          <IconButton aria-label="Voice note" variant="neutral">
            <IconMic size={18} />
          </IconButton>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            style={{ width: 64, height: 64, borderRadius: 999, background: "#fff", color: "#000", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            {playing ? <IconPause size={24} /> : <IconPlay size={24} />}
          </button>
          <div style={{ width: 44 }} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
