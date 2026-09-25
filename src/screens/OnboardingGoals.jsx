import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../components/OnboardingLayout";
import { OptionCard } from "../components/OptionCard";
import { Button } from "../ds/components";
import { IconHeart, IconMoon, IconSun, IconCheck } from "../ds/Icon";
import { useAppState } from "../state/AppState";

const GOALS = [
  { id: "shape", label: "Get in shape", description: "Movement, workouts, physical energy.", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { id: "mental", label: "Improve mental health", description: "Calm, clarity, less overwhelm.", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
  { id: "motivation", label: "Improve motivation", description: "Consistency, follow-through, momentum.", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)" },
  { id: "all", label: "All of the above", description: "Mind, body and soul — the whole picture.", Icon: IconCheck, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-text-default-secondary)" },
];

export default function OnboardingGoals() {
  const navigate = useNavigate();
  const { setOnboarding } = useAppState();
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    if (id === "all") {
      setSelected((s) => (s.includes("all") ? [] : ["all"]));
      return;
    }
    setSelected((s) => {
      const withoutAll = s.filter((g) => g !== "all");
      return withoutAll.includes(id) ? withoutAll.filter((g) => g !== id) : [...withoutAll, id];
    });
  };

  const canContinue = selected.length > 0;

  return (
    <OnboardingLayout
      backHref="/onboarding/coach"
      step={2}
      total={5}
      title="What are you looking for help with?"
      subtitle="Pick everything that feels true right now — you can adjust later."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {GOALS.map((g) => (
          <OptionCard key={g.id} {...g} testId={`goal-${g.id}`} selected={selected.includes(g.id)} onClick={() => toggle(g.id)} />
        ))}
      </div>

      <Button
        data-testid="cta-next"
        variant="primary"
        disabled={!canContinue}
        className="thryv-btn-full thryv-btn-invert"
        onClick={() => {
          if (!canContinue) return;
          setOnboarding({ goals: selected });
          navigate("/onboarding/schedule");
        }}
      >
        Next
      </Button>
    </OnboardingLayout>
  );
}
