import styles from '@/components/challenge/BestRecWork.module.css';
import images from '@/variables/images';
import { useState } from 'react';

const BestRecWork = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.BestRecWork}>
      <div className={styles['bestRecWork-badge']}>
        <img src={images.icons.medal} alt="bestRecWork-badge icon" />
        <span>최다 추천 번역</span>
      </div>
      <div className={styles['writer-info']}>
        <span>a b</span>
        <span>c</span>
      </div>
      <div className={styles['bestWork-content']}>
        <div className={`${styles['bestWork-text']} ${isExpanded ? styles.expanded : ''}` }>
          abcde fghijk lmn op qrs tuv wx yz abcdefgh ijk lmn op qrs tuv wx yz ab
          cdefghijk lmn op qrs tuv wx yz abcdefghijk lmn op qrs tuv wx yz
          abcdefghijk lmn op qrs tuv wx yz
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          abcdefghijk lmn op qrs tuv wx yz
        </div>
        {!isExpanded ? (
          <button className={styles.btn} onClick={() => setIsExpanded(true)}>
            <span>더보기</span>
            <img src={images.icons.arrowDownCircle} alt="arrowDownCircle icon" />
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

export default BestRecWork;
