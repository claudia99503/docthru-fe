import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Profile from '@/components/myPage/Profile';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));
        setCurrentUserId(decoded.userId);
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (id && currentUserId && parseInt(id) === currentUserId) {
      router.replace('/profile');
    }
  }, [id, currentUserId, router]);

  if (!id) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Profile userId={id} />
    </div>
  );
}
