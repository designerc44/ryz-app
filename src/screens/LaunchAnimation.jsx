import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { TextTitlePage } from "../ds/Text";
import logoWordmark from "../assets/ryz-logo-wordmark.svg";
import "./LaunchAnimation.css";

export default function LaunchAnimation() {
  const navigate = useNavigate();
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(0);

  useEffect(() => {
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    at(300, () => setLogoOpacity(1));
    at(2200, () => setTaglineOpacity(1));
    at(5300, () => {
      const go = () => navigate("/welcome", { replace: true });
      // Cross-fades the whole page into Welcome instead of a hard cut.
      // Falls back to a plain navigate on browsers without View Transitions.
      if (document.startViewTransition) {
        document.startViewTransition(() => flushSync(go));
      } else {
        go();
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #411f11 0%, #290700 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, padding: "0 32px" }}>
        <img
          src={logoWordmark}
          alt="Ryz"
          className="launch-logo"
          style={{ width: 280, maxWidth: "100%", height: "auto", opacity: logoOpacity, transition: "opacity 1100ms ease" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, opacity: taglineOpacity, transition: "opacity 1100ms ease" }}>
          <TextTitlePage className="launch-line1">Find your calm,</TextTitlePage>
          <TextTitlePage className="launch-line2">one day at a time.</TextTitlePage>
        </div>
      </div>
    </div>
  );
}
