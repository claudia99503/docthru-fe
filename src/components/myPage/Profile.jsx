import React, { useState, useEffect } from 'react';
import ProfileInfo from '@/components/myPage/ProfileInfo';
import axios from 'axios';

export default function Profile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);

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
    const fetchProfile = async () => {
      if (!userId) return;

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
        setProfile(response.data);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || '프로필을 불러오는데 실패했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error && error.includes('존재하지 않는 사용자')) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProfileInfo
      profile={profile}
      isOwner={parseInt(userId) === currentUserId}
      onUpdate={handleProfileUpdate}
    />
  );
}
