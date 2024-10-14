import Head from 'next/head';
import TabNavigation from '../../components/layouts/TabNavigation';

export default function MyChallengePage() {
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
    </>
  );
}
