import React from "react";
import styles from "../styles/components/Banner.module.scss";

interface BannerProps {
  avatarSrc: string;
  username: string;
  badges: string[];
}

export default function Banner({ avatarSrc, username, badges }: BannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBackground} />
      <img src={avatarSrc} alt="Avatar" className={styles.avatar} />
      <h2 className={styles.username}>{username}</h2>
      <div className={styles.badges}>
        {badges.map((src, i) => (
          <div key={i} className={styles.badgeWrapper}>
            <img src={src} alt="" />
            <span className={styles.tooltip}>
              {src.split("/").pop()?.replace(".svg", "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
