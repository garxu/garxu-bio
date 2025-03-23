export default function Badge({ src }: { src: string }) {
  return <img src={src} alt="badge" style={{ width: 24, height: 24 }} />;
}
