import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import BoxContainer from "../components/BoxContainer";
import Banner from "../components/Banner";
import ViewCounter from "../components/ViewCounter";

const TypewriterText = dynamic(() => import('../components/TypewriterText'));
const SocialLinks = dynamic(() => import('../components/SocialLinks'));
const AudioPlayer = dynamic(() => import('../components/AudioPlayer'));

const CatFollower = dynamic(() => import("../components/CatFollower"), { ssr: false });

interface Track { title: string; src: string; }

export default function Home() {
  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    fetch("/api/audio-files")
      .then(res => res.json())
      .then((files: string[]) => {
        setPlaylist(files.map(src => ({ title: src.split("/").pop()!, src })));
      });
  }, []);

  return (
    <div className="scaleWrapper">
      <BoxContainer>
        <Banner
          avatarSrc="/avatar.png"
          username="Garxu"
          badges={[
            "/badges/premium.svg",
            "/badges/developer.svg",
            "/badges/crown.svg",
          ]}
        />

        <TypewriterText text="Graphic Designer" />

        <SocialLinks
          links={[
            { href: 'https://roblox.com/Trezzuun', icon: '/icons/roblox.svg', alt: 'Roblox' },
            { href: 'https://discord.gg/UWYS49H2Aw', icon: '/icons/discord.svg', alt: 'Discord' },
            { href: 'https://namemc.com/profile/NotCliqnt.2', icon: '/icons/namemc.svg', alt: 'NameMC' },
            { href: 'https://youtube.com/Garxu', icon: '/icons/youtube.svg', alt: 'YouTube' },
          ]}
        />

        {playlist.length > 0 && <AudioPlayer playlist={playlist} />}
      </BoxContainer>

      <CatFollower />
    </div>
  );
}
