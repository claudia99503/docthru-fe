import { useState } from 'react';

import LikeButton from '../common/LikeButton';
import { Profile } from '../common/Profile';
import { formatDateTime } from '@/utils/utilFunction';

import styles from './SeveralBestRecCards.module.css';
import images from '@/variables/images';

const SeveralBestRecCards = ({ list, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(index);
  // const { list = [], meta = {} } = challengeList || {};
  const lastModifiedAt = list.lastModifiedAt;

  const getWidth = () => {
    return index == 'notLast' ? {width:'826px'} : {width:'890px'}
  }

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
        <span>{formatDateTime(lastModifiedAt)}</span>
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
