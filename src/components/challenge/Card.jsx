import { useRouter } from 'next/router';
import styles from './Card.module.css';
import DocTypeChip from '../common/DocTypeChip';
import images from '../../variables/images';

const Card = ({
  title,
  field,
  docType,
  deadline,
  participants,
  maxParticipants,
}) => {
  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  const getCondition = () => {
    const today = new Date().toLocaleDateString();
    const time = new Date(deadline).toLocaleDateString();

    if (today >= time) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#262626', color: '#FFFFFF' }}
        >
          <img src={images.icons.deadlineSmall} alt="deadline icon" />
          <span>챌린지가 마감되었어요</span>
        </div>
      );
    } else if (participants == maxParticipants) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#E5E5E5' }}
        >
          <img src={images.icons.personMediumWhite} alt="deadline icon" />
          <span>모집이 완료된 상태에요</span>
        </div>
      );
    }
  };

  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.card}>
      <div className={styles['card-top']}>
        {getCondition()}
        <button className={`${styles.menuButton}`}>
          <img src={images.icons.meatballsMenu} alt="menu icon" />
        </button>
        <div className={styles['challenge-title']}>{title} </div>
        <DocTypeChip field={field} docType={docType} />
      </div>
      <div className={styles['card-bottom']}>
        <div className={styles['info-row']}>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.deadlineLarge}
              alt="deadline icon"
              className={styles.icon}
            />
            <span className={styles.text}>{formatDeadline(deadline)}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.personLarge}
              alt="person icon"
              className={styles.icon}
            />
            <span className={styles.text}>
              {participants}/{maxParticipants} 참여중
            </span>
          </div>
        </div>
        <button
          className={`${styles.challengeButton} ${
            router.pathname === '/work/' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('/work/')}
        >
          <span>도전 계속하기</span>
          <img src={images.icons.arrowMainRight} alt="arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;
