import Head from 'next/head';
import TabNavigation from '../../../components/TabNavigation';

export default function MyApplicationPage() {
  return (
    <>
      <Head>
        <title>신청한 챌린지</title>
        <meta name="description" content="사용자가 신청한 모든 챌린지를 확인하는 페이지입니다." />
      </Head>
      <div>
        <h1>신청한 챌린지 내용</h1>
        <TabNavigation activeTab="applications" />
      </div>
    </>
  );
}

