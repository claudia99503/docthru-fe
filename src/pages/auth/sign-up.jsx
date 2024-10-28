import SignUpForm from '@/components/user/SignUpForm';
import Head from 'next/head';

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>회원가입</title>
        <meta name="description" content="회원가입하는 페이지입니다." />
      </Head>

      <SignUpForm />
    </>
  );
}
