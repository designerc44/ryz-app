import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { Input, IconButton } from "../ds/components";
import { Text, TextStrong, TextSmall } from "../ds/Text";
import { IconHeart, IconArrowRight } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";

function CoachBubble({ children, avatarId, tail = true }) {
  return (
    <div
      style={{
        position: "relative", maxWidth: "82%", alignSelf: "flex-start", background: "var(--thryv-color-background-default-default)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        borderRadius: tail
          ? "var(--thryv-radius-400) var(--thryv-radius-400) var(--thryv-radius-400) var(--thryv-radius-100)"
          : "var(--thryv-radius-400)",
        padding: "14px 16px",
      }}
    >
      <SlotImage id={avatarId} alt="Coach avatar" style={{ position: "absolute", top: -10, left: -18, width: 34, height: 34, borderRadius: "50%", background: "var(--thryv-color-clay-200)", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
      <Text>{children}</Text>
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div style={{ maxWidth: "82%", alignSelf: "flex-end", background: "transparent", border: "1px solid #fff", borderRadius: "var(--thryv-radius-400) var(--thryv-radius-400) var(--thryv-radius-100) var(--thryv-radius-400)", padding: "14px 16px", boxSizing: "border-box" }}>
      <Text style={{ color: "#fff" }}>{children}</Text>
    </div>
  );
}

export default function ChatWithCoach() {
  const { state } = useAppState();
  const [draft, setDraft] = useState("");
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen">
        <div style={{ position: "sticky", top: 0, zIndex: 41, margin: "0 -20px", width: "calc(100% + 40px)" }}>
          <AppHeader mode="back" backHref="/dashboard" centerLabel="I'm here for you!" />
        </div>

        <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <CoachBubble avatarId="chat-coach-avatar-1">You showed up yesterday, even on a hard day. That's the whole practice — let's keep going today.</CoachBubble>
          <UserBubble>Honestly I'm feeling pretty unmotivated today.</UserBubble>
          <CoachBubble avatarId="chat-coach-avatar-2">That's alright — motivation comes and goes, and showing up doesn't depend on it. What if we started with something small, just five minutes, and see how you feel after?</CoachBubble>
          <UserBubble>I don't know. Honestly I've been feeling really low lately, like nothing helps.</UserBubble>

          <div style={{ maxWidth: "82%", alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 10 }}>
            <CoachBubble avatarId="chat-coach-avatar-3">Thank you for telling me that — it takes something to say it out loud. I'm not able to be a substitute for real support, but you don't have to carry this by yourself.</CoachBubble>
            <div style={{ background: "var(--thryv-color-moss-100)", borderRadius: "var(--thryv-radius-200)", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--thryv-color-moss-200)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--thryv-color-text-positive-default)", flexShrink: 0 }}>
                  <IconHeart size={16} />
                </div>
                <TextStrong>Real support, any time</TextStrong>
              </div>
              <TextSmall style={{ color: "#000000" }}>
                If things feel heavier than you can hold alone, the 988 Suicide &amp; Crisis Lifeline has people ready to listen — free, confidential, day or night.
              </TextSmall>
              <a
                href="tel:988"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content",
                  padding: "var(--thryv-space-200) var(--thryv-space-400)", borderRadius: "var(--thryv-radius-full)",
                  background: "var(--thryv-color-moss-700)", color: "#ffffff",
                  font: "var(--thryv-font-body-small-strong)", textDecoration: "none",
                }}
              >
                Call or text 988
              </a>
            </div>
          </div>
        </div>

        <div style={{ position: "sticky", bottom: 0, width: "100vw", marginLeft: "calc(50% - 50vw)", background: "var(--thryv-color-clay-800)", boxShadow: "var(--thryv-shadow-100)", display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
          <div style={{ width: "100%", maxWidth: 560, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, boxSizing: "border-box" }}>
            <div style={{ flex: 1 }}>
              <Input placeholder={`Message ${coachName}`} value={draft} onChange={(e) => setDraft(e.target.value)} />
            </div>
            <IconButton aria-label="Send message" variant="primary" className="thryv-btn-invert" onClick={() => setDraft("")}>
              <IconArrowRight size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
