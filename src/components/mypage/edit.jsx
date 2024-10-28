import styles from './edit.module.css';
import { useLogout } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
function Edit() {
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };
  return (
    <>
      <div className={styles.editContainer}>
        <div className={styles.edit}>
          <button className={styles.editBtn} onClick={() => router.push('/')}>
            메인 페이지 이동
          </button>
          <button className={styles.editBtn} onClick={() => router.push('/')}>
            내 정보 수정
          </button>
          <button
            className={styles.editBtn}
            onClick={() => window.open('https://github.com/Minsugar98')}
          >
            Github
          </button>
          <button className={`${styles.editBtn}`} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

export default Edit;
