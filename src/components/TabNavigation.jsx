import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './TabNavigation.module.css';

const TabNavigation = () => {
  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.TabNavigation}>
      <button
        className={`${styles.tabButton} ${router.pathname === '/me' ? styles.active : ''}`}
        onClick={() => handleTabClick('/me')}
      >
        참여중인 챌린지
      </button>
      <button
        className={`${styles.tabButton} ${router.pathname === '/me/done' ? styles.active : ''}`}
        onClick={() => handleTabClick('/me/done')}
      >
        완료한 챌린지
      </button>
      <button
        className={`${styles.tabButton} ${router.pathname === '/me/application' ? styles.active : ''}`}
        onClick={() => handleTabClick('/me/application')}
      >
        신청한 챌린지
      </button>
    </div>
  );
};

export default TabNavigation;

