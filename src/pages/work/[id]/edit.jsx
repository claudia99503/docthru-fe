import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateWork } from '@/service/mutations/work';
import { useGiveUpChallenge } from '@/service/mutations/challenge';
import WorkForm from '@/components/work/WorkForm';
import Head from 'next/head';

export default function EditWorkPage() {
  const [content, setContent] = useState('');
  const router = useRouter();
  const challengeId = router.query.id;

  const { mutate: updateWork } = useUpdateWork();
  const { mutate: giveUpChallenge } = useGiveUpChallenge();

  const handleUpdateWork = () => {
    updateWork({ id: challengeId, data: { content } });
  };

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
        title="작업물 수정"
        content={content}
        setContent={setContent}
        submitAction={handleUpdateWork}
        giveUpAction={() => giveUpChallenge(challengeId)}
      />
    </>
  );
}
