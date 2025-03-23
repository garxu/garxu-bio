import { useState, useEffect } from "react";
import styles from "../styles/components/TypewriterText.module.scss";

interface Props {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

export default function TypewriterText({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pause = 2000,
}: Props) {
  const [display, setDisplay] = useState("");
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = text;

    if (!isDeleting && display.length < fullText.length) {
      timeout = setTimeout(() => setDisplay(fullText.slice(0, display.length + 1)), typingSpeed);
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(fullText.slice(0, display.length - 1)), deletingSpeed);
    } else {
      timeout = setTimeout(() => setDeleting(!isDeleting), pause);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, text, typingSpeed, deletingSpeed, pause]);

  return <p className={styles.typewriter}>{display}<span className={styles.cursor}>|</span></p>;
}
