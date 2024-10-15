import { useState } from 'react';

import Head from 'next/head';
import TabNavigation from '../../../components/layouts/TabNavigation';
import Pagination from '../../../components/application/Pagination';

import Card from '../../../components/challenge/Card';
import { seed } from '../../../../mockup/challenge';

import frameStyles from '../../../styles/pages/application/MyApplicationPage.module.css';
import styles from '../../../components/challenge/Card.module.css';

export default function MyFinishedChallengePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const seedData = seed;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = seedData.filter((item) => {
    const today = new Date();
    const deadline = new Date(item.deadline);
    if (deadline <= today) {
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
        <>
          <div className={frameStyles.challengeTableWrapper}>
            {paginatedData.length > 0 ? (
              <div className={styles.AllCardSection}>
                {paginatedData.map((paginatedData) => (
                  <Card key={`${paginatedData.id}`} data={paginatedData} />
                ))}
              </div>
            ) : (
              <div className={frameStyles.noChallengesMessage}>
                아직 챌린지가 없어요.
              </div>
            )}
          </div>
          <div className={frameStyles.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // 계산된 totalPages 사용
              onPageChange={handlePageChange}
            />
          </div>
        </>
      </div>
    </>
  );
}
