import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setDark(stored === "dark");
  }, []);

  return (
    <button
      onClick={() => setDark(d => !d)}
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "rgba(0,0,0,0.3)",
        border: "none",
        borderRadius: 8,
        padding: 8,
        zIndex: 1000
      }}
    >
      <img
        src={dark ? "/icons/light.svg" : "/icons/dark.svg"}
        alt={dark ? "Light mode" : "Dark mode"}
        width={24}
        height={24}
      />
    </button>
  );
}
