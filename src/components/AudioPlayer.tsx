import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/components/AudioPlayer.module.scss";

interface Track { title: string; src: string; }

function AudioPlayer({ playlist }: { playlist: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load & play track whenever current changes
  useEffect(() => {
    const audio = audioRef.current!;
    audio.src = playlist[current].src;
    audio.volume = 0.2;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, [current, playlist]);

  // Update progress, metadata, and advance on end
  useEffect(() => {
    const audio = audioRef.current!;
    const update = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
      setCurrentTime(audio.currentTime);
    };
    const setMeta = () => setDuration(audio.duration);
    const onEnded = () => setCurrent(prev => (prev + 1) % playlist.length);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [playlist.length]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current!;
    if (playing) audio.pause(); else audio.play();
    setPlaying(!playing);
  };

  const changeTrack = (delta: number) => {
    setCurrent(prev => {
      let next = prev + delta;
      if (next < 0) next = playlist.length - 1;
      if (next >= playlist.length) next = 0;
      return next;
    });
    setPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current!;
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} />
      <div className={styles.leftControls}>
        <img src={muted ? "/icons/mute.svg" : "/icons/volume.svg"} alt="Mute" onClick={toggleMute} />
      </div>
      <div className={styles.centerControls}>
        <div className={styles.trackTitle}>{playlist[current].title}</div>
        <div className={styles.time}>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</div>
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

export default React.memo(AudioPlayer);
