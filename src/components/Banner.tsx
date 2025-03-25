import React from "react";
import styles from "../styles/components/Banner.module.scss";
import ViewCounter from "./ViewCounter";

interface BannerProps {
  avatarSrc: string;
  username: string;
  badges: string[];
}

export default function Banner({ avatarSrc, username, badges }: BannerProps) {
  return (
    <div className={styles.banner}>
      <img src="/banner.jpg" alt="Banner" className={styles.bannerImg} />
      <ViewCounter className={styles.viewCounter} />
      <img src={avatarSrc} alt="Avatar" className={styles.avatar} />

      <div className={styles.nameAndBadges}>
        <div className={styles.usernameWrapper}>
          <h2 className={styles.username}>{username}</h2>
          <span className={styles.usernameTooltip}>UID 1</span>
        </div>
        <div className={styles.badges}>
          {badges.map((src, i) => (
            <div key={i} className={styles.badgeWrapper}>
              <img src={src} alt="" />
              <span className={styles.tooltip}>{src.split("/").pop()?.replace(".svg", "")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
