import { useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import ChallengeSearchBarLarge from '../components/common/ChallengeSearchBarLarge';
import images from '../variables/images';

import seed from '../../mockup/challenge';

import AllCardSection from '@/components/challenge/AllCardSection';
import ChallengeDropdown from '../components/challenge/ChallengeDropdown';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const seedData = seed;

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // setCurrentPage(1);
  };

  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>
      <div>
        <div className={styles.title}>
          <span>챌린지 목록</span>
          <button
            className={styles['new-challenge-button']}
            onClick={() => router.push('/application')}
          >
            <span>신규 챌린지 신청</span>
            <img
              src={images.icons.plus}
              alt="plus Icon"
              className={styles.icon}
            />
          </button>
        </div>
        <div className={styles.SearchContainer}>
          <ChallengeDropdown onOptionChange={handleOptionChange} />
          <ChallengeSearchBarLarge
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <AllCardSection
          seedData={seedData}
          searchTerm={searchTerm}
          selectedOption={selectedOption}
          site={'home'}
        />
      </div>
    </>
  );
}
