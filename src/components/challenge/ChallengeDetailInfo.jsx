import DocTypeChip from '../common/DocTypeChip';
import { Profile } from '../common/Profile';

import styles from './ChallengeDetailInfo.module.css';

const ChallengeDetailInfo = ({ list }) => {
  const user = list?.writer;

  return (
    <>
      {list ? (
        <div className={styles.ChallengeDetailInfo}>
          <div className={styles.title}>{list.title}</div>
          <DocTypeChip field={list.field} docType={list.docType} />
          <div className={styles.description}>{list.description}</div>
          <div className={styles['user-profile']}>
            {user && <Profile user={user} width="24px" type="simple" />}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ChallengeDetailInfo;
