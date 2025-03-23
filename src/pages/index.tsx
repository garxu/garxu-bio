import dynamic from "next/dynamic";
import BoxContainer from "../components/BoxContainer";
import Banner from "../components/Banner";
import ViewCounter from "../components/ViewCounter";
import AudioPlayer from "../components/AudioPlayer";
import TypewriterText from "../components/TypewriterText";
const CatFollower = dynamic(() => import("../components/CatFollower"), { ssr: false });

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
      <ViewCounter />
      <AudioPlayer
        playlist={[{ title: "Boyz Don't Cry", src: "/audio/fivio_foreign.mp3" }]}
      />
    </BoxContainer>
    <CatFollower />
    </div>
  );
}
