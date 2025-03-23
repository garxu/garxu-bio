import { useEffect } from "react";

export default function CatFollower() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
