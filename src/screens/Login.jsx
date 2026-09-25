import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button, Input, Field, Label, Link } from "../ds/components";
import { TextTitlePage, TextSubtitle, TextCaption } from "../ds/Text";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email.trim().length > 0 && password.length > 0;

  return (
    <div className="thryv-app-bg">
      <div className="thryv-screen" style={{ padding: "0 24px 40px", gap: "clamp(28px,5vw,40px)" }}>
        <div style={{ margin: "0 -24px" }}>
          <AppHeader mode="back" backHref="/welcome" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextTitlePage className="thryv-on-clay">Welcome back</TextTitlePage>
          <TextSubtitle className="thryv-on-clay-soft">Good to see you again.</TextSubtitle>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field>
            <Label style={{ color: "#fff" }}>Email</Label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field>
            <Label style={{ color: "#fff" }}>Password</Label>
            <Input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <Link href="#" style={{ color: "#fff" }} onClick={(e) => e.preventDefault()}>
            Forgot password?
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <Button variant="primary" disabled={!canLogin} className="thryv-btn-full thryv-btn-invert" onClick={() => canLogin && navigate("/dashboard")}>
            Log in
          </Button>
          <TextCaption className="thryv-on-clay-soft">
            New to Ryz?{" "}
            <RouterLink to="/create-account" style={{ color: "var(--thryv-color-clay-100)", textDecoration: "underline", fontWeight: 600 }}>
              Create an account
            </RouterLink>
          </TextCaption>
        </div>
      </div>
    </div>
  );
}
