import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import { ProfileImage, Profile } from '../common/Profile';
import { useEffect, useRef, useState } from 'react';

export default function ProfileDropDown({ user }) {
  const isUser = user.role === 'USER';

  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.ProfileDropDown} ref={dropDownRef}>
      <button onClick={toggleDropdown}>
        <ProfileImage user={user} />
      </button>

      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <Profile user={user} />
          <ul className={styles.lists}>
            {isUser && (
              <li>
                <Link className={styles.link} href="/me">
                  나의 챌린지
                </Link>
              </li>
            )}
            <li className={styles.logout}>로그아웃</li>
          </ul>
        </div>
      )}
    </div>
  );
}
