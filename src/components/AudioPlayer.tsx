import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/components/AudioPlayer.module.scss";

interface Track { title: string; src: string; }

export default function AudioPlayer({ playlist }: { playlist: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current!;
    audio.volume = 0.2;
    audio.loop = true; // ← loop enabled

    const updateProgress = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
      setCurrentTime(audio.currentTime);
    };
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);

    audio.play().then(() => setPlaying(true)).catch(() => {});

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [current]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current!;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const changeTrack = (delta: number) => {
    let idx = current + delta;
    if (idx < 0) idx = playlist.length - 1;
    if (idx >= playlist.length) idx = 0;
    setCurrent(idx);
    setPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current!;
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} src={playlist[current].src} />
      <div className={styles.leftControls}>
        <img src={muted ? "/icons/mute.svg" : "/icons/volume.svg"} alt="Mute" onClick={toggleMute} />
      </div>
      <div className={styles.centerControls}>
        <div className={styles.trackTitle}>{playlist[current].title}</div>
        <div className={styles.time}>{formatTime(currentTime)} / {formatTime(duration)}</div>
        <div className={styles.progressBar} onClick={(e) => {
          const rect = (e.target as HTMLDivElement).getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          if (audioRef.current) audioRef.current.currentTime = ratio * (audioRef.current.duration || 0);
        }}>
          <div className={styles.progress} style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <div className={styles.rightControls}>
        <img src="/icons/backward.svg" alt="Prev" onClick={() => changeTrack(-1)} />
        <img src={playing ? "/icons/pause.svg" : "/icons/play.svg"} alt="Play/Pause" onClick={togglePlay} />
        <img src="/icons/forward.svg" alt="Next" onClick={() => changeTrack(1)} />
      </div>
    </div>
  );
}
