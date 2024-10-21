import { useState } from 'react';
import styles from './ChallengeDropdown.module.css';
import images from '../../variables/images';

const ChallengeDropdown = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('필터');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionChange(option); // 상위 컴포넌트로 선택된 옵션 전달
    setIsOpen(false);
  };

  return (
    <div className={styles.ChallengeDropdown}>
      <button className={styles['dropdown-button']} onClick={toggleDropdown}>
        <span className={styles['selected-text']}>필터</span>
        <img
          src={images.icons.filterBlack}
          alt="Toggle Dropdown"
          className={styles.icon}
        />
      </button>
      {isOpen && (
        <ul className={styles['dropdown-list']}>
          <div className={styles['dropdown-out']}>
            <span>필터</span>
            <img
              src={images.icons.out}
              alt="out"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {[
            'Next.js',
            'Modern JS',
            'API',
            'Web',
            'Career',
            '공식 문서',
            '블로그',
            '진행중',
            '마감',
          ].map((option, index) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengeDropdown;
