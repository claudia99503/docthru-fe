import assets from '@/variables/images';
import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import ProfileDropDown from '../ui/ProfileDropDown';
import { pages } from '@/variables/variables';
import Nav from './Nav';

const user = {
  nickName: '닉네임',
  grade: 'EXPERT',
};
export function MemberHeader() {
  return (
    <header className={styles.MemberHeader}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            className={styles.image}
            src={assets.images.navLogoLarge}
            width={120}
            height={27}
          />
        </Link>
        <ProfileDropDown user={user} />
      </div>
    </header>
  );
}

export function AdminHeader() {
  return (
    <header className={styles.AdminHeader}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            className={styles.image}
            src={assets.images.navLogoLarge}
            width={120}
            height={27}
          />
        </Link>
        <Nav links={pages} />
        <ProfileDropDown user={user} />
      </div>
    </header>
  );
}
