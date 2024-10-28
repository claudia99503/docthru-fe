import Head from 'next/head';
import { useRouter } from 'next/router';
import WorkDetail from '@/components/work/WorkDetail';
import { useGetWork } from '@/service/queries/work';
import Loader from '@/components/common/Loader';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import FeedbackList from '@/components/feedback/FeedbackList';

export default function AdminWorkPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isPending } = useGetWork(id);
  const isAdmin = router.pathname.startsWith('/admin');

  if (isPending) {
    return <Loader />;
  }

  if (!data) {
    return <p>데이터 없음</p>;
  }

  console.log(data);
  const { isClosed } = data;
  return (
    <>
      <Head>
        <title>작업물 상세페이지</title>
        <meta
          name="description"
          content="관리자에게 보여지는 작업물 상세 페이지입니다."
        />
      </Head>

      <WorkDetail data={data} isAdmin={isAdmin} />
      {isClosed || <FeedbackForm id={id} />}

      <FeedbackList id={id} isClosedChallenge={isClosed} />
    </>
  );
}
