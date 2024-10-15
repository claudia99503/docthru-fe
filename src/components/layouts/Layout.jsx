import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader, AuthHeader } from './Headers';
import styles from './Layout.module.css';

const mockUp = {
  role: 'USER',
  nickName: '사용자이름',
  grade: 'EXPERT',
};

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isAuthRoute = router.pathname.startsWith('/auth');

  return (
    <>
      {isAuthRoute ? (
        <AuthHeader />
      ) : isAdminRoute ? (
        <AdminHeader user={mockUp} />
      ) : (
        <MemberHeader user={mockUp} />
      )}
      <main className={styles.main}>{children}</main>
    </>
  );
}
