import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';
import AllCardSection from '../../components/challenge/AllCardSection';

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
        <h1>참여중인 챌린지 내용</h1>
        <TabNavigation activeTab="ongoing" />
      </div>
      <>
        <AllCardSection
          initialArticles={initialArticles}
          // hasNext={hasNext}
          // nextCursor={nextCursor}
          deadline="2024-12-14"
        />
      </>
    </>
  );
}
