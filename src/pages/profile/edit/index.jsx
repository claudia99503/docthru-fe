import React from 'react';
import { useState } from 'react';
import UpdateProfile from '@/components/myPage/UpdateProfile';
import MyPageNav from '@/components/myPage/MyPageNav';

function EditProfilePage() {
  const [profileImg, setProfileImg] = useState(null);
  const [profileName, setProfileName] = useState('');

  const handleProfileNameChange = (event) => {
    setProfileName(event.target.value);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64URL = reader.result;
        setProfileImg(base64URL);
      };
      reader.readAsDataURL(file);
    }
  };

  const data = {
    profileImg,
    profileName,
  };

  return (
    <>
      <MyPageNav />
      <UpdateProfile
        data={data}
        profileName={profileName}
        handleNameValue={handleProfileNameChange}
        handleUpload={handleFileUpload}
      />
    </>
  );
}

export default EditProfilePage;
