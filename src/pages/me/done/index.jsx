import Head from 'next/head';
import TabNavigation from '../../../components/layouts/TabNavigation';
import AllCardSection from '../../../components/challenge/AllCardSection';

export default function MyFinishedChallengePage({
  initialArticles,
  hasNext,
  nextCursor,
}) {
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
        <h1>완료한 챌린지 내용</h1>
        <TabNavigation activeTab="completed" />
      </div>
      <>
        <AllCardSection
          initialArticles={initialArticles}
          // hasNext={hasNext}
          // nextCursor={nextCursor}
          deadline="2024-10-14"
        />
      </>
    </>
  );
}
