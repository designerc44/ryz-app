import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { InputField, ListBox, ListBoxItem, SwitchField, Tag, Button, Link } from "../ds/components";
import { TextCaption, TextHeading, TextStrong, TextSmall, Text } from "../ds/Text";
import { SlotImage } from "../components/SlotImage";
import { useAppState } from "../state/AppState";

export default function SettingsProfile() {
  const navigate = useNavigate();
  const { state, setSubscribed } = useAppState();
  const [checkInEnabled, setCheckInEnabled] = useState(true);
  const [nudgesEnabled, setNudgesEnabled] = useState(true);
  const [name, setName] = useState("Jordan");
  const [email, setEmail] = useState("jordan@example.com");
  const [password, setPassword] = useState("");

  const coachName = state.coach.name || "Sage";
  const isSubscribed = state.subscribed;

  return (
    <div className="thryv-shell">
      <div className="thryv-shell-inner">
        <div className="thryv-shell-scroll">
          <div className="thryv-shell-header">
            <AppHeader mode="back" backHref="/dashboard" />
          </div>

          <TextCaption className="thryv-on-clay-soft">Your account</TextCaption>
          <TextHeading className="thryv-on-clay">Settings</TextHeading>

          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 18, flexShrink: 0, borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
            <SlotImage id="profile-avatar" alt="Your photo" style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0, background: "var(--thryv-color-clay-200)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <TextStrong>{name}</TextStrong>
              <TextSmall>{email}</TextSmall>
            </div>
            <Tag scheme={isSubscribed ? "moss" : "clay"}>{isSubscribed ? "Member" : "Free preview"}</Tag>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <TextCaption style={{ textAlign: "left", paddingLeft: 4, color: "var(--thryv-color-clay-100)" }}>Account</TextCaption>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 18, borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}>
              <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <TextCaption style={{ textAlign: "left", paddingLeft: 4, color: "var(--thryv-color-clay-100)" }}>Your coach</TextCaption>
            <ListBox>
              <ListBoxItem onSelect={() => navigate("/edit-coach")}>Coach name — {coachName}</ListBoxItem>
              <ListBoxItem onSelect={() => navigate("/edit-coach")}>Avatar &amp; coaching style</ListBoxItem>
            </ListBox>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <TextCaption style={{ textAlign: "left", paddingLeft: 4, color: "var(--thryv-color-clay-100)" }}>Notifications</TextCaption>
            <div style={{ padding: "16px 18px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
              <SwitchField label="Morning check-in" description={checkInEnabled ? "Daily at 7:00 am" : "Turned off"} checked={checkInEnabled} onChange={() => setCheckInEnabled((v) => !v)} />
            </div>
            <div style={{ padding: "16px 18px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
              <SwitchField label="Motivational nudges" description="Occasional encouragement between sessions." checked={nudgesEnabled} onChange={() => setNudgesEnabled((v) => !v)} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <TextCaption style={{ textAlign: "left", paddingLeft: 4, color: "var(--thryv-color-clay-100)" }}>Subscription</TextCaption>
            {isSubscribed ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderRadius: "var(--thryv-radius-200)", background: "var(--thryv-color-background-default-default)", boxShadow: "var(--thryv-shadow-100)" }}>
                <Text>Full access</Text>
                <Link href="#" onClick={(e) => { e.preventDefault(); setSubscribed(false); }}>Cancel subscription</Link>
              </div>
            ) : (
              <ListBox>
                <ListBoxItem data-testid="upgrade-link" onSelect={() => navigate("/paywall")}>Upgrade to full access</ListBoxItem>
              </ListBox>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <TextCaption style={{ textAlign: "left", paddingLeft: 4, color: "var(--thryv-color-clay-100)" }}>Support</TextCaption>
            <ListBox>
              <ListBoxItem>Real support, any time</ListBoxItem>
              <ListBoxItem>Help center</ListBoxItem>
            </ListBox>
          </div>

          <Button variant="neutral" className="thryv-btn-full" style={{ flexShrink: 0 }}>
            <span style={{ color: "var(--thryv-color-text-danger-default)" }}>Log out</span>
          </Button>
        </div>
      </div>
      <BottomNav active="you" />
    </div>
  );
}
