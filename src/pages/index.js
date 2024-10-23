import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useGetChallenges } from '@/service/queries/challenge';

import Head from 'next/head';
import ChallengeSearchBarLarge from '@/components/common/ChallengeSearchBarLarge';
import images from '@/variables/images';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/application/Pagination';

import AllCardSection from '@/components/challenge/AllCardSection';
import ChallengeDropdown from '@/components/challenge/ChallengeDropdown';

import styles from '@/styles/pages/Home.module.css';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getChallengeList } from '@/service/api/challenge';

export default function Home(initialData) {
  const router = useRouter();
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState({});

  const { data = initialData, isPending } = useGetChallenges(selectedOption, {
    enabled: true,
  });
  const { meta = {}, list = [] } = data || {};
  const { totalPages } = meta;

  const handleOptionChange = (option) => {
    setSelectedOption((pev) => ({...pev, ...option }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedOption?.field, selectedOption?.docType, selectedOption?.progress]);

  useEffect(() => {
    const option = {
      keyword: searchTerm,
      page: currentPage
    }
    
    handleOptionChange(option)
  }, [currentPage, searchTerm, selectedOption?.field, selectedOption?.docType, selectedOption?.progress]);

  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>

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
        <ChallengeDropdown onOptionChange={setSelectedOption} />
        <ChallengeSearchBarLarge
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div>
            <AllCardSection
              list={list}
              searchTerm={searchTerm}
              selectedOption={selectedOption}
              site={'home'}
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

// 서버 사이드 렌더링에서 데이터 가져오기
// export async function getServerSideProps(context) {
//   const queryClient = new QueryClient();

//   const initialOptions = {
//     field: '',
//     docType: '',
//     status: '',
//     page: 1,
//     limit: 5,
//   };

//   await queryClient.prefetchQuery(['challenges', initialOptions], () =>
//     getChallengeList(initialOptions)
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }