import styles from './Message.module.css';
import cn from '@/utils/clsx';

export default function Message({ msg, height = '100px', className }) {
  return (
    <p className={cn(styles.Message, className)} style={{ '--height': height }}>
      {msg}
    </p>
  );
}
