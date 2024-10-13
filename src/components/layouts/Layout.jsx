import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader } from './Header';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute ? <MemberHeader /> : <AdminHeader />}
      <main className={styles.main}>{children}</main>
    </>
  );
}
