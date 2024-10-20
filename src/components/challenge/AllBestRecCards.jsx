import { useState } from 'react';

import styles from './AllBestRecCards.module.css';
import images from '@/variables/images';
import { formatDateTime } from '@/utils/utilFunction';
import LikeButton from '../common/LikeButton';
import { Profile } from '../common/Profile';

const AllBestRecCards = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(list);
  // const { list = [], meta = {} } = challengeList || {};
  const lastModifiedAt = list.lastModifiedAt

  return (
    <>
      <div className={styles.AllBestRecCards}>
        <div className={styles['user-info']}>
          <Profile user={list} type='simple2' /> 
          <LikeButton data = {list} />
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
    </>
  );
};

export default AllBestRecCards;
