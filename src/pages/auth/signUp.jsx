import SignUpForm from '@/components/user/SignUpForm';
import styles from '../../styles/pages/auth.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>회원가입</title>
        <meta name="description" content="회원가입하는 페이지입니다." />
      </Head>

      <SignUpForm />
      <p className={styles.text}>
        회원이신가요?
        <Link href="/auth/login" className={styles.link}>
          로그인하기
        </Link>
      </p>
    </>
  );
}
