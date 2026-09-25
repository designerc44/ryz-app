import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { StepProgress } from "../components/StepProgress";
import { Button, InputField, Link } from "../ds/components";
import { TextTitlePage, TextSubtitle, TextHeading, TextStrong, TextSmall, TextCaption } from "../ds/Text";
import { IconSun, IconMoon } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";

const AVATAR_DEFS = [
  { id: "warm", name: "Warm & Earthy" },
  { id: "bright", name: "Bright & Playful" },
  { id: "grounded", name: "Calm & Grounded" },
];

const PERSONALITIES = [
  { id: "energetic", title: "Energetic & Direct", description: "Quick check-ins, clear pushes, no fluff.", Icon: IconSun, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { id: "calm", title: "Calm & Encouraging", description: "Gentle nudges, patient tone, room to breathe.", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
];

export default function CreateYourCoach() {
  const navigate = useNavigate();
  const { setCoach } = useAppState();
  const [gender, setGender] = useState("male");
  const [avatarId, setAvatarId] = useState(null);
  const [personalityId, setPersonalityId] = useState(null);
  const [coachName, setCoachName] = useState("");
  const [customPhoto, setCustomPhoto] = useState({});

  const canContinue = !!(avatarId && personalityId && coachName.trim().length > 0);

  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 560, gap: "clamp(20px,3vw,28px)" }}>
        <div style={{ margin: "0 -20px" }}>
          <AppHeader mode="back" backHref="/create-account" showActions={false} />
        </div>

        <StepProgress step={1} total={5} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextTitlePage className="thryv-on-clay">Let's create your coach</TextTitlePage>
          <TextSubtitle className="thryv-on-clay-soft">Choose how they look and sound — you can change this anytime.</TextSubtitle>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <TextHeading className="thryv-on-clay">Choose a look</TextHeading>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => { setGender("male"); setAvatarId(null); }}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: 700, background: gender === "male" ? "#fff" : "transparent", color: gender === "male" ? "var(--thryv-color-text-brand-default)" : "#fff", boxShadow: "inset 0 0 0 1px #fff" }}
              >
                M
              </button>
              <button
                type="button"
                onClick={() => { setGender("female"); setAvatarId(null); }}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: 700, background: gender === "female" ? "#fff" : "transparent", color: gender === "female" ? "var(--thryv-color-text-brand-default)" : "#fff", boxShadow: "inset 0 0 0 1px #fff" }}
              >
                F
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }}>
            {AVATAR_DEFS.map((a) => {
              const key = gender + "-" + a.id;
              const selected = avatarId === key;
              return (
                <div key={a.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <button
                    type="button"
                    data-testid={`avatar-${a.id}`}
                    onClick={() => setAvatarId(key)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                      padding: "24px 16px 22px", borderRadius: "var(--thryv-radius-200)", border: "none", cursor: "pointer",
                      background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
                      boxShadow: selected ? "none" : "inset 0 0 0 1px #ffffff",
                      transition: "box-shadow 120ms, background 120ms", width: "100%",
                    }}
                  >
                    <SlotImage id={`avatar-${key}`} alt={`${a.name} avatar`} style={{ width: "100%", aspectRatio: 1, borderRadius: "50%" }} />
                    <TextSmall style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff", fontWeight: selected ? 700 : 400 }}>{a.name}</TextSmall>
                  </button>
                  <Link
                    href="#"
                    className="thryv-link-white"
                    style={{ fontSize: 14 }}
                    onClick={(e) => { e.preventDefault(); setCustomPhoto((s) => ({ ...s, [key]: !s[key] })); }}
                  >
                    {customPhoto[key] ? "Use illustration instead" : "Upload your own photo"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextHeading className="thryv-on-clay">Choose a coaching style</TextHeading>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 12 }}>
            {PERSONALITIES.map((p) => {
              const selected = personalityId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  data-testid={`personality-${p.id}`}
                  onClick={() => setPersonalityId(p.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, padding: 18,
                    borderRadius: "var(--thryv-radius-200)", border: "none", textAlign: "left", cursor: "pointer",
                    background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
                    boxShadow: selected ? "inset 0 0 0 2px var(--thryv-color-border-brand-default)" : "inset 0 0 0 1px #ffffff",
                    transition: "box-shadow 120ms, background 120ms",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: p.iconBg, color: p.iconColor }}>
                    <p.Icon size={18} />
                  </div>
                  <TextStrong style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff" }}>{p.title}</TextStrong>
                  <TextSmall style={{ color: selected ? undefined : "var(--thryv-color-clay-100)" }}>{p.description}</TextSmall>
                </button>
              );
            })}
          </div>
        </div>

        <div className="thryv-label-on-clay">
          <InputField data-testid="input-coach-name" label="Name your coach" placeholder="e.g. Sage, Kai, Nova" value={coachName} onChange={(e) => setCoachName(e.target.value.slice(0, 20))} maxLength={20} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button
            data-testid="cta-continue"
            variant="primary"
            disabled={!canContinue}
            className="thryv-btn-full thryv-btn-invert"
            onClick={() => {
              if (!canContinue) return;
              setCoach({ name: coachName.trim(), avatarStyle: avatarId, personality: personalityId, gender });
              navigate("/onboarding/goals");
            }}
          >
            Continue
          </Button>
          <TextCaption className="thryv-on-clay-soft" style={{ textAlign: "center", display: "block" }}>
            {canContinue ? "You're all set — let's keep going." : "Pick a look, a style, and give your coach a name to continue."}
          </TextCaption>
        </div>
      </div>
    </div>
  );
}
