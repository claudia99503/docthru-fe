import { useState } from 'react';

import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';
import ChallengeSearchBarLarge from '../../components/common/ChallengeSearchBarLarge';

import AllCardSection from '@/components/challenge/AllCardSection';

import { challengeList, work } from '../../../mockup/challenge';

import styles from '../../styles/pages/Home.module.css';

export default function MyChallengePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const seedData = challengeList[0].list;

  return (
    <>
      <Head>
        <title>참여중인 챌린지</title>
        <meta
          name="description"
          content="사용자가 현재 참여 중인 챌린지 목록을 확인하는 페이지입니다."
        />
      </Head>
      <div>
        <div>
          <TabNavigation activeTab="ongoing" />
        </div>
        <div className={styles.SearchContainer}>
          <ChallengeSearchBarLarge
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <AllCardSection seedData={seedData} searchTerm={searchTerm} site={'ongoing'}/>
      </div>
    </>
  );
}
