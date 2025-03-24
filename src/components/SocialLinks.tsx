import React from 'react';
import styles from '../styles/components/SocialLinks.module.scss';

interface SocialLink {
  href: string;
  icon: string;
  alt: string;
}

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className={styles.socialLinks}>
      {links.map(({ href, icon, alt }, i) => (
        <div key={i} className={styles.iconWrapper}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={icon} alt={alt} />
          </a>
          <span className={styles.tooltip}>{alt}</span>
        </div>
      ))}
    </div>
  );
}
