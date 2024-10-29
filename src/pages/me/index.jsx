import { useEffect, useState } from 'react';

import { useGetOnGoingChallenge } from '@/service/queries/user';

import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';
import ChallengeSearchBarLarge from '../../components/common/ChallengeSearchBarLarge';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/application/Pagination';

import AllCardSection from '@/components/challenge/AllCardSection';

import styles from '../../styles/pages/Home.module.css';

export default function MyChallengePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({});

  const { data, isPending } = useGetOnGoingChallenge(params, {
    enabled: true,
  });
  const { list = [], meta = {} } = data || {};
  const { totalPages } = meta;

  const handleOptionChange = (option) => {
    setParams((prev) => ({ ...prev, ...option }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const option = {
      keyword: searchTerm,
      page: currentPage,
    };

    handleOptionChange(option);
  }, [currentPage, searchTerm]);

  return (
    <>
      <Head>
        <title>참여중인 챌린지</title>
        <meta
          name="description"
          content="사용자가 현재 참여 중인 챌린지 목록을 확인하는 페이지입니다."
        />
      </Head>
      <div className={styles['tab-container']}>
        <div>
          <TabNavigation activeTab="ongoing" />
        </div>
        <div className={styles.SearchContainer}>
          <ChallengeSearchBarLarge
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div className={styles['card-container']}>
            <AllCardSection
              list={list}
              searchTerm={searchTerm}
              site={'ongoing'}
            />
          </div>
          {list.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // 계산된 totalPages 사용
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
}
