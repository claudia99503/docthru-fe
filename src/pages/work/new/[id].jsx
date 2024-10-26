import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateWork } from '@/service/mutations/work';
import WorkForm from '@/components/work/WorkForm';
import { useGiveUpChallenge } from '@/service/mutations/challenge';
import Head from 'next/head';

export default function CreateWorkPage() {
  const [content, setContent] = useState('');
  const router = useRouter();
  const challengeId = router.query.id;

  const { mutate: createWork } = useCreateWork();
  const { mutate: giveUpChallenge } = useGiveUpChallenge();

  const handleCreateWork = () => {
    createWork({ id: challengeId, data: { content } });
  };

  return (
    <>
      <Head>
        <title>작업 도전하기</title>

        <meta
          name="description"
          content="새로운 작업을 도전하고 생성하는 페이지입니다."
        />
      </Head>
      <WorkForm
        title="작업 도전하기"
        content={content}
        setContent={setContent}
        submitAction={handleCreateWork}
        giveUpAction={() => giveUpChallenge(challengeId)}
      />
    </>
  );
}
