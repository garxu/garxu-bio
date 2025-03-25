import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import { Unbounded } from "next/font/google";

import TitleTypewriter from "../components/TitleTypewriter";

import DisableInteractions from "../components/DisableInteractions";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["300", "700"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DisableInteractions />
      <TitleTypewriter text="Garxulogy" speed={150} pause={1000} />

      <Head>
        <link rel="preload" href="/audio/boyz_dont_cry.mp3" as="audio" />
        <link rel="preload" href="/audio/fivio_foreign.mp3" as="audio" />
        <link rel="preload" href="/icons/view.svg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Graphic Designer" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garxu.com" />
        <meta property="og:title" content="Garxulogy" />
        <meta property="og:description" content="Graphic Designer" />
        <meta property="og:image" content="https://garxu.com/avatar.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://garxu.com" />
        <meta name="twitter:title" content="Garxulogy" />
        <meta name="twitter:description" content="Graphic Designer" />
        <meta name="twitter:image" content="https://garxu.com/avatar.png" />

        {/* Social preview banner size */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:alt" content="/banner.jpg" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />

        {/* Apple Touch & Windows Tile */}
        <link rel="apple-touch-icon" sizes="180x180" href="/banner.jpg" />
        <meta name="msapplication-TileImage" content="/banner.jpg" />
      </Head>
      <div className={unbounded.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
