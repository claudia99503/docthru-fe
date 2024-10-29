import styles from './UpdateProfile.module.css';
import assets from '@/variables/images';
import Svg from '@/components/common/Svg';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function UpdateProfile({
  profileName,
  data,
  handleNameValue,
  handleUpload,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles['profile-img']}>
        <div className={styles['img-container']}>
          <Image
            className={styles['img']}
            src={data?.profileImg || assets.images.profileMember}
            fill
            alt="profile image"
          />
        </div>
        <button
          className={styles['import-button']}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <Svg name="import" width="30px" />
        </button>
      </div>

      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => handleUpload(e)}
      />

      <div className={styles['profile-info']}>
        <input
          type="text"
          placeholder="Name"
          className={styles['profile-input']}
          value={profileName}
          onChange={handleNameValue}
        />
        <Button
          onClick={() => console.log(data)}
          className={styles['profile-button']}
          variant="black"
        >
          수정
        </Button>
      </div>
    </section>
  );
}
