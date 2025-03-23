import React from "react";
import Tilt from "react-parallax-tilt";
import styles from "../styles/components/BoxContainer.module.scss";

export default function BoxContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tilt
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}
      tiltReverse={true}
      glareEnable
      glareMaxOpacity={0.2}
      perspective={1000}
      transitionSpeed={400}
      className={styles.boxContainer}
    >
      {children}
    </Tilt>
  );
}
