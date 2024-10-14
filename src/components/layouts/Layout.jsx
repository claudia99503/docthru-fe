import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader } from './Header';
import styles from './Layout.module.css';

const mockUp = {
  role: 'USER',
  nickName: '사용자이름',
  grade: 'EXPERT',
};

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute ? (
        <MemberHeader user={mockUp} />
      ) : (
        <AdminHeader user={mockUp} />
      )}
      <main className={styles.main}>{children}</main>
    </>
  );
}
