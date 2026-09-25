import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../components/OnboardingLayout";
import { OptionCard } from "../components/OptionCard";
import { Button } from "../ds/components";
import { IconHeart, IconMoon, IconSun, IconCalendar } from "../ds/Icon";
import { useAppState } from "../state/AppState";

const TYPES = [
  { id: "strength", label: "Strength & conditioning", description: "Build muscle, power and confidence.", Icon: IconHeart, iconBg: "var(--thryv-color-ochre-200)", iconColor: "var(--thryv-color-text-warning-default)" },
  { id: "yoga", label: "Yoga & stretching", description: "Flexibility, breath and body awareness.", Icon: IconMoon, iconBg: "var(--thryv-color-moss-200)", iconColor: "var(--thryv-color-text-positive-default)" },
  { id: "cardio", label: "Walking & cardio", description: "Steady movement that gets your heart going.", Icon: IconSun, iconBg: "var(--thryv-color-clay-200)", iconColor: "var(--thryv-color-text-brand-default)" },
  { id: "mindful", label: "Mindful movement", description: "Slow, breath-led practice — tai chi, gentle flow.", Icon: IconCalendar, iconBg: "var(--thryv-color-sand-200)", iconColor: "var(--thryv-color-text-default-secondary)" },
];

export default function WorkoutTypes() {
  const navigate = useNavigate();
  const { setOnboarding } = useAppState();
  const [selected, setSelected] = useState([]);

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((t) => t !== id) : [...s, id]));
  const canContinue = selected.length > 0;

  return (
    <OnboardingLayout
      backHref="/onboarding/schedule"
      step={4}
      total={5}
      title="What kind of movement do you enjoy?"
      subtitle="Pick everything that sounds good — your plan will mix it in."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TYPES.map((t) => (
          <OptionCard key={t.id} {...t} testId={`type-${t.id}`} selected={selected.includes(t.id)} onClick={() => toggle(t.id)} />
        ))}
      </div>

      <Button
        data-testid="cta-reveal"
        variant="primary"
        disabled={!canContinue}
        className="thryv-btn-full thryv-btn-invert"
        onClick={() => {
          if (!canContinue) return;
          setOnboarding({ workoutTypes: selected });
          navigate("/onboarding/notifications");
        }}
      >
        Reveal my plan
      </Button>
    </OnboardingLayout>
  );
}
