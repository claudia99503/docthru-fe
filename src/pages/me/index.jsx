import { useEffect, useState } from 'react';

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

  const [accessToken, setAccessToken] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

//   // 클라이언트에서 액세스 토큰을 가져0옴
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         setAccessToken(token); // 액세스 토큰이 있으면 상태에 저장
//       } else {
//         console.error('액세스 토큰이 없습니다.');
//       }
//     }
//   }, []);

//  // 훅을 항상 호출하고, 액세스 토큰이 있을 때만 쿼리를 실행
//  const { data, isPending } = useGetOnGoingChallenge(accessToken, params, {
//   enabled: !!accessToken, // accessToken이 있을 때만 실행
// });

  const { data, isPending } = useGetOnGoingChallenge(params)
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
    list : filteredData?.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    )
  }

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
          data={list}
          searchTerm={searchTerm}
          site={'ongoing'}
        />
        <Pagination
          currentPage={1}
          totalPages={3} // 계산된 totalPages 사용
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
