import { useState } from 'react';

import LikeButton from '../common/LikeButton';
import { Profile } from '../common/Profile';
import { formatDate } from '@/utils/utilFunction';

import styles from './SeveralBestRecCards.module.css';
import images from '@/variables/images';
import { useMediaQuery } from 'react-responsive';

const SeveralBestRecCards = ({ list, last }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // const lastModifiedAt = list.lastModifiedAt;
  const lastModifiedAt = list.createdAt;
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 744px) and (max-width: 1199px)',
  });

  const getWidth = () => {
    if (isMobile) {
      return !last
        ? { maxWidth: '655px', width: '89%' }
        : { maxWidth: '696px' };
    } else if (isTablet) {
      return !last
        ? { maxWidth: '825px', width: '91%' }
        : { maxWidth: '890px' };
    } else {
      return !last ? { maxWidth: '826px' } : { maxWidth: 'none' };
    }
  };

  return (
    <div className={styles.SeveralBestRecCards} style={getWidth()}>
      <div className={styles['SeveralBestRecCards-badge']}>
        <img src={images.icons.medal} alt="bestRecWork-badge icon" />
        <span>최다 추천 번역</span>
      </div>
      <div className={styles['content-top']}>
        <div className={styles['user-info']}>
          <Profile user={list} type="simple2" />
          <LikeButton data={list} />
        </div>
        <span>{formatDate(lastModifiedAt, true)}</span>
      </div>
      <div className={styles['bestWork-content']}>
        <div
          className={`${styles['bestWork-text']} ${
            isExpanded ? styles.expanded : ''
          }`}
        >
          {list.content}
        </div>
        {!isExpanded ? (
          <button className={styles.btn} onClick={() => setIsExpanded(true)}>
            <span>더보기</span>
            <img
              src={images.icons.arrowDownCircle}
              alt="arrowDownCircle icon"
            />
          </button>
        ) : (
          <button className={styles.btn} onClick={() => setIsExpanded(false)}>
            <span>접기</span>
            <img src={images.icons.arrowUp} alt="arrowUp icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SeveralBestRecCards;
