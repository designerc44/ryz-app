import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button } from "../ds/components";
import { TextTitlePage, TextSubheading, TextSmall, TextStrong } from "../ds/Text";
import { IconHeart, IconMoon, IconSun, IconCalendar } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";
import logoCircle from "../assets/ryz-logo-circle.svg";

const HIGHLIGHTS = [
  { title: "3 workouts a week", description: "Balanced strength and movement sessions.", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { title: "Daily 5-minute mindfulness check-in", description: "A short pause to reset and reflect.", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
  { title: "Morning motivation at 7am", description: "A gentle nudge to start your day grounded.", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)" },
  { title: "Weekly progress check-ins", description: "A quick look back at how the week went.", Icon: IconCalendar, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-text-default-secondary)" },
];

export default function PersonalizedPlanReveal() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const coachName = state.coach.name || "Sage";
  const coachMessage =
    "I looked at what you shared, and built something that fits your life — not the other way around. Let's begin, one small step at a time.";

  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 560, gap: "clamp(28px,4vw,40px)", alignItems: "center" }}>
        <div style={{ margin: "0 -20px", width: "calc(100% + 40px)" }}>
          <AppHeader mode="back" backHref="/onboarding/notifications" showActions={false} centerLabel="Setup complete" />
        </div>

        <img src={logoCircle} alt="Ryz" style={{ width: 96, height: 96, display: "block", flexShrink: 0 }} />

        <TextTitlePage className="thryv-on-clay" style={{ textAlign: "center" }}>Your personalized plan</TextTitlePage>

        <div style={{ width: "100%", borderTop: "1px solid #fff", borderBottom: "1px solid #fff", padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <SlotImage id="plan-coach-avatar" alt="Coach avatar" style={{ width: 96, height: 96, borderRadius: "50%", flexShrink: 0, background: "var(--thryv-color-clay-200)" }} />
          <div>
            <TextSubheading className="thryv-on-clay" style={{ fontStyle: "italic" }}>"{coachMessage}"</TextSubheading>
            <div style={{ marginTop: 8 }}>
              <TextSmall className="thryv-on-clay" style={{ fontStyle: "italic" }}>— {coachName}</TextSmall>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: h.iconBg, color: h.iconColor }}>
                <h.Icon size={20} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextStrong>{h.title}</TextStrong>
                <TextSmall>{h.description}</TextSmall>
              </div>
            </div>
          ))}
        </div>

        <Button data-testid="cta-start" variant="primary" className="thryv-btn-full thryv-btn-invert" style={{ width: "100%" }} onClick={() => navigate("/dashboard")}>
          Start with {coachName}
        </Button>
      </div>
    </div>
  );
}
