'use client';

import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader, AuthHeader } from './Headers';
import styles from './Layout.module.css';
import { useCallback, useEffect, useMemo } from 'react';
import Loader from '../common/Loader';
import { useAuth } from '@/hooks/useAuth';
import { PUBLIC_ROUTES } from '@/variables/variables';
import { useAlertModal } from '@/hooks/useModal';

export default function Layout({ children }) {
  const router = useRouter();

  const routes = useMemo(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);
    const isAdminRoute = router.pathname.startsWith('/admin');
    const isAuthRoute = router.pathname.startsWith('/auth');
    //동적 경로와 new페이지는 max-width:890px
    const isNarrowerPage = /\[.*\]|\/new/.test(router.route);

    return {
      isPublicRoute,
      isAdminRoute,
      isAuthRoute,
      isNarrowerPage,
    };
  }, [router.route, router.pathname]);

  const { user, isLoading, isRedirecting } = useAuth();
  const { Modal, onModalOpen } = useAlertModal();
  // console.log(
  //   'Current State => User:',
  //   user,
  //   'Loading:',
  //   isLoading,
  //   'Redirecting:',
  //   isRedirecting
  // );
  const handleRedirects = useCallback(() => {
    // console.log(
    //   'User:',
    //   user,
    //   'Loading:',
    //   isLoading,
    //   'Redirecting:',
    //   isRedirecting
    // );

    if (isLoading || user === undefined) {
      // console.log(
      //   `isLoading이 true고 user가 undefined일때: isLoading(${isLoading}), user$${user}`
      // );
      return;
    }

    // if (user === null && !routes.isPublicRoute) {
    //   console.log('트리거 로그인 필요하단 모달');
    //   return onModalOpen({
    //     msg: '로그인이 필요합니다.',
    //     path: '/auth/login',
    //   });
    // }

    if (user) {
      if (routes.isAuthRoute) {
        // console.log('트리거 이미 로그인 됨 모달');
        return onModalOpen({ msg: '이미 로그인 되었습니다', path: '/' });
      }

      if (routes.isAdminRoute && user.role !== 'ADMIN') {
        // if (user.role !== 'ADMIN') console.log('트리거 권한 모달');
        return onModalOpen({
          msg: '권한이 없는 페이지 요청입니다.',
          path: '/',
        });
      }
    }
  }, [
    user,
    isRedirecting,
    routes.isAuthRoute,
    routes.isAdminRoute,
    routes.isPublicRoute,
    router.asPath,
  ]);

  useEffect(() => {
    if (!isLoading && !isRedirecting && user !== undefined) {
      // console.log('Running handleRedirects after loading completes');
      handleRedirects();
    } else {
      // console.log('Skipping handleRedirects due to loading/redirecting state');
    }
  }, [handleRedirects, isLoading, isRedirecting, user]);

  if (isLoading || user === undefined) {
    // console.log('Displaying Loader');
    return <Loader />;
  }

  const renderHeader = () => {
    if (routes.isAuthRoute) return <AuthHeader />;
    if (routes.isAdminRoute) return <AdminHeader user={user} />;
    return <MemberHeader user={user} />;
  };

  return (
    <>
      {renderHeader()}
      <main
        className={`${styles.main} ${routes.isNarrowerPage && styles.detail}`}
      >
        {children}
      </main>
      <Modal />
    </>
  );
}
