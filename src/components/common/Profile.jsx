import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';

export function ProfileImage({ user, width = '32px' }) {
  const isUser = user.role === 'USER';
  const imgSrc = isUser
    ? assets.images.profileMember
    : assets.images.profileAdmin;

  return (
    <div className={styles.ProfileImage} style={{ '--width': width }}>
      <Image src={imgSrc} alt="profile image" fill className={styles.image} />
    </div>
  );
}

export function Profile({ user, size, type }) {
  const userGrade = user.grade === 'EXPERT' ? '전문가' : '일반';
  const isTypeSimple = type === 'simple';
  const isSmall = size === 'small';

  if (isTypeSimple) {
    return (
      <div className={styles.simple}>
        <ProfileImage width="24px" user={user} />
        <span className={styles.name}>{user.nickName}</span>
      </div>
    );
  }

  return (
    <div className={styles.Profile}>
      <ProfileImage user={user} width={isSmall ? '24px' : '32px'} />
      <div className={styles.texts}>
        <span className={styles.name}>{user.nickName || user.nickname || '기본사용자'}</span>
        <span className={styles.grade}>{userGrade}</span>
      </div>
    </div>
  );
}
