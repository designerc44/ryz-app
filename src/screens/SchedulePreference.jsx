import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../components/OnboardingLayout";
import { OptionCard } from "../components/OptionCard";
import { Button } from "../ds/components";
import { TextStrong } from "../ds/Text";
import { IconSun, IconMoon } from "../ds/Icon";
import { useAppState } from "../state/AppState";

const TIMES = [
  { id: "morning", label: "Morning", description: "Around 7–9am, before the day fills up.", Icon: IconSun, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { id: "afternoon", label: "Afternoon", description: "Around 12–2pm, a midday reset.", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)" },
  { id: "evening", label: "Evening", description: "Around 6–8pm, to wind the day down.", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
];
const FREQUENCIES = [
  { id: "daily", label: "Every day" },
  { id: "weekdays", label: "Weekdays only" },
];

export default function SchedulePreference() {
  const navigate = useNavigate();
  const { setOnboarding } = useAppState();
  const [timeId, setTimeId] = useState(null);
  const [frequencyId, setFrequencyId] = useState("daily");

  const canContinue = !!timeId;

  return (
    <OnboardingLayout
      backHref="/onboarding/goals"
      step={3}
      total={5}
      title="When should your coach check in?"
      subtitle="Pick the time of day that fits your rhythm — you can change it later."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TIMES.map((t) => (
          <OptionCard key={t.id} {...t} testId={`time-${t.id}`} selected={timeId === t.id} onClick={() => setTimeId(t.id)} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TextStrong className="thryv-on-clay" style={{ font: "var(--thryv-font-heading)" }}>How often</TextStrong>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 12 }}>
          {FREQUENCIES.map((f) => {
            const selected = frequencyId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                data-testid={`frequency-${f.id}`}
                onClick={() => setFrequencyId(f.id)}
                style={{
                  padding: 14, borderRadius: "var(--thryv-radius-200)", border: "none", cursor: "pointer",
                  background: selected ? "var(--thryv-color-background-brand-tertiary)" : "transparent",
                  boxShadow: selected ? "inset 0 0 0 2px var(--thryv-color-border-brand-default)" : "inset 0 0 0 1px #ffffff",
                }}
              >
                <TextStrong style={{ color: selected ? "var(--thryv-color-text-brand-default)" : "#fff" }}>{f.label}</TextStrong>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        data-testid="cta-next"
        variant="primary"
        disabled={!canContinue}
        className="thryv-btn-full thryv-btn-invert"
        onClick={() => {
          if (!canContinue) return;
          setOnboarding({ schedule: { time: timeId, frequency: frequencyId } });
          navigate("/onboarding/workout-types");
        }}
      >
        Next
      </Button>
    </OnboardingLayout>
  );
}
