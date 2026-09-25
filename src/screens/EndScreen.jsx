import { useNavigate } from "react-router-dom";
import { TextTitlePage } from "../ds/Text";
import { useAppState } from "../state/AppState";
import logoWordmark from "../assets/ryz-logo-wordmark.svg";
import "./LaunchAnimation.css";

export default function EndScreen() {
  const navigate = useNavigate();
  const { reset } = useAppState();

  return (
    <button
      type="button"
      onClick={() => {
        reset();
        navigate("/");
      }}
      aria-label="Restart"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #411f11 0%, #290700 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, padding: "0 32px" }}>
        <img src={logoWordmark} alt="Ryz" className="launch-logo" style={{ width: 280, maxWidth: "100%", height: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextTitlePage className="launch-line1">Find your calm,</TextTitlePage>
          <TextTitlePage className="launch-line2">one day at a time.</TextTitlePage>
        </div>
      </div>
    </button>
  );
}
