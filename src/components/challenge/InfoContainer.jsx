import React from 'react';
import styles from './InfoContainer.module.css';
import Svg from '../common/Svg';

const InfoContainer = ({ deadline, maxParticipants }) => {
  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  return (
    <div className={styles['info-row']}>
      <Svg name="deadline" alt="deadline icon" width="18" />
      <span className={styles.text}>{formatDeadline(deadline)}</span>
      <Svg name="person" alt="person icon" className={styles.icon} />
      <span className={styles.text}>{maxParticipants}</span>
    </div>
  );
};

export default InfoContainer;
