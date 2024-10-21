import { useEffect, useState } from 'react';

import DocTypeChip from '../common/DocTypeChip';
import { Profile } from '../common/Profile';
import Container from './Container';

import styles from './ChallengeDetailInfo.module.css';

const ChallengeDetailInfo = ({ list }) => {
  const [type, setType] = useState('beginning');
  const [progress, setProgress] = useState(true);

  const user = list?.user;

  const getTypes = () => {
    const today = new Date();
    const deadline = new Date(list?.deadline);
    
    if(deadline <= today) {
      setProgress(false);
    }
    
  // 추후 작업 기록 여부 확인으로 변경 필요 
    if (user?.userId == 4) {
      setType('continuation');
    }
  // -----------------------------------------------
  };

  useEffect(() => {
    getTypes()
  }, []);

  return (
    <>
      {list ? (
        <div className={styles.ChallengeDetailInfo}>
          <div className={styles['challenge-info']}>
            <div className={styles.title}>{list.title}</div>
            <DocTypeChip field={list.field} docType={list.docType} />
            <div className={styles.description}>{list.description}</div>
            <div className={styles['user-profile']}>
              <Profile user={user} width="24px" type="simple" />
            </div>
          </div>
          <Container
            deadline={list.deadline}
            participants={list.participants}
            maxParticipants={list.maxParticipants}
            progress={progress}
            type={type}
          />
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ChallengeDetailInfo;
