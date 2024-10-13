import styles from './Profile.module.css';
import Image from 'next/image';
import assets from '@/variables/images';

export default function Profile({ user }) {
  const userGrade = user.grade === 'EXPERT' ? '전문가' : '일반';
  <div className={styles.Profile}>
    <Image
      src={assets.images.profileMember}
      width={32}
      height={32}
      className={styles.image}
    />
    ;
    <div>
      <span>{user.nickName || '기본사용자'}</span>
      <span>{userGrade}</span>
    </div>
  </div>;
}
