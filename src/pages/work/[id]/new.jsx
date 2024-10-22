import Head from 'next/head';
import { useRouter } from 'next/router';

//challengeId 받아야됨...
export default function CreateWorkPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>작업 도전하기</title>
        <meta
          name="description"
          content="새로운 작업을 도전하고 생성하는 페이지입니다."
        />
      </Head>

      <div>
        <h1>작업 도전하기 내용</h1>
      </div>
    </>
  );
}
