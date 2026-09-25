import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button, InputField, Link } from "../ds/components";
import { TextHeading, TextStrong, TextSmall } from "../ds/Text";
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

export default function EditCoach() {
  const navigate = useNavigate();
  const { state, setCoach } = useAppState();
  const [gender, setGender] = useState(state.coach.gender || "male");
  const [avatarId, setAvatarId] = useState(state.coach.avatarStyle?.split("-").slice(1).join("-") || "warm");
  const [personalityId, setPersonalityId] = useState(state.coach.personality || "calm");
  const [coachName, setCoachName] = useState(state.coach.name || "Sage");
  const [customPhoto, setCustomPhoto] = useState({});

  const canSave = !!(avatarId && personalityId && coachName.trim().length > 0);

  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 560, gap: "clamp(28px,4vw,40px)" }}>
        <div style={{ margin: "0 -20px 4px" }}>
          <AppHeader mode="back" backHref="/settings" />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <TextHeading className="thryv-on-clay">Edit your coach</TextHeading>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setGender("male")}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: 700, background: gender === "male" ? "#fff" : "transparent", color: gender === "male" ? "var(--thryv-color-text-brand-default)" : "#fff", boxShadow: "inset 0 0 0 1px #fff" }}
            >
              M
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: 700, background: gender === "female" ? "#fff" : "transparent", color: gender === "female" ? "var(--thryv-color-text-brand-default)" : "#fff", boxShadow: "inset 0 0 0 1px #fff" }}
            >
              F
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextHeading className="thryv-on-clay">Choose a look</TextHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }}>
            {AVATAR_DEFS.map((a) => {
              const selected = avatarId === a.id;
              return (
                <div key={a.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => setAvatarId(a.id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                      padding: "24px 16px 22px", borderRadius: "var(--thryv-radius-200)", border: "none", cursor: "pointer",
                      background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
                      boxShadow: selected ? "none" : "inset 0 0 0 1px #ffffff",
                      transition: "box-shadow 120ms, background 120ms", width: "100%",
                    }}
                  >
                    <SlotImage id={`edit-avatar-photo-${gender}-${a.id}`} alt={`${a.name} avatar`} style={{ width: "100%", aspectRatio: 1, borderRadius: "50%" }} />
                    <TextSmall style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff", fontWeight: selected ? 700 : 400 }}>{a.name}</TextSmall>
                  </button>
                  <Link
                    href="#"
                    className="thryv-link-white"
                    style={{ fontSize: 14 }}
                    onClick={(e) => { e.preventDefault(); setCustomPhoto((s) => ({ ...s, [a.id]: !s[a.id] })); }}
                  >
                    {customPhoto[a.id] ? "Use illustration instead" : "Upload your own photo"}
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
                  onClick={() => setPersonalityId(p.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, padding: 18,
                    borderRadius: "var(--thryv-radius-200)", border: "none", textAlign: "left", cursor: "pointer",
                    background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
                    boxShadow: selected ? "none" : "inset 0 0 0 1px #ffffff",
                    transition: "box-shadow 120ms, background 120ms",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: p.iconBg, color: p.iconColor }}>
                    <p.Icon size={18} />
                  </div>
                  <TextStrong style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff" }}>{p.title}</TextStrong>
                  <TextSmall style={{ color: selected ? undefined : "#fff" }}>{p.description}</TextSmall>
                </button>
              );
            })}
          </div>
        </div>

        <div className="thryv-label-on-clay thryv-edit-coach-fields">
          <InputField label="Coach name" placeholder="e.g. Sage, Kai, Nova" value={coachName} onChange={(e) => setCoachName(e.target.value.slice(0, 20))} maxLength={20} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button
            variant="primary"
            disabled={!canSave}
            className="thryv-btn-full thryv-btn-invert"
            onClick={() => {
              if (!canSave) return;
              setCoach({ name: coachName.trim(), avatarStyle: `${gender}-${avatarId}`, personality: personalityId, gender });
              navigate("/settings");
            }}
          >
            Save changes
          </Button>
          <div style={{ alignSelf: "stretch", width: "100%", boxSizing: "border-box", textAlign: "center", border: "1px solid #ffffff", borderRadius: 200, padding: "6px 20px" }}>
            <Link href="#" className="thryv-link-white" style={{ textDecoration: "none" }} onClick={(e) => { e.preventDefault(); navigate("/settings"); }}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
