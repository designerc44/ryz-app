import { AppHeader } from "../components/AppHeader";
import { Input, IconButton } from "../ds/components";
import { Text, TextSmall } from "../ds/Text";
import { IconMoon, IconArrowRight } from "../ds/Icon";
import { useAppState } from "../state/AppState";

export default function ChatOffline() {
  const { state } = useAppState();
  const coachName = state.coach.name || "Sage";
  const pendingMessage = "Hey, just checking in — feeling a bit stuck today.";

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen">
        <div style={{ position: "sticky", top: 0, zIndex: 41, margin: "0 -20px", width: "calc(100% + 40px)" }}>
          <AppHeader mode="back" backHref="/dashboard" centerLabel="You are offline" />
        </div>

        <div style={{ padding: "12px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-ochre-100)" }}>
            <IconMoon size={16} style={{ color: "var(--thryv-color-text-warning-default)" }} />
            <TextSmall>{coachName} can't respond right now — messages will send once you're back online.</TextSmall>
          </div>
        </div>

        <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ maxWidth: "82%", alignSelf: "flex-end", background: "var(--thryv-color-sand-200)", borderRadius: "var(--thryv-radius-400) var(--thryv-radius-400) var(--thryv-radius-100) var(--thryv-radius-400)", padding: "14px 16px", opacity: 0.7 }}>
            <Text>{pendingMessage}</Text>
          </div>
          <TextSmall className="thryv-on-clay" style={{ alignSelf: "flex-end" }}>Waiting to send…</TextSmall>
        </div>

        <div style={{ position: "sticky", bottom: 0, width: "100vw", marginLeft: "calc(50% - 50vw)", background: "var(--thryv-color-clay-800)", boxShadow: "var(--thryv-shadow-100)", display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
          <div style={{ width: "100%", maxWidth: 560, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, boxSizing: "border-box" }}>
            <div style={{ flex: 1 }}>
              <Input placeholder={`Message ${coachName}`} disabled />
            </div>
            <IconButton aria-label="Send message" variant="neutral" disabled>
              <IconArrowRight size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
