import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import assets from '@/variables/images';
import Image from 'next/image';

export default function Nav({ links }) {
  const pathname = usePathname();
  return (
    <nav className={styles.Nav}>
      <ul className={styles.lists}>
        <Link href="/">
          <Image
            className={styles.logo}
            src={assets.images.navLogoLarge}
            width={120}
            height={27}
            alt="Docthru logo"
          />
        </Link>
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li
              key={link}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
            >
              <Link href={link.path}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
