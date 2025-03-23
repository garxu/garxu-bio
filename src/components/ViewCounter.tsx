import useSWR from "swr";
import styles from "../styles/components/ViewCounter.module.scss";

const fetcher = (url:string) => fetch(url).then(res => res.json());

export default function ViewCounter() {
  const { data } = useSWR("/api/views", fetcher);
  return <div className={styles.viewCounter}>👁 {data?.count || 0}</div>;
}
