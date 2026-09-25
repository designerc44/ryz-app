import { useEffect } from "react";
import { HashRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AppStateProvider } from "./state/AppState";

import LaunchAnimation from "./screens/LaunchAnimation";
import Welcome from "./screens/Welcome";
import CreateAccount from "./screens/CreateAccount";
import Login from "./screens/Login";
import CreateYourCoach from "./screens/CreateYourCoach";
import OnboardingGoals from "./screens/OnboardingGoals";
import SchedulePreference from "./screens/SchedulePreference";
import WorkoutTypes from "./screens/WorkoutTypes";
import NotificationPermission from "./screens/NotificationPermission";
import PersonalizedPlanReveal from "./screens/PersonalizedPlanReveal";
import HomeDashboard from "./screens/HomeDashboard";
import MovementSession from "./screens/MovementSession";
import SessionPlayer from "./screens/SessionPlayer";
import Calendar from "./screens/Calendar";
import ProgressInsights from "./screens/ProgressInsights";
import ChatWithCoach from "./screens/ChatWithCoach";
import SettingsProfile from "./screens/SettingsProfile";
import Paywall from "./screens/Paywall";
import EndScreen from "./screens/EndScreen";
import EditCoach from "./screens/EditCoach";
import SessionComplete from "./screens/SessionComplete";
import NoInternet from "./screens/NoInternet";
import ChatOffline from "./screens/ChatOffline";
import MorningCheckInReminder from "./screens/MorningCheckInReminder";

function MovementRoute() {
  const { movementId } = useParams();
  return <MovementSession movementId={movementId} />;
}

// Lets an external driver (e.g. the walkthrough-video recording script) trigger
// a real client-side route change without a full page reload. Inert otherwise.
function WalkthroughBridge() {
  const navigate = useNavigate();
  useEffect(() => {
    const onNavigate = (e) => navigate(e.detail);
    window.addEventListener("wt:navigate", onNavigate);
    return () => window.removeEventListener("wt:navigate", onNavigate);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <WalkthroughBridge />
        <Routes>
          <Route path="/" element={<LaunchAnimation />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />

          <Route path="/onboarding/coach" element={<CreateYourCoach />} />
          <Route path="/onboarding/goals" element={<OnboardingGoals />} />
          <Route path="/onboarding/schedule" element={<SchedulePreference />} />
          <Route path="/onboarding/workout-types" element={<WorkoutTypes />} />
          <Route path="/onboarding/notifications" element={<NotificationPermission />} />
          <Route path="/onboarding/plan-reveal" element={<PersonalizedPlanReveal />} />

          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/movement/:movementId" element={<MovementRoute />} />
          <Route path="/session-player" element={<SessionPlayer />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/progress" element={<ProgressInsights />} />
          <Route path="/chat" element={<ChatWithCoach />} />
          <Route path="/settings" element={<SettingsProfile />} />
          <Route path="/edit-coach" element={<EditCoach />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/session-complete" element={<SessionComplete />} />
          <Route path="/no-internet" element={<NoInternet />} />
          <Route path="/chat-offline" element={<ChatOffline />} />
          <Route path="/morning-check-in" element={<MorningCheckInReminder />} />

          <Route path="/end" element={<EndScreen />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}
