import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';
import Pagination from '../../components/application/Pagination';
import ChallengeSearchBarLarge from '../../components/common/ChallengeSearchBarLarge';

import Card from '../../components/challenge/Card';
import { seed } from '../../../mockup/challenge';

import frameStyles from '../../styles/pages/application/MyApplicationPage.module.css';
import styles from '../../styles/pages/me/MyChallengePage.module.css';

// export const getStaticProps = async () => {
//   const response = await axios(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/  `
//   );
//   const data = await response.json();

export default function MyChallengePage() {
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const seedData = seed;

  const getMobilePage = () => {
    isMobile ? setItemsPerPage(4) : setItemsPerPage(5);
  };

  useEffect(() => {
    getMobilePage();
  }, [isMobile]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = seedData.filter((item) => {
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

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 현재 페이지의 데이터만 추출
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(paginatedData)

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
        <div className={frameStyles.challengeTableWrapper}>
          {paginatedData.length > 0 ? (
            <>
              <div className={styles.AllCardSection}>
                {paginatedData.map((paginatedData) => (
                  <Card
                    key={`${paginatedData.id}`}
                    data={paginatedData}
                    site={'ongoing'}
                  />
                ))}
              </div>
              <div className={frameStyles.paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages} // 계산된 totalPages 사용
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className={styles.noChallenges}>아직 챌린지가 없어요.</div>
          )}
        </div>
      </div>
    </>
  );
}
