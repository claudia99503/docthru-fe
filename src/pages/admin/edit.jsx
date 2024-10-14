import Head from 'next/head';

export default function AdminChallengeEditPage() {
  return (
    <>
      <Head>
        <title>챌린지 수정 보기</title>
        <meta
          name="description"
          content="관리자가 챌린지를 보는 페이지입니다."
        />
      </Head>
      <div>
        <h1>챌린지 수정하기 내용 (어드민만 수정/삭제 가능)</h1>
      </div>
    </>
  );
}
