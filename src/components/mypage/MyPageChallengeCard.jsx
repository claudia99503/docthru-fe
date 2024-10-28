import { useState } from 'react';
import MyPageChallengeButton from './MyPageChallengeButton';
import MyPageChallengeCardList from './MyPageChallengeCardList';
import styles from './MyPageChallengeCard.module.css';

const MyPageChallengeCard = ({ list, site }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = list?.length || 0;

  return (
    <div>
      <div className={styles.title}>참여한 챌린지 목록</div>
      {length === 0 ? (
        <>
          <div>
            <p>아직 참여한 챌린지가 없어요</p>
            <p>새로운 챌린지에 참여해보세요</p>
          </div>
        </>
      ) : (
        <div className={styles.relative}>
          <div className={styles.overflow}>
            <MyPageChallengeButton
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              action="goToPrevious"
              length={length}
            />
            <div className={styles.test}>
              <MyPageChallengeCardList
                list={list}
                currentIndex={currentIndex}
                site={site}
              />
            </div>

            <MyPageChallengeButton
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              action="goToNext"
              length={length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageChallengeCard;
