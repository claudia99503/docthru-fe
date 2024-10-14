import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';

export function ProfileImage({ user }) {
  const isUser = user.role === 'USER';
  const imgSrc = isUser
    ? assets.images.profileMember
    : assets.images.profileAdmin;

  return (
    <div className={styles.ProfileImage}>
      <Image src={imgSrc} alt="profile image" fill className={styles.image} />
    </div>
  );
}

export function Profile({ user }) {
  const userGrade = user.grade === 'EXPERT' ? '전문가' : '일반';

  return (
    <div className={styles.Profile}>
      <ProfileImage user={user} />
      <div className={styles.texts}>
        <span className={styles.name}>{user.nickName || '기본사용자'}</span>
        <span className={styles.grade}>{userGrade}</span>
      </div>
    </div>
  );
}
