import React from 'react';
import ProfileInfo from './ProfileInfo';
import MyPageChallengeCard from './MyPageChallengeCard';

const Profile = ({ profileData, userId, onUpdate }) => {
  return (
    <>
      <ProfileInfo
        profile={profileData}
        isOwner={parseInt(userId) === profileData.userId}
        onUpdate={onUpdate}
        userName={profileData.user?.nickname || '사용자'}
      />
      <MyPageChallengeCard list={profileData.list} />
    </>
  );
};

export default Profile;
