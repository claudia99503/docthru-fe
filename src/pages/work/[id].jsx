import Head from 'next/head';
import { useRouter } from 'next/router';
import DocTypeChip from '@/components/common/DocTypeChip';
import { work, feedbacks } from '../../../mockup/work';
import { Profile } from '@/components/common/Profile';
import assets from '@/variables/images';
import LikeButton from '@/components/common/LikeButton';

const workData = work;
const feedbackData = feedbacks;
export default function WorkDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, challenge } = workData;

  return (
    <>
      <Head>
        <title>작업물 상세페이지</title>
        <meta
          name="description"
          content="작업물에 대한 상세 정보를 보여주는 페이지입니다."
        />
      </Head>
      <section>
        <h1>{workData.challenge.title}</h1>
        <KebabMenu />
        <DocTypeChip field={challenge.field} docType={challenge.docType} />
        <Profile user={user} type="simple" />
        <LikeButton data={workData} />
      </section>
    </>
  );
}
