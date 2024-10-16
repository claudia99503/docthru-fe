import LoginForm from '@/components/user/LoginForm';
import Head from 'next/head';
import styles from '../../styles/pages/auth.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';

export default function LoginPage() {
  const { login } = useAuth();
  return (
    <>
      <Head>
        <title>로그인</title>
        <meta name="description" content="사용자가 로그인하는 페이지입니다." />
      </Head>

      <LoginForm login={login} />

      <p className={styles.text}>
        회원이 아니신가요?
        <Link href="/auth/sign-up" className={styles.link}>
          회원가입하기
        </Link>
      </p>
    </>
  );
}
