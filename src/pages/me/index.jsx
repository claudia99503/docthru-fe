import { useState } from 'react';

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
  const [limit, setLimit] = useState(5);
  const [params, setParams] = useState(
    {
      limit : 5
    }
  );

  const { data, isPending } = useGetOnGoingChallenge(params);
  const { list = [], meta = {} } = data || {};
  const { totalPages } = meta;

  // console.log('data', data)
  // console.log('list', list)
  // console.log('meta', meta)

  if (isPending) {
    return <Loader />;
  }

  // const filteredData = list?.filter((item) => {
  //   const today = new Date();
  //   const deadline = new Date(item.deadline);

  //   if (
  //     searchTerm &&
  //     !item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) {
  //     return false;
  //   }

  //   if (deadline > today) {
  //     return item;
  //   }
  // });

  // 현재 페이지의 데이터만 추출
  // const currentList = list?.slice(
  //   (currentPage - 1) * limit,
  //   currentPage * limit
  // );

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
  );
}
