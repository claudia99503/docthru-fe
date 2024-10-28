import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import Logo from './Logo';

export default function Nav({ links }) {
  const pathname = usePathname();
  return (
    <nav className={styles.Nav}>
      <ul className={styles.lists}>
        <Logo />
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
