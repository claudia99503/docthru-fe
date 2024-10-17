import { useState } from 'react';

// import { challengeList, work } from '../../../mockup/challenge';
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  let accessToken;

  if (typeof window !== 'undefined') {
    // 클라이언트 환경에서만 localStorage에 접근
    accessToken = localStorage.getItem('accessToken');
  }

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

  if (accessToken) {
    const { data, isPending } = useGetOnGoingChallenge(accessToken, params);
  } else {
    console.error('액세스 토큰이 없습니다.');
  }


  const { data, isPending } = useGetOnGoingChallenge(accessToken, params);

  if (isPending) {
    return <Loader />;
  }
  console.log('data', data);
  console.log('list', data?.list);
  console.log('meta', data?.meta);

  const filteredData = data.list.filter((item) => {
    const today = new Date();
    const deadline = new Date(item.deadline);

    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (deadline > today) {
      return item;
    }
  });

  // 현재 페이지의 데이터만 추출
  const list = {
    list: filteredData.slice((currentPage - 1) * limit, currentPage * limit),
  };

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
        <AllCardSection
          seedData={seedData}
          searchTerm={searchTerm}
          site={'ongoing'}
        />
        <Pagination
          currentPage={data.meta.currentPage}
          totalPages={3} // 계산된 totalPages 사용
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
