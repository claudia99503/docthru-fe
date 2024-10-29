import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import { ProfileImage, Profile } from '../common/Profile';
import { useEffect, useRef, useState } from 'react';
import { useLogout } from '@/hooks/useAuth';

export default function ProfileDropDown({ user }) {
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const isUser = user?.role === 'USER';

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
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
              <div className={styles.modalHug}>
                <li>
                  <Link href="/me" className={styles.link}>
                    나의 챌린지
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className={styles.link}>
                    마이페이지
                  </Link>
                </li>
              </div>
            )}
            <li>
              <button
                className={styles.logout}
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
