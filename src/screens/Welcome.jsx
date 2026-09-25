import { useNavigate } from "react-router-dom";
import { Button, Link } from "../ds/components";
import { Text, TextSubtitle } from "../ds/Text";
import { IconHeart, IconMoon, IconSun } from "../ds/Icon";
import logoCircle from "../assets/ryz-logo-circle.svg";
import "./Welcome.css";

const BULLETS = [
  { icon: IconHeart, bg: "var(--thryv-color-ochre-200)", color: "var(--thryv-color-text-warning-default)", text: "Movement and workouts that fit your energy." },
  { icon: IconMoon, bg: "var(--thryv-color-moss-200)", color: "var(--thryv-color-text-positive-default)", text: "Daily mindfulness to quiet the noise." },
  { icon: IconSun, bg: "var(--thryv-color-clay-200)", color: "var(--thryv-color-text-brand-default)", text: "Warm, steady encouragement, every day." },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen" style={{ justifyContent: "space-between", padding: "clamp(32px,7vw,56px) 24px 40px" }}>
        <img src={logoCircle} alt="Ryz" className="welcome-logo" style={{ width: 144, height: 144, display: "block" }} />

        <div className="welcome-content" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <TextSubtitle className="thryv-on-clay-soft">
            Your personal AI coach for mind, body and soul — built around your life, not the other way around.
          </TextSubtitle>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {BULLETS.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: b.bg, color: b.color }}>
                  <b.icon size={16} />
                </div>
                <Text className="thryv-on-clay">{b.text}</Text>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <Button data-testid="cta-get-started" variant="primary" className="thryv-btn-full thryv-btn-invert" onClick={() => navigate("/create-account")}>
            Get started
          </Button>
          <Link href="#" className="thryv-on-clay-soft" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
