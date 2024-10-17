import DocTypeChip from '../common/DocTypeChip';
import { Profile } from '../common/Profile';

import styles from './ChallengeDetailInfo.module.css';
import Container from './Container';

const ChallengeDetailInfo = ({ detailData }) => {
  if (!detailData) detailData = {};

  return (
    <div className={styles.ChallengeDetailInfo}>
      <div className={styles['challenge-info']}>
        <div className={styles.title}>{detailData.title}</div>
        <DocTypeChip field={detailData.field} docType={detailData.docType} />
        <div className={styles.description}>{detailData.description}</div>
        <div className={styles['user-profile']}>
          <Profile user={detailData} width="24px" type="simple" />
          <span>{detailData.nickname}</span>
        </div>
      </div>
      <Container
        deadline={detailData.deadline}
        participants={detailData.participants}
        maxParticipants={detailData.maxParticipants}
        progress = {true}
      />
    </div>
  );
};

export default ChallengeDetailInfo;
