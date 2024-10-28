import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateWork } from '@/service/mutations/work';
import { useGiveUpChallenge } from '@/service/mutations/challenge';
import WorkForm from '@/components/work/WorkForm';
import Head from 'next/head';
import Loader from '@/components/common/Loader';
import { useGetWork } from '@/service/queries/work';
import SourceViewer from '@/components/work/SourceViewer';

export default function EditWorkPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const router = useRouter();
  const workId = router.query.id;

  const { data, isPending } = useGetWork(workId);
  const { mutate: updateWork } = useUpdateWork();
  const { mutate: giveUpChallenge } = useGiveUpChallenge();

  const challengeId = data?.challenge?.id;

  console.log(data);

  useEffect(() => {
    if (data && data.content) {
      setContent(data.content);
    }
  }, [data]);

  const handleUpdateWork = () => {
    updateWork({ id: workId, data: { content } });
  };

  if (isPending) return <Loader msg="작업물 불러오는 중" />;

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
        id={`challenge_${challengeId}`}
        title={data.challenge.title}
        content={content}
        setContent={setContent}
        submitAction={handleUpdateWork}
        giveUpAction={() => giveUpChallenge(challengeId)}
        isOpen={isOpen}
      />
      <SourceViewer
        docUrl={data.challenge.docUrl}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
