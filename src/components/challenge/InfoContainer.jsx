import React from 'react';
import styles from './InfoContainer.module.css';
import assets from '@/variables/images';
import Image from 'next/image';

const InfoContainer = ({ deadline, maxParticipants }) => {
  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  return (
    <div className={styles['info-row']}>
      <Image
        src={assets.icons.deadline}
        alt="deadline icon"
        className={styles.icon}
        width={24}
        height={24}
      />
      <span className={styles.text}>{formatDeadline(deadline)}</span>
      <Image
        src={assets.icons.person}
        alt="person icon"
        className={styles.icon}
        width={16}
        height={16}
      />
      <span className={styles.text}>{maxParticipants}</span>
    </div>
  );
};

export default InfoContainer;
