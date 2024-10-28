import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/service/api/axios';
import Edit from '@/components/myPage/edit';
import Profile from '../../components/myPage/Profile';
import styles from './Profile.module.css';

export default function ProfileIndex() {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));
        setUserId(decoded.userId);
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
        setError('토큰 디코드 실패');
        router.replace('/login');
      }
    } else {
      router.replace('/login');
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DEV_API_URL}/profiles/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData(response.data);
        setError(null);
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError(
          error.response?.data?.message || '프로필을 불러오는데 실패했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (!userId || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <Edit
        userInfo={{
          ...profileData.user,
          userId: profileData.userId,
        }}
      />
      <Profile
        profileData={profileData}
        userId={userId}
        onUpdate={(updatedData) => setProfileData(updatedData)}
      />
    </div>
  );
}
