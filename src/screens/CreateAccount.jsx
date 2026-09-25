import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button, Input, Field, Label } from "../ds/components";
import { TextTitlePage, TextSubtitle, TextCaption } from "../ds/Text";
import { Link as RouterLink } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canContinue = name.trim().length > 0 && email.trim().length > 0 && password.length >= 8;

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen" style={{ padding: "0 24px 40px", gap: "clamp(28px,5vw,40px)" }}>
        <div style={{ margin: "0 -24px" }}>
          <AppHeader mode="back" backHref="/welcome" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextTitlePage className="thryv-on-clay">Create your account</TextTitlePage>
          <TextSubtitle className="thryv-on-clay-soft">Just the basics — you can add more later.</TextSubtitle>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field>
            <Label style={{ color: "#fff" }}>Name</Label>
            <Input data-testid="input-name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field>
            <Label style={{ color: "#fff" }}>Email</Label>
            <Input data-testid="input-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field>
            <Label style={{ color: "#fff" }}>Password</Label>
            <Input data-testid="input-password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <Button
            data-testid="cta-continue"
            variant="primary"
            disabled={!canContinue}
            className="thryv-btn-full thryv-btn-invert"
            onClick={() => canContinue && navigate("/onboarding/coach")}
          >
            Continue
          </Button>
          <TextCaption className="thryv-on-clay-soft">
            Already have an account?{" "}
            <RouterLink to="/login" style={{ color: "var(--thryv-color-clay-100)", textDecoration: "underline", fontWeight: 600 }}>
              Log in
            </RouterLink>
          </TextCaption>
        </div>
      </div>
    </div>
  );
}
