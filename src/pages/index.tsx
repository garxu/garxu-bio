import dynamic from "next/dynamic";
import BoxContainer from "../components/BoxContainer";
import Banner from "../components/Banner";
import ViewCounter from "../components/ViewCounter";
import AudioPlayer from "../components/AudioPlayer";
import TypewriterText from "../components/TypewriterText";
const CatFollower = dynamic(() => import("../components/CatFollower"), { ssr: false });
import SocialLinks from '../components/SocialLinks';

export default function Home() {
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

      <ViewCounter />
      <AudioPlayer
        playlist={[{ title: "Boyz Don't Cry", src: "/audio/fivio_foreign.mp3" }]}
      />
    </BoxContainer>
    <CatFollower />
    </div>
  );
}
