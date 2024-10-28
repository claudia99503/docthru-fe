import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { updateChallenge } from '@/service/api/challenge';

import DocTypeChip from '../common/DocTypeChip';
import KebabMenu from '../common/KebabMenu';
import images from '../../variables/images';
import AdminModal from '../application/AdminModal';

import styles from './Card.module.css';

const Card = ({ data, site, isAdmin, onChallengeDeleted }) => {
  const router = useRouter();
  const [myData, setMyData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    if (site !== 'home' && data?.challenge) {
      setMyData(data.challenge);
    }
  }, [site, data]);

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
    if (myData.progress) {
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

  const handleTabClick = (path) => {
    router.push(path);
  };

  const handleEditClick = () => {
    router.push(`/application/${data.id}`);
  };

  const handleDelete = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      await updateChallenge(data.id, { ...formData });
      setIsModalOpen(false);
      if (formData.status === 'DELETED' && onChallengeDeleted) {
        onChallengeDeleted(); 
      }
    } catch (error) {
      console.log(error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.Card}>
      <div className={styles['card-top']}>
        {getCondition()}
        {isAdmin ? (
          <div className={`${styles.menuButton}`}>
            <KebabMenu onEdit={handleEditClick} onDelete={handleDelete} />
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
      {isModalOpen && (
        <AdminModal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Card;
