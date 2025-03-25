import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  pause?: number;
}

export default function TitleTypewriter({ text, speed = 150, pause = 2000 }: Props) {
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeout: NodeJS.Timeout;

    const tick = () => {
      setDisplay(prev => 
        deleting 
          ? text.substring(0, prev.length - 1) 
          : text.substring(0, prev.length + 1)
      );

      if (!deleting && display === text) {
        timeout = setTimeout(() => setDeleting(true), pause);
      } else if (deleting && display === "") {
        setDeleting(false);
      }

      timeout = setTimeout(tick, deleting ? speed / 2 : speed);
    };

    timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, text, speed, pause]);

  useEffect(() => {
    document.title = display;
  }, [display]);

  return null;
}
