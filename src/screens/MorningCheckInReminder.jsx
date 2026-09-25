import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { IconButton } from "../ds/components";
import { TextCaption, TextTitlePage, TextSubtitle, TextSmall } from "../ds/Text";
import { IconX, IconCheck } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";
import "./SessionPlayer.css";

export default function MorningCheckInReminder() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen" style={{ alignItems: "center", boxSizing: "border-box" }}>
        <div style={{ width: "100%" }}>
          <AppHeader mode="back" backHref="/dashboard" />
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", flex: 1, padding: "clamp(24px,6vw,48px) 24px 48px", boxSizing: "border-box" }}>
          <TextCaption className="thryv-on-clay-soft">Morning check-in</TextCaption>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <SlotImage
              id="checkin-coach-avatar"
              alt="Coach avatar"
              className="thryv-pulse-ring"
              style={{ width: 148, height: 148, borderRadius: "50%", background: "var(--thryv-color-clay-200)", border: "3px solid rgba(250,240,230,0.35)" }}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <TextTitlePage className="thryv-on-clay">{coachName}</TextTitlePage>
              <TextSubtitle className="thryv-on-clay-soft">Time for your morning check-in</TextSubtitle>
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <IconButton
                aria-label="Dismiss"
                onClick={() => navigate("/dashboard")}
                style={{ "--btn-bg": "rgba(250,240,230,0.16)", "--btn-border": "transparent", "--btn-color": "#fff", width: 64, height: 64 }}
              >
                <IconX size={24} />
              </IconButton>
              <TextSmall className="thryv-on-clay-soft">Dismiss</TextSmall>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <IconButton
                aria-label="Answer"
                onClick={() => navigate("/dashboard")}
                style={{ "--btn-bg": "var(--thryv-color-moss-500)", "--btn-border": "transparent", "--btn-color": "#fff", width: 64, height: 64 }}
              >
                <IconCheck size={24} />
              </IconButton>
              <TextSmall className="thryv-on-clay-soft">Answer</TextSmall>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
