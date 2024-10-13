import assets from '@/variables/images';
import Image from 'next/image';
import styles from './layouts.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function HeaderMember() {
  return (
    <header className={styles.HeaderMember}>
      <Link href="/">
        <Image src={assets.images.navLogoLarge} width={120} height={27} />
      </Link>
      <Image src={assets.images.profileMember} width={32} height={32} />
    </header>
  );
}
