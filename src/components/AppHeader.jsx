import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconHeart } from "../ds/Icon";
import { TextCaption, TextStrong, TextSmall } from "../ds/Text";
import { useAppState } from "../state/AppState";
import "./AppHeader.css";

const NAV_LINKS = [
  { label: "Home", href: "/dashboard" },
  { label: "Calendar", href: "/calendar" },
  { label: "Chat with coach", href: "/chat" },
  { label: "Your progress", href: "/progress" },
  { label: "Strength & conditioning", href: "/movement/strength" },
  { label: "Yoga & stretching", href: "/movement/yoga" },
  { label: "Walking & cardio", href: "/movement/walking" },
  { label: "Mindful movement", href: "/movement/mindful" },
  { label: "Settings", href: "/settings" },
  { label: "Edit coach", href: "/edit-coach" },
];

const FAVORITES = [
  { title: "Morning breathing reset", meta: "10 min · Guided audio", href: "/session-player?session=body-scan" },
  { title: "Body scan meditation", meta: "15 min", href: "/session-player?session=body-scan" },
  { title: "Deep sleep", meta: "20 min", href: "/session-player?session=deep-sleep" },
  { title: "Warm-up: mobility flow", meta: "Strength & conditioning", href: "/movement/strength" },
  { title: "Sun salutation flow", meta: "Yoga & stretching", href: "/movement/yoga" },
  { title: "Walking intervals", meta: "Walking & cardio", href: "/movement/walking" },
];

export function AppHeader({ mode = "home", userName = "Jordan", backHref = "/dashboard", showActions = true, centerLabel = "" }) {
  const navigate = useNavigate();
  const { state } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!menuOpen && !favOpen) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
        setFavOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen, favOpen]);

  const favoritesCount = Object.values(state.favorites).filter(Boolean).length || 6;
  const isHome = mode === "home";

  return (
    <div className="thryv-ah-wrap">
      <div className="thryv-ah-inner">
        {centerLabel && (
          <div className="thryv-ah-center">
            <TextStrong className="thryv-ah-on-clay" style={{ letterSpacing: "0.04em", fontSize: 18 }}>
              {centerLabel}
            </TextStrong>
          </div>
        )}

        {isHome ? (
          <TextCaption className="thryv-ah-on-clay">Good morning, {userName}</TextCaption>
        ) : (
          <button type="button" data-testid="header-back" className="thryv-ah-row" onClick={() => navigate(backHref)}>
            <IconArrowLeft size={18} className="thryv-ah-on-clay" />
            <TextStrong className="thryv-ah-on-clay">Back</TextStrong>
          </button>
        )}

        {showActions && (
          <div className="thryv-ah-actions" ref={ref}>
            <button
              type="button"
              className="thryv-ah-fav"
              aria-label="Favorites"
              onClick={() => {
                setFavOpen((v) => !v);
                setMenuOpen(false);
              }}
            >
              <IconHeart size={16} style={{ color: "var(--thryv-color-text-warning-default)" }} />
              <TextStrong>{favoritesCount}</TextStrong>
            </button>
            <button
              type="button"
              data-testid="header-menu"
              className="thryv-ah-burger"
              aria-label="Menu"
              onClick={() => {
                setMenuOpen((v) => !v);
                setFavOpen(false);
              }}
            >
              <span />
              <span />
              <span />
            </button>

            {favOpen && (
              <>
                <div className="thryv-ah-backdrop" onClick={() => setFavOpen(false)} />
                <div className="thryv-ah-menu">
                  {FAVORITES.map((fav) => (
                    <button key={fav.title} className="thryv-ah-item" onClick={() => { setFavOpen(false); navigate(fav.href); }}>
                      <TextSmall style={{ color: "var(--thryv-color-ink-900)", fontWeight: 600 }}>{fav.title}</TextSmall>
                      <TextCaption style={{ color: "var(--thryv-color-text-default-secondary)" }}>{fav.meta}</TextCaption>
                    </button>
                  ))}
                </div>
              </>
            )}

            {menuOpen && (
              <>
                <div className="thryv-ah-backdrop" onClick={() => setMenuOpen(false)} />
                <div className="thryv-ah-menu">
                  {NAV_LINKS.map((link) => (
                    <button key={link.label} data-testid={`menu-item-${link.href.slice(1)}`} className="thryv-ah-item" onClick={() => { setMenuOpen(false); navigate(link.href); }}>
                      <TextSmall style={{ color: "var(--thryv-color-ink-900)", fontWeight: 600 }}>{link.label}</TextSmall>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
