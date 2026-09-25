import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { TextHeading, TextSubheading, TextCaption, TextTitlePage, TextSmall } from "../ds/Text";
import { IconHeart, IconSun, IconMoon } from "../ds/Icon";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const SESSION_MINUTES = [20, 0, 15, 30, 0, 25, 10];
const MOODS = ["moss", "sand", "ochre", "moss", "moss", "sand", "moss"];
const MOOD_META = {
  moss: { color: "var(--thryv-color-moss-400)", Icon: IconHeart, iconColor: "var(--thryv-color-moss-700)" },
  ochre: { color: "var(--thryv-color-ochre-400)", Icon: IconSun, iconColor: "var(--thryv-color-ochre-700)" },
  sand: { color: "var(--thryv-color-sand-300)", Icon: IconMoon, iconColor: "var(--thryv-color-sand-700)" },
};

export default function ProgressInsights() {
  const maxMinutes = Math.max(...SESSION_MINUTES, 1);

  return (
    <div className="thryv-shell">
      <div className="thryv-shell-inner">
        <div className="thryv-shell-scroll">
          <div className="thryv-shell-header">
            <AppHeader mode="back" backHref="/calendar" />
          </div>

          <TextHeading className="thryv-on-clay">Your progress</TextHeading>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12, flexShrink: 0 }}>
            {[{ value: 6, label: "Day streak" }, { value: 42, label: "Sessions" }, { value: 17, label: "Avg. min" }].map((stat) => (
              <div key={stat.label} style={{ borderRadius: "var(--thryv-radius-200)", padding: "16px 12px", boxShadow: "inset 0 0 0 1px #fff", display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
                <TextTitlePage style={{ color: "#fff", fontSize: 34 }}>{stat.value}</TextTitlePage>
                <TextCaption style={{ color: "#fff" }}>{stat.label}</TextCaption>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            <TextSubheading className="thryv-on-clay">Sessions this week</TextSubheading>
            <div style={{ background: "var(--thryv-color-background-default-default)", borderRadius: "var(--thryv-radius-200)", padding: 20, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                {DAYS.map((label, i) => {
                  const minutes = SESSION_MINUTES[i];
                  const height = minutes === 0 ? "4px" : `${Math.max(12, (minutes / maxMinutes) * 100)}%`;
                  const color = minutes === 0 ? "var(--thryv-color-background-default-secondary)" : "var(--thryv-color-background-brand-default)";
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ width: "100%", maxWidth: 28, borderRadius: "var(--thryv-radius-100)", background: color, height }} />
                      <TextCaption>{label}</TextCaption>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            <TextSubheading className="thryv-on-clay">Mood over time</TextSubheading>
            <div style={{ background: "var(--thryv-color-background-default-default)", borderRadius: "var(--thryv-radius-200)", padding: 20, boxShadow: "0 8px 20px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {DAYS.map((label, i) => {
                  const m = MOOD_META[MOODS[i]];
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", color: m.iconColor, flexShrink: 0 }}>
                        <m.Icon size={16} />
                      </div>
                      <TextCaption>{label}</TextCaption>
                    </div>
                  );
                })}
              </div>
              <TextSmall>Mostly calm and energized this week — keep it up.</TextSmall>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
