import React from 'react';
import { useRouter } from 'next/router';
import assets from '../../variables/images';
import styles from './TabNavigation.module.css';
import Image from 'next/image';

const TabNavigation = ({ activeTab }) => {
  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>나의 챌린지</h1>
        <button
          className={styles['new-challenge-button']}
          onClick={() => router.push('/application')}
        >
          <span>신규 챌린지 신청</span>
          <Image
            src={assets.icons.plus}
            alt="plus Icon"
            className={styles.icon}
            width={16}
            height={16}
          />
        </button>
      </div>

      <div className={styles['tab-navigation']}>
        <button
          className={`${styles['tab-button']} ${
            activeTab === 'ongoing' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('/me')}
        >
          참여 중인 챌린지
        </button>
        <button
          className={`${styles['tab-button']} ${
            activeTab === 'completed' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('/me/done')}
        >
          완료한 챌린지
        </button>
        <button
          className={`${styles['tab-button']} ${
            activeTab === 'applications' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('/me/application')}
        >
          신청한 챌린지
        </button>
      </div>
    </>
  );
};

export default TabNavigation;
