'use client';

import { useRouter } from 'next/router';
import { AdminHeader, MemberHeader, AuthHeader } from './Headers';
import styles from './Layout.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from '../common/Loader';
import { useAuth } from '@/hooks/useAuth';
import { PUBLIC_ROUTES, AUTH_ROUTES } from '@/variables/variables';
import { useAlertModal } from '@/hooks/useModal';

export default function Layout({ children }) {
  const router = useRouter();

  const routes = useMemo(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);
    const isAuthPage = AUTH_ROUTES.includes(router.pathname);
    const isAdminRoute = router.pathname.startsWith('/admin');
    const isAuthRoute = router.pathname.startsWith('/auth');
    //동적 경로와 new페이지는 max-width:890px
    const isNarrowerPage = /\[.*\]|\/new/.test(router.route);

    return {
      isPublicRoute,
      isAuthPage,
      isAdminRoute,
      isAuthRoute,
      isNarrowerPage,
    };
  }, [router.route, router.pathname]);

  const { user, isLoading, isRedirecting } = useAuth(!routes.isPublicRoute);
  const { Modal, onModalOpen } = useAlertModal();

  const handleRedirects = useCallback(() => {
    if (!isRedirecting && !isLoading) {
      if (!user && !routes.isPublicRoute) {
        onModalOpen({ msg: '로그인이 필요합니다.', path: '/auth/login' });
        return;
      }

      if (user && routes.isAuthPage) {
        return;
      }

      if (user && routes.isAdminRoute) {
        if (user.role !== 'ADMIN')
          onModalOpen({ msg: '권한이 없는 페이지 요청입니다.', path: '/' });
        return;
      }
    }
  }, [
    user,
    isRedirecting,
    routes.isAuthPage,
    routes.isAdminRoute,
    router.asPath,
  ]);

  useEffect(() => {
    if (!isLoading && !isRedirecting && user !== undefined) {
      handleRedirects();
    }
  }, [handleRedirects, isLoading, isRedirecting, user]);

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
