import LoginForm from '@/components/user/LoginForm';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>로그인</title>
        <meta name="description" content="사용자가 로그인하는 페이지입니다." />
      </Head>

      <LoginForm />
    </>
  );
}
