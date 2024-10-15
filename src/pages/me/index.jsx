import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';
import Card from '../../components/challenge/Card';
import Pagination from '../../components/application/Pagination';
import ChallengeTable from '../../components/application/ChallengeTable';
import { useState } from 'react';

import frameStyles from "../../styles/pages/application/MyApplicationPage.module.css";
import styles from '../../components/challenge/Card.module.css';

// export const getStaticProps = async () => {
//   const response = await axios(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/  `
//   );
//   const data = await response.json();

//   return {
//     props: {
//       initialArticles: data.data || [], // 데이터가 없을 경우 빈 배열
//       hasNext: data.hasNext || false, // 다음 페이지가 있는지 여부
//       nextCursor: data.nextCursor || null, // 다음 페이지를 위한 커서
//     },
//     revalidate: 60, // 60초마다 정적 페이지를 재생성
//   };
// };

export default function MyChallengePage({
  initialArticles,
  hasNext,
  nextCursor,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 시드 데이터
  const seedData = [
    {
      "id": 1023,
      "docType": "OFFICIAL",
      "field": "Next.js",
      "title": "Next.js - App Router: Routing Fundamentals",
      "participates": 3,
      "maxParticipates": 5,
      "deadline": "2024-12-24T23:59:59",
      "progress": false
    },
    {
      "id": 1022,
      "docType": "BLOG",
      "field": "API",
      "title": "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
      "participates": 5,
      "maxParticipates": 5,
      "deadline": "2024-10-23T23:59:59",
      "progress": false
    },
    {
      "id": 1021,
      "docType": "OFFICIAL",
      "field": "API",
      "title": "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
      "participates": 10,
      "maxParticipates": 10,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 1020,
      "docType": "BLOG",
      "field": "Career",
      "title": "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
      "participates": 5,
      "maxParticipates": 5,
      "deadline": "2024-01-22T23:59:59",
      "progress": false
    },
    {
      "id": 1019,
      "docType": "OFFICIAL",
      "field": "Next.js",
      "title": "Next.js - App Router: Routing Fundamentals",
      "participates": 2,
      "maxParticipates": 5,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 1018,
      "docType": "OFFICIAL",
      "field": "API",
      "title": "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
      "participates": 5,
      "maxParticipates": 5,
      "deadline": "2024-05-22T23:59:59",
      "progress": false
    },
    {
      "id": 1017,
      "docType": "OFFICIAL",
      "field": "API",
      "title": "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
      "participates": 10,
      "maxParticipates": 10,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 1016,
      "docType": "BLOG",
      "field": "Career",
      "title": "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
      "participates": 5,
      "maxParticipates": 5,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 1015,
      "docType": "BLOG",
      "field": "Next.js",
      "title": "Next.js - App Router: Routing Fundamentals",
      "participates": 1,
      "maxParticipates": 10,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 1014,
      "docType": "BLOG",
      "field": "Next.js",
      "title": "Next.js - App Router: Routing Fundamentals",
      "participates": 10,
      "maxParticipates": 10,
      "deadline": "2024-02-22T23:59:59",
      "progress": false
    },
    {
      "id": 2022,
      "docType": "OFFICIAL",
      "field": "Next.js",
      "title": "Next.js - App Router: Routing Fundamentals",
      "participates": 10,
      "maxParticipates": 20,
      "deadline": "2024-02-24T23:59:59",
      "progress": false
    }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지 수 계산
  const totalPages = Math.ceil(seedData.length / itemsPerPage);
  
  // 현재 페이지의 데이터만 추출
  const paginatedData = seedData.slice(
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
        <>
          <div className={frameStyles.challengeTableWrapper}>
            {paginatedData.length > 0 ? (
              <div className={styles.AllCardSection}>
                {paginatedData.map((paginatedData) => (
                  <Card key={`${paginatedData.id}`} data={paginatedData} />
                ))}
              </div>
            ) : (
              // <AllCardSection
              //   data={paginatedData}
              //   seedData={seedData}
              // /> // 페이지네이션된 데이터만 전달
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
