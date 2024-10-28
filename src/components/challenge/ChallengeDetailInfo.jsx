import { useState } from 'react';
import { useRouter } from 'next/router';

import { updateChallenge } from '@/service/api/challenge';

import DocTypeChip from '../common/DocTypeChip';
import KebabMenu from '../common/KebabMenu';
import { Profile } from '../common/Profile';

import styles from './ChallengeDetailInfo.module.css';
import AdminModal from '../application/AdminModal';

const ChallengeDetailInfo = ({ list }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const user = list?.writer;

  const handleEditClick = () => {
    router.push(`/application/${list.id}`);
  };

  const handleDelete = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      await updateChallenge(list.id, { ...formData });
      setIsModalOpen(false);
      if (formData.status === 'DELETED') {
        router.push('/admin'); 
      }
    } catch (error) {
      console.log(error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {list ? (
        <div className={styles.ChallengeDetailInfo}>
          <div className={styles.title}>
            {list.title}
            {list.isAdmin ? (
              <KebabMenu onEdit={handleEditClick} onDelete={handleDelete} />
            ) : (
              <></>
            )}
          </div>
          <DocTypeChip field={list.field} docType={list.docType} />
          <div className={styles.description}>{list.description}</div>
          <div className={styles['user-profile']}>
            {user && <Profile user={user} width="24px" type="simple" />}
          </div>

          {isModalOpen && (
            <AdminModal
              type={modalType}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleModalSubmit}
            />
          )}
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ChallengeDetailInfo;
