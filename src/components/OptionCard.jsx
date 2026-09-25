import { TextStrong, TextSmall } from "../ds/Text";
import { IconCheck } from "../ds/Icon";

export function OptionCard({ Icon, iconBg, iconColor, label, description, selected, onClick, testId }) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 16, padding: 20,
        borderRadius: "var(--thryv-radius-200)", border: "none", textAlign: "left", cursor: "pointer",
        background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
        boxShadow: selected ? "inset 0 0 0 2px var(--thryv-color-border-brand-default)" : "inset 0 0 0 1px #ffffff",
        transition: "box-shadow 120ms, background 120ms",
      }}
    >
      <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: iconBg, color: iconColor }}>
        <Icon size={20} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <TextStrong style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff" }}>{label}</TextStrong>
        <TextSmall style={{ color: selected ? undefined : "var(--thryv-color-clay-100)" }}>{description}</TextSmall>
      </div>
      <div
        style={{
          width: 24, height: 24, flexShrink: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          background: selected ? "var(--thryv-color-background-brand-default)" : "transparent",
          boxShadow: selected ? "none" : "inset 0 0 0 1.5px #ffffff",
        }}
      >
        <IconCheck size={14} style={{ color: selected ? "var(--thryv-color-text-brand-on-brand)" : "transparent" }} />
      </div>
    </button>
  );
}
