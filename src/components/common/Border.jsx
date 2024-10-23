import cn from '@/utils/clsx';
import styles from './Border.module.css';

export default function Border({ gap }) {
  return <div className={styles.Border} style={{ '--gap': gap }}></div>;
}
