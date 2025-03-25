import useSWR from "swr";
import styles from "../styles/components/ViewCounter.module.scss";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ViewCounter({ className = '' }) {
  const { data, error } = useSWR('/api/views', fetcher, { refreshInterval: 60000 });

  if (error) return <div className={className}>Error loading views</div>;
  if (!data) return <div className={className}>Loading...</div>;

  return (
    <div className={`${styles.viewCounter} ${className}`}>
      <img src="/icons/view.svg" alt="Views" width={23} height={23} />
      <span className={styles.count}>{data.count}</span>
    </div>
  );
}
