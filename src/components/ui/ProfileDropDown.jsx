import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import { ProfileImage, Profile } from './Profile';
import { useEffect, useRef, useState } from 'react';

const mockup = {
  nickName: '사용자이름',
  grade: 'EXPERT',
};

export default function ProfileDropDown() {
  const [isOpen, setIsOpen] = useState(true);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!setIsOpen);
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
        <ProfileImage user={mockup} />
      </button>

      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <Profile user={mockup} />
          <ul className={styles.lists}>
            <li>
              <Link className={styles.link} href="/me">
                나의 챌린지
              </Link>
            </li>
            <li className={styles.logout}>로그아웃</li>
          </ul>
        </div>
      )}
    </div>
  );
}
