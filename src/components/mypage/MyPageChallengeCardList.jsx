import { useState } from 'react';
import MyPageChallengeCardSlice from './MyPageChallengeCardSlice';

import styles from './MyPageChallengeCard.module.css';

const MyPageChallengeCardList = ({ list, site, currentIndex }) => {
  return (
    <>
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * 34.3}%)`,
          transition: 'transform 0.5s ease',
        }}
      >
        <div className={styles.challengeTableWrapper}>
          {list.length > 0 ? (
            <div className={styles.AllCardSection}>
              {list.map((challenge, index) => (
                <MyPageChallengeCardSlice
                  key={challenge.id}
                  data={challenge}
                  site={site}
                  style={{ flex: '0 0 auto', width: '100%' }}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noChallenges}>아직 챌린지가 없어요.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPageChallengeCardList;
