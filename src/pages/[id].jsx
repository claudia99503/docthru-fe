import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from '@/service/api/axios';
import Edit from '@/components/myPage/edit';
import Profile from '../../components/myPage/Profile';
import styles from './Profile.module.css';

export default function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchProfileData = useCallback(async () => {
    if (!id || !router.isReady) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      console.log('Fetching profile for id:', id);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/profiles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Profile data received:', response.data);
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
  }, [id, router.isReady]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));
        setLoggedInUserId(decoded.userId);
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleProfileUpdate = useCallback(
    async (updatedData) => {
      setProfileData((prev) => ({
        ...prev,
        ...updatedData,
        user: prev.user,
      }));
      await fetchProfileData();
    },
    [fetchProfileData]
  );

  if (!router.isReady || isLoading) {
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
          onClick={() => fetchProfileData()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      {profileData && (
        <>
          <Edit
            userInfo={{
              ...profileData.user,
              userId: profileData.userId,
            }}
          />
          <Profile
            profileData={profileData}
            userId={loggedInUserId}
            onUpdate={handleProfileUpdate}
          />
        </>
      )}
    </div>
  );
}
