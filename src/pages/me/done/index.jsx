import { useEffect, useState } from 'react';

import { useGetChallenges } from '@/service/queries/challenge';
import { challengeList } from '../../../../mockup/challenge';

import Head from 'next/head';
import TabNavigation from '../../../components/layouts/TabNavigation';
import ChallengeSearchBarLarge from '../../../components/common/ChallengeSearchBarLarge';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/application/Pagination';

import AllCardSection from '@/components/challenge/AllCardSection';

import styles from '../../../styles/pages/Home.module.css';

export default function MyFinishedChallengePage() {
  const [params, setParams] = useState({
    limit: 5,
  });

  const { list = [], meta = {} } = challengeList || {};
  const { totalPages, page = 1 } = meta;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(5);

  // const { data, isPending } = useGetChallenges(params);

  // if (isPending) {
  //   return <Loader />;
  // }

  const filteredData = list.filter((item) => {
    const today = new Date();
    const deadline = new Date(item.deadline);

    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (deadline <= today) {
      return item;
    }
  });

  // 현재 페이지의 데이터만 추출
  const currentList = filteredData?.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );
  console.log(currentList);
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
        <AllCardSection
          list={currentList}
          searchTerm={searchTerm}
          site={'done'}
        />
      </div>
      {meta && (
        <Pagination
          currentPage={currentPage}
          totalPages={1} // 계산된 totalPages 사용
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
