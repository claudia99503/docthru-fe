import styles from './EmptyFeedbacks.module.css';
import cn from '@/utils/clsx';
import Svg from '../common/Svg';

export default function EmptyFeedbacks({ disabled = 'false' }) {
  const message = disabled
    ? '피드백이 없습니다.'
    : '피드백이 없어요. 피드백을 달아주세요!';
  return (
    <div className={cn(styles.EmptyFeedbacks, { [styles.disabled]: disabled })}>
      <Svg
        name="chatBubbles"
        className={cn(styles.chatIcon, { [styles.disabled]: disabled })}
      />
      <p className={styles.text}>{message}</p>
    </div>
  );
}
