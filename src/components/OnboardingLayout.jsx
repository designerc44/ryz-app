import { AppHeader } from "./AppHeader";
import { StepProgress } from "./StepProgress";
import { TextTitlePage, TextSubtitle } from "../ds/Text";

export function OnboardingLayout({ backHref, step, total, title, subtitle, children }) {
  return (
    <div className="thryv-app-bg" style={{ padding: "0 20px 60px" }}>
      <div className="thryv-screen" style={{ maxWidth: 560, gap: "clamp(32px,5vw,48px)" }}>
        <div style={{ margin: "0 -20px" }}>
          <AppHeader mode="back" backHref={backHref} showActions={false} />
        </div>
        <StepProgress step={step} total={total} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextTitlePage className="thryv-on-clay">{title}</TextTitlePage>
          {subtitle && <TextSubtitle className="thryv-on-clay-soft">{subtitle}</TextSubtitle>}
        </div>
        {children}
      </div>
    </div>
  );
}
