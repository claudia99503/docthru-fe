import styles from './EmptyFeedbacks.module.css';
import Image from 'next/image';

import styles from './EmptyComments.module.scss';
import assets from '@/variables/images';

export default function EmptyComments() {
  return (
    <div className={styles.EmptyComments}>
      <Image width="140px" src={assets.images.replyEmpty} priority={true} />
      <p>아직 댓글이 없어요, 지금 댓글을 달아보세요!</p>
    </div>
  );
}
