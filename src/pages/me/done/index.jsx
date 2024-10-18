import { useEffect, useState } from 'react';

import { useGetCompletedChallenge } from '@/service/queries/user';
import { useGetChallenges } from '@/service/queries/challenge';

import Head from 'next/head';
import TabNavigation from '../../../components/layouts/TabNavigation';
import ChallengeSearchBarLarge from '../../../components/common/ChallengeSearchBarLarge';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/application/Pagination';

import AllCardSection from '@/components/challenge/AllCardSection';

import styles from '../../../styles/pages/Home.module.css';

export default function MyFinishedChallengePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // const accessToken = 'your_access_token_here';
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  });

  // const { data, isPending } = useGetCompletedChallenge(accessToken, params);

  const { data, isPending } = useGetChallenges(params);

  if (isPending) {
    return <Loader />;
  }
  // console.log('data', data);
  // console.log('list', data?.list);
  // console.log('meta', data?.meta);

  const filteredData = data.list.filter((item) => {
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
  const list = {
    list: filteredData.slice((currentPage - 1) * limit, currentPage * limit),
  };

  // console.log(list);
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
        <AllCardSection data={list} searchTerm={searchTerm} site={'done'} />
        {data?.meta && (
          <Pagination
            currentPage={data.meta.currentPage}
            totalPages={data.meta.totalPages} // 계산된 totalPages 사용
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
