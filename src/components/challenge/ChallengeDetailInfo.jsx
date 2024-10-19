import { useRouter } from 'next/router';
import DocTypeChip from '../common/DocTypeChip';
import { Profile } from '../common/Profile';

import styles from './ChallengeDetailInfo.module.css';
import Container from './Container';
import { useEffect, useState } from 'react';

const ChallengeDetailInfo = ({ list }) => {
  const router = useRouter();
  const [type, setType] = useState('beginning');
  const [progress, setProgress] = useState(true);

  const { id: challengeId } = router.query;

  const data = list[challengeId - 1];
  const user = data?.applications[0].user;
  // const user = list?.applications[0].user;

  console.log(list)

  const getTypes = () => {
    const today = new Date();
    const deadline = new Date(data?.deadline);
    
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
      {data ? (
        <div className={styles.ChallengeDetailInfo}>
          <div className={styles['challenge-info']}>
            <div className={styles.title}>{data.title}</div>
            <DocTypeChip field={data.field} docType={data.docType} />
            <div className={styles.description}>{data.description}</div>
            <div className={styles['user-profile']}>
              <Profile user={user} width="24px" type="simple" />
              <span>{user.nickname}</span>
            </div>
          </div>
          <Container
            deadline={data.deadline}
            participants={data.participants}
            maxParticipants={data.maxParticipants}
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
