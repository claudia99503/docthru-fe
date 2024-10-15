import Head from 'next/head';
import { useRouter } from 'next/router';
import { work, feedbacks } from '../../../mockup/work';
import WorkDetail from '@/components/work/WorkDetail';

const workData = work;
const feedbackData = feedbacks;

export default function WorkDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>작업물 상세페이지</title>
        <meta
          name="description"
          content="작업물에 대한 상세 정보를 보여주는 페이지입니다."
        />
      </Head>
      <WorkDetail data={workData} />
    </>
  );
}
