import LoginForm from '@/components/user/LoginForm';
import Head from 'next/head';
import styles from '../../styles/pages/auth.module.css';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>로그인</title>
        <meta name="description" content="사용자가 로그인하는 페이지입니다." />
      </Head>

      <LoginForm />

      <p className={styles.text}>
        회원이 아니신가요?
        <Link href="/auth/sign-up" className={styles.link}>
          회원가입하기
        </Link>
      </p>
    </>
  );
}
