import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { StepProgress } from "../components/StepProgress";
import { Button, Link } from "../ds/components";
import { TextTitlePage, TextSubtitle } from "../ds/Text";
import { IconBell } from "../ds/Icon";
import { useAppState } from "../state/AppState";

export default function NotificationPermission() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 560, gap: "clamp(32px,5vw,48px)" }}>
        <div style={{ margin: "0 -20px" }}>
          <AppHeader mode="back" backHref="/onboarding/workout-types" showActions={false} />
        </div>
        <StepProgress step={5} total={5} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, textAlign: "center", padding: "14px 0" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--thryv-color-cream-1000)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--thryv-color-clay-600)" }}>
            <IconBell size={36} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <TextTitlePage className="thryv-on-clay">Stay gently on track</TextTitlePage>
            <TextSubtitle className="thryv-on-clay-soft">
              {coachName} will send a quiet nudge for your check-in — never more than one a day.
            </TextSubtitle>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <Button data-testid="cta-enable" variant="primary" className="thryv-btn-full thryv-btn-invert" onClick={() => navigate("/onboarding/plan-reveal")}>
            Enable reminders
          </Button>
          <Link href="#" className="thryv-on-clay-soft" onClick={(e) => { e.preventDefault(); navigate("/onboarding/plan-reveal"); }}>
            Maybe later
          </Link>
        </div>
      </div>
    </div>
  );
}
