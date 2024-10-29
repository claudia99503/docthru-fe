import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';
import { formatDate } from '@/utils/utilFunction';
import cn from '@/utils/clsx';

export function ProfileImage({ user, width = '32px' }) {
  const isUser = user?.role === 'USER';
  const imgSrc = isUser
    ? assets.images.profileMember
    : assets.images.profileAdmin;

  return (
    <div className={styles.ProfileImage} style={{ '--width': width }}>
      <Image src={imgSrc} alt="profile image" fill className={styles.image} />
    </div>
  );
}

export function Profile({ user, size, type, date, className }) {
  const isAdmin = user.role === 'ADMIN';
  const userGrade = isAdmin
    ? '어드민'
    : user?.grade === 'EXPERT'
    ? '전문가'
    : '일반';
  const isTypeSimple = type + '';
  const isSmall = size === 'small';

  if (isTypeSimple.includes('simple')) {
    return (
      <div className={cn(styles.Profile, styles.simple, className)}>
        <ProfileImage width="24px" user={user} />
        <span className={styles.name}>{user.nickname}</span>
        {isTypeSimple.includes('2') && (
          <span className={styles.grade}>{userGrade}</span>
        )}
      </div>
    );
  }

  if (date) {
    return (
      <div className={cn(styles.Profile, className)}>
        <ProfileImage user={user} />
        <div className={styles.texts}>
          <span className={styles.name}>{user.nickname}</span>
          <time className={styles.time}>{formatDate(date, true)}</time>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.Profile, className)}>
      <ProfileImage user={user} width={isSmall ? '24px' : '32px'} />
      <div className={styles.texts}>
        <span className={type === 'workList' ? styles['workList-name'] :  styles.name }>{user.nickname}</span>
        <span className={styles.grade}>{userGrade}</span>
      </div>
    </div>
  );
}
