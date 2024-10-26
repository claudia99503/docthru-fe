import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateWork } from '@/service/mutations/work';
import { useGiveUpChallenge } from '@/service/mutations/challenge';
import WorkForm from '@/components/work/WorkForm';
import Head from 'next/head';
import Loader from '@/components/common/Loader';
import { useGetWork } from '@/service/queries/work';

export default function EditWorkPage() {
  const [content, setContent] = useState('');
  const router = useRouter();
  const workId = router.query.id;

  const { mutate: updateWork } = useUpdateWork();
  const { mutate: giveUpChallenge } = useGiveUpChallenge();

  const { data, isPending } = useGetWork(workId);

  useEffect(() => {
    if (data && data.content) {
      setContent(data.content);
    }
  }, [data]);

  const handleUpdateWork = () => {
    updateWork({ id: workId, data: { content } });
  };

  if (isPending) return <Loader />;

  return (
    <>
      <Head>
        <title>작업물 수정페이지</title>
        <meta
          name="description"
          content="작업물에 대한 상세 정보를 보여주는 수정하는페이지입니다."
        />
      </Head>
      <WorkForm
        id={workId}
        content={content}
        setContent={setContent}
        submitAction={handleUpdateWork}
        giveUpAction={() => giveUpChallenge(challenge.id)}
      />
    </>
  );
}
