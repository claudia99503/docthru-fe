import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';

export function ProfileImage() {
  return (
    <div className={styles.ProfileImage}>
      <Image
        src={assets.images.profileMember}
        alt="profile image"
        fill
        className={styles.image}
      />
    </div>
  );
}

export function Profile({ user }) {
  const userGrade = user.grade === 'EXPERT' ? '전문가' : '일반';

  return (
    <div className={styles.Profile}>
      <ProfileImage />
      <div className={styles.texts}>
        <span className={styles.name}>{user.nickName || '기본사용자'}</span>
        <span className={styles.grade}>{userGrade}</span>
      </div>
    </div>
  );
}
