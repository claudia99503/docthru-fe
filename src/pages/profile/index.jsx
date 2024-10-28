import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Profile from '@/components/myPage/Profile';

export default function ProfileIndex() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));
        setUserId(decoded.userId);
        setIsLoading(false);
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
        router.replace('/login');
      }
    } else {
      router.replace('/login');
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return <div>{userId && <Profile userId={userId} />}</div>;
}
