import React, { useEffect, useState } from 'react';
import styles from './AllCardSection.module.css';

import Card from './Card';

const AllCardSection = ({ initialChallenges, deadline }) => {
  const [challenges, setChallenges] = useState(initialChallenges);

  console.log(deadline)

  return (
    <div className={styles.AllCardSection}>
      {/* {challenges.map((challenge) => (
        <Card key={`challenge-${challenge.id}`} challenge={challenge} />
      ))} */}
      <Card
        title="aaa"
        field="NEXTJS"
        docType="OFFICIAL"
        deadline={deadline}
        participants={10} // 참가자 수
        maxParticipants={20} // 최대 참가자 수
      />
      <Card
        title="bbbbbbbbbbbbbb"
        field="API"
        docType="블로그"
        deadline={deadline}
        participants={10} // 참가자 수
        maxParticipants={10} // 최대 참가자 수
      />
    </div>
  );
};

export default AllCardSection;
