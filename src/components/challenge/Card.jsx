import { useRouter } from 'next/router';

import DocTypeChip from '../common/DocTypeChip';
import KebabMenu from '../common/KebabMenu';
import images from '../../variables/images';

import styles from './Card.module.css';

const Card = ({ data, site }) => {

  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  const getBtn = () => {
    if (site == 'ongoing') {
      return (
        <button
          className={`${styles.challengeButton} ${
            router.pathname === `/work/${data.id}` ? styles.active : ''
          }`}
          onClick={() => handleTabClick(`/work/${data.id}`)}
        >
          <span>도전 계속하기</span>
          <img src={images.icons.arrowMainRight} alt="arrow icon" />
        </button>
      );
    } else {
      return (
        <button
          className={`${styles.challengeButton} ${
            router.pathname === `/work/${data.id}` ? styles.active : ''
          }`}
          onClick={() => handleTabClick(`/work/${data.id}`)}
          style={{border:'none'}}
        >
          <span>내 작업물 보기</span>
          <img src={images.icons.document} alt="document icon" />
        </button>
      );
    }
  };

  const getCondition = () => {
    const today = new Date();
    const deadline = new Date(data.deadline);

    if (today >= deadline) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#262626', color: '#FFFFFF' }}
        >
          <img src={images.icons.deadline} alt="deadline icon" />
          <span>챌린지가 마감되었어요</span>
        </div>
      );
    } else if (data.participates === data.maxParticipates) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#E5E5E5' }}
        >
          <img src={images.icons.personWhite} alt="deadline icon" />
          <span>모집이 완료된 상태에요</span>
        </div>
      );
    }
  };

  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  function onEdit() {}
  function onDelete() {}

  return (
    <div
      className={styles.card}
      onClick={() => handleTabClick(`/challenge/${data.id}`)}
    >
      <div className={styles['card-top']}>
        {getCondition()}
        <div className={`${styles.menuButton}`}>
          <KebabMenu onEdit={onEdit} onDelete={onDelete} />
        </div>
        <div className={styles['challenge-title']}>{data.title} </div>
        <DocTypeChip field={data.field} docType={data.docType} />
      </div>
      <div className={styles['card-bottom']}>
        <div className={styles['info-row']}>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.deadline}
              alt="deadline icon"
              className={styles.icon}
            />
            <span className={styles.text}>{formatDeadline(data.deadline)}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.person}
              alt="person icon"
              className={styles.icon}
            />
            <span className={styles.text}>
              {data.participates}/{data.maxParticipates} 참여중
            </span>
          </div>
        </div>
        {getBtn()}
      </div>
    </div>
  );
};

export default Card;
