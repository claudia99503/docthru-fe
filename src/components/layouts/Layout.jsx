import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader, AuthHeader } from './Headers';
import styles from './Layout.module.css';
import { useEffect } from 'react';
import Loader from '../common/Loader';

export default function Layout({ children }) {
  const { user, isLoading } = useAuth(false);
  const router = useRouter();

  const publicRoutes = ['/', '/auth/login', '/auth/sign-up'];

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);

    if (!isLoading && !user && !isPublicRoute) {
      router.push('/auth/login');
    }
  }, [isLoading, user, router.pathname]);

  const isAdminRoute = router.pathname.startsWith('/admin');
  const isAuthRoute = router.pathname.startsWith('/auth');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isAuthRoute ? (
        <AuthHeader />
      ) : isAdminRoute ? (
        <AdminHeader user={user} />
      ) : (
        <MemberHeader user={user} />
      )}
      <main className={styles.main}>{children}</main>
    </>
  );
}
