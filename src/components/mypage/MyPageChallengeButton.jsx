import styles from './MyPageChallengeCard.module.css';

const MyPageChallengeButton = ({
  currentIndex,
  setCurrentIndex,
  action,
  length,
}) => {
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex === length - 3) {
      setCurrentIndex(0);
    }
  };

  return (
    <>
      {action === 'goToPrevious' && (
        <button
          className={styles.ChallengeButton}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
      )}
      {action === 'goToNext' && length > 3 && (
        <button className={styles.ChallengeButton} onClick={goToNext}>
          &gt;
        </button>
      )}
    </>
  );
};

export default MyPageChallengeButton;
