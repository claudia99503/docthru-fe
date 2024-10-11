import React from 'react';
import { useRouter } from 'next/router';
import assets from '../variables/images';
import styles from './TabNavigation.module.css';

const TabNavigation = ({ activeTab }) => {
  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>나의 챌린지</h1>
        <button className={styles.newChallengeButton} onClick={() => router.push('/application')}>
          <span>신규 챌린지 신청</span>
          <img src={assets.icons.plusLarge} alt="plus Icon" className={styles.icon} />
        </button>
      </div>

      <div className={styles.TabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'ongoing' ? styles.active : ''}`}
          onClick={() => handleTabClick('/me')}
        >
          참여 중인 챌린지
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'completed' ? styles.active : ''}`}
          onClick={() => handleTabClick('/me/done')}
        >
          완료한 챌린지
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'applications' ? styles.active : ''}`}
          onClick={() => handleTabClick('/me/application')}
        >
          신청한 챌린지
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;

