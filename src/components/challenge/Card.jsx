import { useRouter } from 'next/router';

import DocTypeChip from '../common/DocTypeChip';
import KebabMenu from '../common/KebabMenu';
import images from '../../variables/images';

import styles from './Card.module.css';
import { useEffect, useState } from 'react';

const Card = ({ data, site }) => {
  const [myData, setMyData] = useState(data);

  useEffect(() => {
    if (site !== 'home' && myData?.challenge) {
      setMyData(myData.challenge);
    }
  }, [site, myData]);

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
            router.pathname === `/work/${myData.id}` ? styles.active : ''
          }`}
          onClick={() => handleTabClick(`/work/edit`)}
        >
          <span>도전 계속하기</span>
          <img src={images.icons.arrowMainRight} alt="arrow icon" />
        </button>
      );
    } else if (site == 'done') {
      return (
        <button
          className={`${styles.challengeButton} ${
            router.pathname === `/work/${myData.id}` ? styles.active : ''
          }`}
          onClick={() => handleTabClick(`/work/${myData.id}`)}
          style={{ border: 'none' }}
        >
          <span>내 작업물 보기</span>
          <img src={images.icons.document} alt="document icon" />
        </button>
      );
    }
  };

  const getCondition = () => {
    const today = new Date();
    const deadline = new Date(myData.deadline);

    if (today >= deadline || myData.progress) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#262626', color: '#FFFFFF' }}
        >
          <img src={images.icons.deadline} alt="deadline icon" />
          <span>챌린지가 마감되었어요</span>
        </div>
      );
    } else if (
      myData.participants === myData.maxParticipants &&
      !myData.progress
    ) {
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

  const isAdmin = false;

  return (
    <div className={styles.Card}>
      <div className={styles['card-top']}>
        {getCondition()}
        {isAdmin ? (
          <div className={`${styles.menuButton}`}>
            <KebabMenu onEdit={onEdit} onDelete={onDelete} />
          </div>
        ) : (
          <></>
        )}

        <div
          className={styles['challenge-title']}
          onClick={() => handleTabClick(`/${myData.id}`)}
        >
          {myData.title}{' '}
        </div>
        <DocTypeChip field={myData.field} docType={myData.docType} />
      </div>
      <div className={styles['card-bottom']}>
        <div className={styles['info-row']}>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.deadline}
              alt="deadline icon"
              className={styles.icon}
            />
            <span className={styles.text}>
              {formatDeadline(myData.deadline)}
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <img
              src={images.icons.person}
              alt="person icon"
              className={styles.icon}
            />
            <span className={styles.text}>
              {myData.participants}/{myData.maxParticipants} 참여중
            </span>
          </div>
        </div>
        {getBtn()}
      </div>
    </div>
  );
};

export default Card;
