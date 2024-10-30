import { useLogout } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import assets from '@/variables/images';
import Image from 'next/image';
import styles from './MyPageNav.module.css';
import { formatDateByDot } from '@/utils/utilFunction';

export default function MyPageNav({ userInfo }) {
  const logout = useLogout();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  const getGradeDisplay = (grade) => {
    switch (grade) {
      case 'EXPERT':
        return '전문가';
      case 'NORMAL':
        return '일반회원';
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

  if (!userInfo) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['edit-container']}>
        <div className={styles['profile-container']}>
          <Image
            src={userInfo.image || assets.images.profileMember}
            alt="프로필 사진"
            width={75}
            height={75}
            className={styles['profile-image']}
          />
          <div className={styles['profile-info']}>
            <h2 className={styles.nickname}>{userInfo.nickname}</h2>
            <p className={styles.grade}>{getGradeDisplay(userInfo.grade)}</p>
            <p className={styles.date}>{formatDateByDot(userInfo.createdAt)}</p>
          </div>
        </div>
        <button
          className={styles.button}
          onClick={() => router.push('/profile')}
        >
          메인 페이지 이동
        </button>
        {isOwner && (
          <button
            className={styles.button}
            onClick={() => router.push('/profile/edit')}
          >
            내 정보 수정
          </button>
        )}
        <button
          className={styles.button}
          onClick={() => window.open('/profile/devs')}
        >
          Github
        </button>
        {isOwner && (
          <button className={styles.button} onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
}
