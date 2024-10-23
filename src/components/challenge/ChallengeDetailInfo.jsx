import { useEffect, useState } from 'react';

import DocTypeChip from '../common/DocTypeChip';
import { Profile } from '../common/Profile';
import Container from './Container';

import styles from './ChallengeDetailInfo.module.css';

const ChallengeDetailInfo = ({ list, id }) => {
  const [type, setType] = useState('start');
  const [progress, setProgress] = useState(true);
  const [paramId, setParamId] = useState(list.id);

  const user = list?.writer;

  const getTypes = () => {
    const today = new Date();
    const deadline = new Date(list?.deadline);
    
    if(deadline <= today) {
      setProgress(false);
    }

    if(list.isParticipated) {
      setType('keep')
      setParamId(id)
    }
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
              {user && <Profile user={user} width="24px" type="simple2" /> }
            </div>
          </div>
          <Container
            deadline={list.deadline}
            participants={list.participants}
            maxParticipants={list.maxParticipants}
            progress={progress}
            id={paramId}
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
