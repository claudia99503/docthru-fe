import ProfileDropDown from '@/components/ui/ProfileDropDown';

import Head from 'next/head';
const user = {
  nickName: '닉네임',
  grade: 'EXPERT',
};
export default function Home() {
  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>
      <div>
        <h1>챌린지 목록 페이지 내용</h1>
      </div>
      <ProfileDropDown user={user} />
    </>
  );
}
