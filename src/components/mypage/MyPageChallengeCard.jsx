import { useEffect, useState } from 'react';
import MyPageChallengeButton from './MyPageChallengeButton';
import Card from '@/components/challenge/Card';
import styles from './MyPageChallengeCard.module.css';

const MyPageChallengeCard = ({ list }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = list?.length || 0;

  function getWindowSize() {
    const width = window.innerWidth;

    if (width >= 1210) return 'web';
    if (width >= 962) return 'tablet';
    return 'mobile';
  }

  const calculateTranslateX = () => {
    let translatePercentage;

    if (windowSize === 'mobile') {
      translatePercentage = 100;
    } else {
      translatePercentage = 101;
    }
    return `translateX(-${currentIndex * translatePercentage}%)`;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.title}>참여한 챌린지 목록</div>
        {length === 0 ? (
          <div className={styles.noChallenges}>
            <p>아직 참여한 챌린지가 없어요</p>
            <p>새로운 챌린지에 참여해보세요</p>
          </div>
        ) : (
          <div>
            <div className={styles.overflow}>
              <MyPageChallengeButton
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                action='goToPrevious'
                length={length}
                size={windowSize}
              />
              <div className={styles.slider}>
                <div
                  style={{
                    transform: calculateTranslateX(),
                    transition: 'transform 0.5s ease',
                  }}
                >
                  <div
                    className={styles.AllCardSection}
                    // style={{
                    //   justifyContent:
                    //     (windowSize === 'web' && length < 3) ||
                    //     (windowSize === 'tablet' && length < 2) ||
                    //     (windowSize === 'mobile' && length < 1)
                    //       ? 'center'
                    //       : 'flex-start',
                    // }}
                  >
                    {list.map((challenge, index) => (
                      <Card
                        key={challenge.id}
                        data={challenge}
                        site={'myPage'}
                        style={{ flex: '0 0 auto', width: '100%' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <MyPageChallengeButton
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                action='goToNext'
                length={length}
                size={windowSize}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageChallengeCard;
