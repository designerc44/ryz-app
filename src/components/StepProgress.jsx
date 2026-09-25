import { TextCaption } from "../ds/Text";

export function StepProgress({ step, total }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              flex: 1,
              borderRadius: "var(--thryv-radius-full)",
              background: i < step ? "var(--thryv-color-background-brand-default)" : "var(--thryv-color-background-default-secondary)",
              transition: "background 200ms",
            }}
          />
        ))}
      </div>
      <TextCaption className="thryv-on-clay-soft">
        Step {step} of {total}
      </TextCaption>
    </div>
  );
}
