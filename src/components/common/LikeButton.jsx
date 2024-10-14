import styles from './LikeButton.module.css';
import assets from '@/variables/images';
import Image from 'next/image';
import { formatLikes } from '@/utils/utilFunction';
export default function LikeButton({ data, isButton = true }) {
  const imgSrc = data.isLiked
    ? assets.icons.heartActive
    : assets.icons.heartInactive;

  return (
    <button className={styles.LikeButton} disabled={isButton}>
      <Image src={imgSrc} width={16} height={16} />
      <span className={styles.number}>{formatLikes(data.likeCount)}</span>
    </button>
  );
}
