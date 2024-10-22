import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';
import { formatDate } from '@/utils/utilFunction';
import cn from '@/utils/clsx';

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

export function Profile({ user = {}, size, type, date, className }) {
  const userGrade = user?.grade === 'EXPERT' ? '전문가' : '일반';
  const isAdmin = user.role === 'ADMIN';
  const isTypeNotSimple = type + '';
  const isSmall = size === 'small';

  if (isTypeNotSimple.includes('simple')) {
    return (
      <div className={cn(styles.simple, className)}>
        <ProfileImage width="24px" user={user} />
        <span className={styles.name}>{user.nickname}</span>
        {isTypeNotSimple.includes('2') && (
          <span className={styles.grade}>{userGrade}</span>
        )}
        {isAdmin && <span className={styles.grade}>어드민</span>}
      </div>
    );
  }

  if (date) {
    return (
      <div className={cn(styles.simple, className)}>
        <ProfileImage user={user} />
        <div className={styles.texts}>
          <span className={styles.name}>{user.nickname}</span>
          <time className={styles.time}>{formatDate(date, true)}</time>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.simple, className)}>
      <ProfileImage user={user} width={isSmall ? '24px' : '32px'} />
      <div className={styles.texts}>
        <span className={styles.name}>{user.nickname || '기본사용자'}</span>
        <span className={styles.grade}>{userGrade}</span>
      </div>
    </div>
  );
}
