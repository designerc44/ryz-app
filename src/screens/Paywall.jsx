import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button, Link } from "../ds/components";
import { TextSubtitle, TextHeading, TextStrong, TextSmall, TextTitleHero } from "../ds/Text";
import { IconMessageCircle, IconHeart, IconCalendar } from "../ds/Icon";
import { useAppState } from "../state/AppState";
import logoCircle from "../assets/ryz-logo-circle.svg";

const BENEFITS = [
  { Icon: IconMessageCircle, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)", title: "Full coach chat", description: "Unlimited any time conversations" },
  { Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)", title: "Complete workout library", description: "All sessions unlocked." },
  { Icon: IconCalendar, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)", title: "Personalized weekly plan updates", description: "Your plan adjusts as your life does." },
];

export default function Paywall() {
  const navigate = useNavigate();
  const { state, setSubscribed } = useAppState();
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 520, gap: "clamp(28px,4vw,40px)", alignItems: "center", boxSizing: "border-box" }}>
        <div style={{ width: "100%", margin: "0 0 -8px" }}>
          <AppHeader mode="back" backHref="/settings" />
        </div>

        <img src={logoCircle} alt="Ryz" style={{ width: 96, height: 96, marginBottom: -8, display: "block" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center", marginBottom: -16 }}>
          <TextSubtitle className="thryv-on-clay" style={{ fontWeight: 600 }}>Keep going with {coachName}?</TextSubtitle>
          <TextHeading className="thryv-on-clay-soft">
            You've felt what this practice can do. <br />Here's what opens up next.
          </TextHeading>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)", marginBottom: "calc(12px - clamp(28px,4vw,40px))" }}>
          {BENEFITS.map((b, i) => (
            <div key={b.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderBottom: i < BENEFITS.length - 1 ? "1px solid var(--thryv-color-sand-100)" : "none" }}>
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: b.iconBg, color: b.iconColor }}>
                <b.Icon size={18} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextStrong>{b.title}</TextStrong>
                <TextSmall>{b.description}</TextSmall>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", background: "var(--thryv-color-clay-500)", borderRadius: "var(--thryv-radius-200)", padding: "8px 24px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <TextTitleHero style={{ color: "#fff" }}>
              <sup style={{ fontSize: "0.5em" }}>$</sup>5
            </TextTitleHero>
            <TextHeading style={{ color: "#fff" }}>a month</TextHeading>
            <TextSmall style={{ color: "var(--thryv-color-clay-100)", fontSize: 16, marginTop: -4, display: "block" }}>/ Cancel anytime.</TextSmall>
          </div>
          <Button
            variant="primary"
            className="thryv-btn-full thryv-btn-invert"
            style={{ width: "100%" }}
            onClick={() => { setSubscribed(true); navigate("/settings"); }}
          >
            Subscribe
          </Button>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, alignItems: "center", marginTop: -12 }}>
          <Link href="#" className="thryv-on-clay-soft" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
            Continue in preview mode
          </Link>
        </div>
      </div>
    </div>
  );
}
