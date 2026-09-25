import { useNavigate, useLocation } from "react-router-dom";
import { NavigationTabBar, NavigationTabBarItem } from "../ds/components";
import { IconHome, IconCalendar, IconMessageCircle, IconUser } from "../ds/Icon";
import "./BottomNav.css";

const TABS = [
  { key: "home", label: "Home", icon: IconHome, path: "/dashboard" },
  { key: "calendar", label: "Calendar", icon: IconCalendar, path: "/calendar" },
  { key: "coach", label: "Coach", icon: IconMessageCircle, path: "/chat" },
  { key: "you", label: "You", icon: IconUser, path: "/settings" },
];

export function BottomNav({ active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = active ?? TABS.find((t) => location.pathname.startsWith(t.path))?.key;

  return (
    <div className="thryv-bottomnav-bg">
      <NavigationTabBar>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavigationTabBarItem
              key={tab.key}
              data-testid={`nav-${tab.key}`}
              selected={activeKey === tab.key}
              onClick={() => navigate(tab.path)}
              icon={<Icon size={24} />}
            >
              {tab.label}
            </NavigationTabBarItem>
          );
        })}
      </NavigationTabBar>
    </div>
  );
}
