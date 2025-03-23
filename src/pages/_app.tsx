import Head from 'next/head';
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <title>Garxulogy</title>
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
      </Head>
      <Component {...pageProps} />
    </>
  );
}
