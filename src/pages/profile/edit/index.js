import React from 'react';
import styles from '../edit/editprofilepage.module.css';
import { useState } from 'react';
import images from '../../../variables/images';
import Image from 'next/image';

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
    <div className={styles.container}>
      <div style={{ position: 'relative' }}>
        <img
          className={styles['profileImg']}
          src={profileImg || images.images.profile}
        />

        <button
          className={styles.gearButton}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <img
            style={{ width: '15px' }}
            src={images.icons.gear}
            alt="Settings"
          />
        </button>

        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e)}
        />
      </div>

      <div className={styles['profileInfo']}>
        <input
          type="text"
          placeholder="Name"
          className={styles['profileInput']}
          value={profileName}
          onChange={handleProfileNameChange}
        />
        <button
          onClick={() => console.log(data)}
          className={styles['profileButton']}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default EditProfilePage;
