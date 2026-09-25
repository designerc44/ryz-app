import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../ds/components";
import { TextTitlePage, TextSubtitle, TextCaption, TextStrong, Text, TextHeading, TextSmall } from "../ds/Text";
import { IconPlay, IconHeart, IconCheck, IconMoon, IconSun, IconCalendar } from "../ds/Icon";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";

// A few thumbnails have their title text baked in low in the frame, so the
// default top-anchored crop clips it — nudge those specific ones down.
const VIDEO_CROP_OVERRIDES = {
  "strength-video-0": "center 20%",
  "strength-video-2": "center 50%",
  "yoga-video-0": "center 50%",
  "cardio-video-0": "center 60%",
  "cardio-video-1": "center 40%",
  "cardio-video-2": "center 30%",
  "mindful-video-0": "center 30%",
  "mindful-video-1": "center 30%",
};

export const MOVEMENT_DATA = {
  strength: {
    title: "Strength & conditioning",
    subtitle: "Build muscle, power and confidence.",
    Icon: IconHeart,
    iconBg: "var(--thryv-color-ochre-200)",
    iconColor: "var(--thryv-color-text-warning-default)",
    videoPrefix: "strength-video-",
    segments: [
      { title: "Warm-up: mobility flow", duration: "6 min", instructions: "Loosen up your hips, shoulders and spine before you load the body. Move slowly and stay with your breath." },
      { title: "Full-body strength circuit", duration: "15 min", instructions: "Squats, push-ups and rows — steady reps, full control. Rest when you need to; form beats speed." },
      { title: "Cool-down stretch", duration: "6 min", instructions: "Bring your heart rate down and stretch what you worked. Hold each stretch for a few slow breaths." },
    ],
  },
  yoga: {
    title: "Yoga & stretching",
    subtitle: "Flexibility, breath and body awareness.",
    Icon: IconMoon,
    iconBg: "var(--thryv-color-moss-200)",
    iconColor: "var(--thryv-color-moss-700)",
    videoPrefix: "yoga-video-",
    segments: [
      { title: "Gentle sun salutations", duration: "6 min", instructions: "Flow through a few easy rounds to wake up the body. Let your breath set the pace." },
      { title: "Deep hip & hamstring stretch", duration: "8 min", instructions: "Sink into each stretch slowly — there's no rush here. Ease off if anything feels sharp." },
      { title: "Seated breath and stillness", duration: "6 min", instructions: "Settle into a comfortable seat and follow the guided breathing to close out your practice." },
    ],
  },
  walking: {
    title: "Walking & cardio",
    subtitle: "Steady movement that gets your heart going.",
    Icon: IconSun,
    iconBg: "var(--thryv-color-clay-200)",
    iconColor: "var(--thryv-color-clay-700)",
    videoPrefix: "cardio-video-",
    segments: [
      { title: "Brisk warm-up walk", duration: "5 min", instructions: "Start at an easy pace and let your body warm up before you pick up speed." },
      { title: "Interval cardio walk", duration: "18 min", instructions: "Alternate faster pushes with easy recovery stretches. Aim for a pace where talking feels a little harder." },
      { title: "Cool-down & stretch", duration: "7 min", instructions: "Slow it right down and stretch your calves, hamstrings and hips to finish." },
    ],
  },
  mindful: {
    title: "Mindful movement",
    subtitle: "Slow, breath-led practice, tai chi, gentle flow.",
    Icon: IconCalendar,
    iconBg: "var(--thryv-color-sand-200)",
    iconColor: "var(--thryv-color-sand-700)",
    videoPrefix: "mindful-video-",
    segments: [
      { title: "Centering breath", duration: "5 min", instructions: "Find a comfortable stance and settle your attention on your breath before you begin moving." },
      { title: "Slow flowing movement", duration: "12 min", instructions: "Follow the tai-chi-inspired flow at your own pace — smooth, continuous, unhurried." },
      { title: "Closing stillness", duration: "5 min", instructions: "Come to stillness and notice how your body feels before you carry on with your day." },
    ],
  },
};

export default function MovementSession({ movementId }) {
  const navigate = useNavigate();
  const { state } = useAppState();
  const data = MOVEMENT_DATA[movementId];
  const [done, setDone] = useState({});
  const [toastIndex, setToastIndex] = useState(null);
  const [favs, setFavs] = useState({});
  const coachName = state.coach.name || "Sage";

  const complete = (i) => {
    setDone((d) => ({ ...d, [i]: true }));
    setToastIndex(i);
    setTimeout(() => setToastIndex((t) => (t === i ? null : t)), 1800);
  };

  const totalMinutes = data.segments.reduce((sum, s) => sum + parseInt(s.duration, 10), 0);
  const allDone = data.segments.every((_, i) => done[i]);

  return (
    <div className="thryv-shell" style={{ background: "linear-gradient(180deg, var(--thryv-color-clay-600), var(--thryv-color-clay-500))" }}>
      <div className="thryv-shell-inner">
        <div className="thryv-shell-scroll">
          <div className="thryv-shell-header">
            <AppHeader mode="back" backHref="/dashboard" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: data.iconBg, color: data.iconColor }}>
              <data.Icon size={20} />
            </div>
            <TextTitlePage className="thryv-on-clay">{data.title}</TextTitlePage>
            <TextSubtitle className="thryv-on-clay-soft">{data.subtitle}</TextSubtitle>
            <TextCaption className="thryv-on-clay-soft">{totalMinutes} min · {data.segments.length} videos</TextCaption>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {data.segments.map((seg, i) => {
              const isDone = !!done[i];
              const isFav = !!favs[i];
              return (
                <div key={i} style={{ border: "1px solid #fff", borderRadius: "var(--thryv-radius-400)", padding: 14, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
                  <div style={{ position: "relative", width: "100%", height: 170, borderRadius: 16, overflow: "hidden" }}>
                    <SlotImage
                      id={`${data.videoPrefix}${i}`}
                      alt={seg.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                      imgStyle={{ transform: "none", objectPosition: VIDEO_CROP_OVERRIDES[`${data.videoPrefix}${i}`] || "top" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)", borderRadius: 16, border: "1.5px solid #fff", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", left: 14, bottom: 12 }}>
                      <TextSmall className="thryv-text-cream">{seg.duration}</TextSmall>
                    </div>
                    <button type="button" aria-label="Play video" style={{ position: "absolute", right: 14, bottom: 12, width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--thryv-color-cream-1000)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--thryv-color-clay-600)" }}>
                      <IconPlay size={16} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <TextStrong className="thryv-on-clay">{seg.title}</TextStrong>
                    <button
                      type="button"
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                      onClick={() => setFavs((f) => ({ ...f, [i]: !f[i] }))}
                      style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#fff", flexShrink: 0 }}
                    >
                      <IconHeart size={18} style={{ fill: isFav ? "#fff" : "none" }} />
                    </button>
                  </div>
                  <Text className="thryv-on-clay-soft">{seg.instructions}</Text>
                  <Button
                    data-testid={`complete-${i}`}
                    variant={isDone ? "secondary" : "primary"}
                    onClick={() => complete(i)}
                    style={isDone
                      ? { background: "transparent", border: "1px solid #fff", color: "#fff" }
                      : { background: "#fff", border: "1px solid #fff", color: "#000" }}
                  >
                    {isDone ? "Completed" : "Mark complete"}
                  </Button>
                  {toastIndex === i && (
                    <div style={{ position: "absolute", top: -14, right: 14, background: "var(--thryv-color-moss-400)", color: "#fff", padding: "8px 14px", borderRadius: "var(--thryv-radius-full)", boxShadow: "0 8px 16px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 6 }}>
                      <IconCheck size={14} style={{ color: "#fff" }} />
                      <TextSmall style={{ color: "#fff", fontWeight: 700 }}>Great job!</TextSmall>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allDone && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", padding: "24px 20px", borderTop: "1px solid #fff" }}>
              <TextHeading className="thryv-on-clay">You did great!</TextHeading>
              <TextSubtitle className="thryv-on-clay-soft">Session complete — {coachName} is proud of you.</TextSubtitle>
              <Button data-testid="cta-back-to-dashboard" variant="primary" onClick={() => navigate("/dashboard")}>Back to dashboard</Button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
