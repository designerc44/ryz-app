import { createContext, useContext, useMemo, useState } from "react";

const AppStateContext = createContext(null);

const MOVEMENT_TYPES = [
  { id: "strength", label: "Strength & Conditioning", duration: "20 min", path: "/movement/strength" },
  { id: "yoga", label: "Yoga & Stretching", duration: "15 min", path: "/movement/yoga" },
  { id: "walking", label: "Walking & Cardio", duration: "25 min", path: "/movement/walking" },
  { id: "mindful", label: "Mindful Movement", duration: "10 min", path: "/movement/mindful" },
];

const DEFAULT_STATE = {
  coach: { name: "Sage", avatarStyle: "grounded", personality: "calm" },
  onboarding: { goals: [], schedule: null, workoutTypes: [], notifications: null },
  favorites: {},
  subscribed: false,
  completedVideos: {},
  streak: 6,
};

export function AppStateProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);

  const api = useMemo(
    () => ({
      state,
      setCoach: (patch) => setState((s) => ({ ...s, coach: { ...s.coach, ...patch } })),
      setOnboarding: (patch) => setState((s) => ({ ...s, onboarding: { ...s.onboarding, ...patch } })),
      toggleFavorite: (id) =>
        setState((s) => ({ ...s, favorites: { ...s.favorites, [id]: !s.favorites[id] } })),
      setSubscribed: (v) => setState((s) => ({ ...s, subscribed: v })),
      markVideoComplete: (movementId, videoId) =>
        setState((s) => ({
          ...s,
          completedVideos: {
            ...s.completedVideos,
            [movementId]: { ...(s.completedVideos[movementId] || {}), [videoId]: true },
          },
        })),
      resetVideos: (movementId) =>
        setState((s) => ({ ...s, completedVideos: { ...s.completedVideos, [movementId]: {} } })),
      reset: () => setState(DEFAULT_STATE),
    }),
    [state]
  );

  return <AppStateContext.Provider value={api}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export { MOVEMENT_TYPES };
