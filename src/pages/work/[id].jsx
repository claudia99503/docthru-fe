import Head from 'next/head';
import { useRouter } from 'next/router';
import { work, feedbacks } from '../../../mockup/work';
import WorkDetail from '@/components/work/WorkDetail';
import { useGetWork, useGeWorkFeedbacks } from '@/service/queries/work';
import Loader from '@/components/common/Loader';
import Svg, { IconSvg } from '@/components/common/Svg';

export default function WorkDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isPending } = useGetWork(id);

  // const {data} = useGeWorkFeedbacks();

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>작업물 상세페이지</title>
        <meta
          name="description"
          content="작업물에 대한 상세 정보를 보여주는 페이지입니다."
        />
      </Head>
      <WorkDetail data={data} />
      <Svg name="arrowDownCircle" width="40" />
    </>
  );
}
