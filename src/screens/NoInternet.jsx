import { AppHeader } from "../components/AppHeader";
import { Button } from "../ds/components";
import { TextTitlePage, TextSubtitle } from "../ds/Text";
import { IconMoon } from "../ds/Icon";
import { useAppState } from "../state/AppState";

export default function NoInternet() {
  const { state } = useAppState();
  const coachName = state.coach.name || "Sage";

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen" style={{ alignItems: "center" }}>
        <div style={{ width: "100%" }}>
          <AppHeader mode="back" backHref="/dashboard" />
        </div>
        <div style={{ width: "100%", maxWidth: 400, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, textAlign: "center", padding: 24, boxSizing: "border-box" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--thryv-color-cream-1000)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--thryv-color-clay-600)" }}>
            <IconMoon size={34} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <TextTitlePage className="thryv-on-clay">You're offline</TextTitlePage>
            <TextSubtitle className="thryv-on-clay-soft">Ryz needs a connection to reach {coachName}. Check your signal and try again.</TextSubtitle>
          </div>
          <Button variant="primary" className="thryv-btn-full thryv-btn-invert">Try again</Button>
        </div>
      </div>
    </div>
  );
}
