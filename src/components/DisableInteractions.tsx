import { useEffect } from "react";

export default function DisableInteractions() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("selectstart", prevent);

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        prevent(e);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
