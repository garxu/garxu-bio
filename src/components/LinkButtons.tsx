import React from "react";
import styles from "../styles/components/LinkButtons.module.scss";

interface LinkButton {
  icon: string;
  text: string;
  arrow: string;
  href: string;
}

export default function LinkButtons() {
  const buttons: LinkButton[] = [
    {
      icon: "/icons/nohello.png",
      text: "No Hello",
      arrow: "/icons/arrow_right.svg",
      href: "https://nohello.net/en/",
    },
    {
      icon: "/icons/favicon.ico",
      text: "Graphic Portfolio",
      arrow: "/icons/arrow_right.svg",
      href: "https://garxu.com/portfolio",
    },
  ];

  return (
    <div className={styles.linkButtons}>
      {buttons.map((btn, i) => (
        <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <img src={btn.icon} alt="" className={styles.leftIcon} />
          <span className={styles.text}>{btn.text}</span>
          <img src={btn.arrow} alt="Arrow" className={styles.rightArrow} />
        </a>
      ))}
    </div>
  );
}
