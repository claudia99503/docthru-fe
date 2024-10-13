import assets from '@/variables/images';
import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import ProfileDropDown from '../ui/ProfileDropDown';

const user = {
  nickName: '닉네임',
  grade: 'EXPERT',
};
export function MemberHeader() {
  return (
    <header className={styles.MemberHeader}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={assets.images.navLogoLarge} width={120} height={27} />
        </Link>
        <ProfileDropDown user={user} />
      </div>
    </header>
  );
}
