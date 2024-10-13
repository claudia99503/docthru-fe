import Link from 'next/link';
import styles from './NavDropDown.module.css';

export default function NavDropDown() {
  const pathName = usePathname();

  return (
    <ul>
      <li>Profile </li>
      <li>
        <Link>나의 챌린지</Link>
      </li>
      <li>
        <Link>로그아웃</Link>
      </li>
    </ul>
  );
}
