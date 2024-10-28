import cn from '@/utils/clsx';
import styles from './Border.module.css';

export default function Border({ gap, mobileGap, className }) {
  return (
    <div
      className={cn(styles.Border, className)}
      style={{ '--gap': gap, '--mobile-gap': mobileGap }}
    ></div>
  );
}
