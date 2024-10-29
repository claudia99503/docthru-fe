import styles from './edit.module.css';
import { useLogout } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import assets from '@/variables/images';
import Image from 'next/image';

function Edit({ userInfo }) {
  const logout = useLogout();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  const getGradeDisplay = (grade) => {
    switch (grade) {
      case 'EXPERT':
        return '전문가 유저';
      case 'NORMAL':
        return '일반 유저';
      default:
        return grade;
    }
  };

  useEffect(() => {
    if (!userInfo) return;

    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));

        setIsOwner(decoded.userId === Number(userInfo.userId));
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
      }
    }
  }, [userInfo]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  if (!userInfo) return null;

  return (
    <>
      <div className={styles.A}>
        <div className={styles.B}>
          <div className={styles.editContainer}>
            <div className={styles.profileContainer}>
              <Image
                src={userInfo.image || assets.images.profile}
                alt='프로필 사진'
                width='75'
                height='75'
                className={styles.profileImage}
              />
              <div className={styles.profileInfo}>
                <p>{userInfo.nickname}</p>
                <p>{userInfo.role}</p>
                <p>{getGradeDisplay(userInfo.grade)}</p>
                <p>{new Date(userInfo.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              className={styles.C}
              onClick={() => router.push('/profile')}
            >
              메인 페이지 이동
            </button>
            {isOwner && (
              <button
                className={styles.C}
                onClick={() => router.push('/profile/edit')}
              >
                내 정보 수정
              </button>
            )}
            <button className={styles.C} onClick={() => window.open('/devs')}>
              Github
            </button>
            {isOwner && (
              <button className={`${styles.C}`} onClick={handleLogout}>
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
