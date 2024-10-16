import { useState } from 'react';

import Head from 'next/head';
import TabNavigation from '../../../components/layouts/TabNavigation';
import ChallengeSearchBarLarge from '../../../components/common/ChallengeSearchBarLarge';

import seed from '../../../../mockup/challenge';

import styles from '../../../styles/pages/Home.module.css';
import AllCardSection from '@/components/challenge/AllCardSection';

export default function MyFinishedChallengePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const seedData = seed;

  return (
    <>
      <Head>
        <title>완료한 챌린지</title>
        <meta
          name="description"
          content="사용자가 완료한 챌린지 목록을 확인하는 페이지입니다."
        />
      </Head>
      <div>
        <div>
          <TabNavigation activeTab="completed" />
        </div>
        <div className={styles.SearchContainer}>
          <ChallengeSearchBarLarge
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <AllCardSection seedData={seedData} searchTerm={searchTerm} site={'done'}/>
      </div>
    </>
  );
}
