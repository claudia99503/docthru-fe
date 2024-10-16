import React from 'react';
import styles from './InfoContainer.module.css';
import assets from '@/variables/images';

const InfoContainer = ({ deadline, maxParticipants }) => {
  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  return (
    <div className={styles['info-row']}>
      <img
        src={assets.icons.deadline}
        alt="deadline icon"
        className={styles.icon}
      />
      <span className={styles.text}>{formatDeadline(deadline)}</span>
      <img
        src={assets.icons.person}
        alt="person icon"
        className={styles.icon}
      />
      <span className={styles.text}>
        {maxParticipants}
      </span>
    </div>
  );
};

export default InfoContainer;

