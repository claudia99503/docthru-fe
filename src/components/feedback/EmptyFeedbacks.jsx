import styles from './EmptyFeedbacks.module.css';
import Image from 'next/image';
import assets from '@/variables/images';

export default function EmptyFeedbacks() {
  return (
    <div className={styles.EmptyFeedbacks}>
      <Image
        width={140}
        height={140}
        src={assets.images.replyEmpty}
        priority={true}
        alt="empty bubble chat image"
      />
      <p className={styles.text}>아직 피드백이 없어요. 피드백을 달아주세요!</p>
    </div>
  );
}
